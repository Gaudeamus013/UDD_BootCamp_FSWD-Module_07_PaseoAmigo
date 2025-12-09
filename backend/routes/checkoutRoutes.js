// ============================================================
// 🚚 checkoutRoutes.js — Rutas de checkout / pagos PayPal
// ============================================================
// - Crea órdenes PayPal a partir del carrito del usuario
// - Captura el pago y crea la reserva (Booking) en la BD
// - Todas las rutas requieren usuario autenticado (protect)
// ============================================================

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPaypalOrder,
  capturePaypalAndCreateBooking,
} from "../controllers/checkoutController.js";

const router = express.Router();

// ------------------------------------------------------------
// 🧾 Crear orden PayPal (PASO 1)
// ------------------------------------------------------------
// POST /api/checkout/create-order
// - Requiere sesión (protect): así luego asociamos la reserva al usuario
// - Body: { cart: [...], description? }
router.post("/create-order", protect, createPaypalOrder);

// ------------------------------------------------------------
// 💰 Capturar pago + crear reserva (PASO 2)
// ------------------------------------------------------------
// POST /api/checkout/capture-order
// - Requiere sesión (protect): usamos req.user._id para Booking
// - Body: { orderId, serviceType, date, durationMins, priceUSD, notes? }
router.post("/capture-order", protect, capturePaypalAndCreateBooking);

// ------------------------------------------------------------
// ✅ Export router
// ------------------------------------------------------------
export default router;
