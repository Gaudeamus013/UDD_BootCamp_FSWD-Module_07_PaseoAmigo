// ============================================================
// 💳 Rutas: checkoutRoutes.js
// ============================================================
// - Gestiona la comunicación entre el frontend y PayPal
// - Incluye endpoints para crear, capturar y registrar pagos
// ============================================================

import express from "express";
import {
  createOrderController,
  captureOrderController,
  registerPayment,
} from "../controllers/checkoutController.js";

const router = express.Router();

// 🧾 Crear orden PayPal
router.post("/create-order", createOrderController);

// 💳 Capturar orden PayPal
router.post("/capture-order", captureOrderController);

// 💾 Registrar pago en MongoDB
router.post("/register-payment", registerPayment);

export default router;
