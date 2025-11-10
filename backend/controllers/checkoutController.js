// ============================================================
// 💳 checkoutController.js — Controlador de pagos con PayPal
// ============================================================
// - Calcula total en CLP desde el carrito del frontend
// - Convierte CLP → USD mediante paypalConfig.js
// - Crea y captura órdenes en PayPal Sandbox
// ============================================================

import { createOrder, captureOrder } from "../utils/paypal.js";
import Booking from "../models/bookingModel.js";

// ============================================================
// 🧾 Crear orden PayPal (Paso 1 del flujo)
// ============================================================
// POST /api/checkout/create-order
// body: { cart: [{ name, price, quantity }], description?: string }

export const createPaypalOrder = async (req, res, next) => {
  try {
    const { cart = [], description = "Paseo Amigo - Servicios" } = req.body;

    // Validar carrito
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Carrito vacío o inválido." });
    }

    // Calcular total CLP del carrito
    const totalClp = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Crear orden PayPal (usa conversión CLP→USD internamente)
    const order = await createOrder({
      amountClp: totalClp,
      description,
      referenceId: `PA-${Date.now()}`,
    });

    // Retornar estructura esperada por Checkout.jsx
    return res.status(201).json({
      id: order.id,
      links: order.links,
      totalClp,
    });
  } catch (e) {
    return next({
      status: 500,
      message: "Error creando orden PayPal",
      details: e.details || e.message,
    });
  }
};

// ============================================================
// 💰 Capturar pago PayPal + crear reserva (Paso 2 del flujo)
// ============================================================
// POST /api/checkout/capture-order
// body: { orderId, serviceType, date, durationMins, priceUSD, notes? }

export const capturePaypalAndCreateBooking = async (req, res, next) => {
  try {
    const { orderId, serviceType, date, durationMins, priceUSD, notes } =
      req.body;

    // Validar campos requeridos
    if (!orderId)
      return res.status(400).json({ message: "orderId requerido" });
    if (!serviceType || !date || !durationMins || !priceUSD) {
      return res.status(400).json({ message: "Faltan campos de reserva" });
    }

    // 1️⃣ Capturar la orden (server-to-server)
    const result = await captureOrder(orderId);
    const status = result?.status || "FAILED";
    const captureId =
      result?.purchase_units?.[0]?.payments?.captures?.[0]?.id;

    if (status !== "COMPLETED") {
      return res.status(422).json({ message: "Pago no completado", paypal: result });
    }

    // 2️⃣ Crear la reserva asociada al usuario autenticado
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
    return next({
      status: 500,
      message: "Error al capturar y crear reserva",
      details: e.details || e.message,
    });
  }
};