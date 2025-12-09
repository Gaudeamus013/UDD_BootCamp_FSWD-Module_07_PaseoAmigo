// ============================================================
// 💳 checkoutController.js — Controlador de pagos con PayPal
// ============================================================
// - Calcula total en CLP desde el carrito del frontend
// - Convierte CLP → USD mediante paypalConfig.js
// - Crea y captura órdenes en PayPal (Sandbox / Live)
// - Crea reserva asociada al usuario autenticado
// ============================================================

import { createOrder, captureOrder } from "../config/paypalConfig.js";
import Booking from "../models/bookingModel.js";

// ============================================================
// 🧾 Crear orden PayPal — PASO 1
// ============================================================
// POST /api/checkout/create-order
// body: { cart: [{ name, price, quantity }], description?: string }
//
// Flujo:
// 1) Valida el carrito recibido desde el frontend.
// 2) Calcula el total en CLP.
// 3) Llama a createOrder (CLP→USD + PayPal).
// 4) Devuelve al frontend la info necesaria para continuar el flujo.
// ============================================================

export const createPaypalOrder = async (req, res, next) => {
  try {
    const { cart = [], description = "Paseo Amigo - Servicios" } = req.body;

    // --------------------------------------------------------
    // ✅ Validación de carrito
    // --------------------------------------------------------
    if (!Array.isArray(cart) || cart.length === 0) {
      return res
        .status(400)
        .json({ message: "El carrito está vacío o es inválido." });
    }

    // Validar estructura interna del carrito
    for (const item of cart) {
      if (
        !item.name ||
        typeof item.price !== "number" ||
        typeof item.quantity !== "number"
      ) {
        return res
          .status(400)
          .json({ message: "El carrito contiene ítems inválidos." });
      }
    }

    // --------------------------------------------------------
    // 💰 Calcular total CLP del carrito
    // --------------------------------------------------------
    const totalClp = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // ID de referencia legible para auditoría/trazabilidad
    const referenceId = `PA-ORDER-${Date.now()}`;

    // --------------------------------------------------------
    // 1️⃣ Crear orden en PayPal (usa CLP→USD internamente)
    // --------------------------------------------------------
    const order = await createOrder({
      amountClp: totalClp,
      description,
      referenceId,
    });

    // --------------------------------------------------------
    // 2️⃣ Responder al frontend con datos relevantes
    // --------------------------------------------------------
    return res.status(201).json({
      message: "Orden PayPal creada correctamente.",
      id: order.id,
      status: order.status,
      links: order.links,
      totalClp,
      referenceId,
    });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Error creando orden PayPal:", e);
    }

    return next({
      status: 500,
      message: "Error creando orden PayPal.",
      details: e.details || e.message,
    });
  }
};

// ============================================================
// 💰 Capturar pago + crear reserva — PASO 2
// ============================================================
// POST /api/checkout/capture-order
// body: { orderId, serviceType, date, durationMins, priceUSD, notes? }
//
// Flujo:
// 1) Capturamos la orden en PayPal (server-to-server).
// 2) Validamos que el pago esté COMPLETED.
// 3) Creamos la reserva en MongoDB asociada al usuario autenticado.
// 4) Manejamos errores de duplicidad (E11000) y otros errores generales.
// ============================================================

export const capturePaypalAndCreateBooking = async (req, res, next) => {
  try {
    const { orderId, serviceType, date, durationMins, priceUSD, notes } =
      req.body;

    // --------------------------------------------------------
    // ✅ Validaciones base
    // --------------------------------------------------------
    if (!orderId) {
      return res.status(400).json({ message: "orderId requerido." });
    }

    if (!serviceType || !date || !durationMins || !priceUSD) {
      return res.status(400).json({
        message: "Faltan campos de reserva obligatorios.",
      });
    }

    // Validar fecha
    const bookingDate = new Date(date);
    if (Number.isNaN(bookingDate.getTime())) {
      return res
        .status(400)
        .json({ message: "La fecha de la reserva es inválida." });
    }

    // --------------------------------------------------------
    // 1️⃣ Capturar orden PayPal (server-to-server)
    // --------------------------------------------------------
    const paypalResult = await captureOrder(orderId);

    const status = paypalResult?.status || "FAILED";
    const captureId =
      paypalResult?.purchase_units?.[0]?.payments?.captures?.[0]?.id || null;

    // Si el pago no está COMPLETED, no creamos la reserva
    if (status !== "COMPLETED") {
      return res.status(422).json({
        message: "Pago no completado.",
        paypal: paypalResult,
      });
    }

    // --------------------------------------------------------
    // 2️⃣ Crear reserva en MongoDB
    // --------------------------------------------------------
    const booking = await Booking.create({
      user: req.user._id, // viene del middleware protect
      serviceType,
      date: bookingDate,
      durationMins,
      priceUSD,
      payment: {
        provider: "paypal",
        orderId,
        captureId,
        status,
      },
      notes,
    });

    // --------------------------------------------------------
    // 3️⃣ Respuesta exitosa al frontend
    // --------------------------------------------------------
    return res.status(201).json({
      message: "Reserva creada correctamente.",
      booking,
      paypal: paypalResult,
    });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Error capturando pago o creando reserva:", e);
    }

    // --------------------------------------------------------
    // 🚫 Manejo específico de duplicidades (E11000)
    // --------------------------------------------------------
    // Esto se dispara cuando el índice único del modelo Booking
    // detecta que ya existe una reserva con:
    // user + date + serviceType + durationMins
    // --------------------------------------------------------
    if (e.code === 11000) {
      return next({
        status: 409, // Conflict
        message:
          "Ya existe una reserva con los mismos datos para este usuario. No se puede duplicar la reserva.",
        details: e.message,
      });
    }

    // --------------------------------------------------------
    // ❌ Otros errores generales
    // --------------------------------------------------------
    return next({
      status: 500,
      message: "Error al capturar el pago o crear la reserva.",
      details: e.details || e.message,
    });
  }
};
