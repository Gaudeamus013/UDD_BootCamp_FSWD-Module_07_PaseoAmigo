import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPaypalOrder,
  capturePaypalAndCreateBooking,
} from "../controllers/checkoutController.js";

const router = express.Router();

// Crear orden PayPal (requiere sesión: asociamos luego la reserva al usuario)
router.post("/create-order", protect, createPaypalOrder);

// Capturar pago y crear reserva (booking)
router.post("/capture-order", protect, capturePaypalAndCreateBooking);

export default router;
