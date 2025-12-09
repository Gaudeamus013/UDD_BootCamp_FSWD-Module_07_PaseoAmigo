import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";

const router = express.Router();

// Crear orden
router.post("/", protect, createOrder);

// Obtener orden
router.get("/:id", protect, getOrderById);

// Marcar como pagada
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
