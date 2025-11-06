import { createOrder, captureOrder } from "../utils/paypal.js";
import Booking from "../models/bookingModel.js";

// POST /api/checkout/create-order
// body: { amountUSD: string/number, description?: string }
export const createPaypalOrder = async (req, res, next) => {
  try {
    const { amountUSD, description = "Paseo Amigo" } = req.body;
    if (!amountUSD) return res.status(400).json({ message: "amountUSD requerido" });

    const order = await createOrder({ amount: String(amountUSD), currency: "USD", description });
    return res.status(201).json({ orderId: order.id, paypal: order });
  } catch (e) {
    return next({ status: 500, message: "Error creando orden PayPal", details: e.details || e.message });
  }
};

// POST /api/checkout/capture-order
// body: { orderId, serviceType, date, durationMins, priceUSD, notes? }
export const capturePaypalAndCreateBooking = async (req, res, next) => {
  try {
    const { orderId, serviceType, date, durationMins, priceUSD, notes } = req.body;
    if (!orderId) return res.status(400).json({ message: "orderId requerido" });
    if (!serviceType || !date || !durationMins || !priceUSD) {
      return res.status(400).json({ message: "Faltan campos de reserva" });
    }

    // 1) Captura en PayPal (server-to-server)
    const result = await captureOrder(orderId);
    const status = result?.status || "FAILED";
    const captureId = result?.purchase_units?.[0]?.payments?.captures?.[0]?.id;

    if (status !== "COMPLETED") {
      return res.status(422).json({ message: "Pago no completado", paypal: result });
    }

    // 2) Crea la reserva ligada al usuario autenticado
    const booking = await Booking.create({
      user: req.user._id,
      serviceType,
      date,
      durationMins,
      priceUSD,
      payment: { provider: "paypal", orderId, captureId, status },
      notes,
    });

    return res.status(201).json({ booking, paypal: result });
  } catch (e) {
    return next({ status: 500, message: "Error al capturar y crear reserva", details: e.details || e.message });
  }
};
