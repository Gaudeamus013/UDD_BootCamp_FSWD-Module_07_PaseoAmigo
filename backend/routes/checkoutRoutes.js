// ============================================================
// 💳 Rutas: Checkout (PayPal + Registro de Pago)
// ============================================================

import express from "express";
import {
  createOrderController,
  captureOrderController,
  registerPayment,
} from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/create-order", createOrderController);
router.post("/capture-order", captureOrderController);
router.post("/register-payment", registerPayment);

export default router;
