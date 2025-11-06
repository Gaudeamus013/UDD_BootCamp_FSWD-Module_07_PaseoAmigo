import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyBookings } from "../controllers/bookingController.js";

const router = express.Router();

// Obtiene las reservas del usuario autenticado
router.get("/mine", protect, getMyBookings);

export default router;
