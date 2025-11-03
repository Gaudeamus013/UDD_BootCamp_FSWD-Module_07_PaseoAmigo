// ============================================================
// 💳 Rutas de Checkout (PayPal) – ES Modules
// ============================================================
// Endpoints
//  POST /api/checkout/create-order    → crea orden en PayPal
//  POST /api/checkout/capture-order   → captura orden aprobada
//  POST /api/checkout/register-payment→ registra pago en MongoDB
// ============================================================

import express from "express";
import {
  createOrderController,
  captureOrderController,
  registerPayment,
} from "../controllers/checkoutController.js";

const router = express.Router();

// Crea una orden de PayPal a partir de un monto en CLP (se convierte a USD en backend)
router.post("/create-order", createOrderController);

// Captura la orden aprobada por el usuario en PayPal
router.post("/capture-order", captureOrderController);

// Registra el pago en la base de datos
router.post("/register-payment", registerPayment);

export default router;
