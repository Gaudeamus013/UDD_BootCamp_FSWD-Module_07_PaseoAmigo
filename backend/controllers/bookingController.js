// ============================================================
// 📅 Controlador de Reservas - Paseo Amigo (Optimizado vFinal)
// ============================================================
// Funciones activas:
// - getMyBookings(): lista las reservas del usuario autenticado
// ============================================================

import Booking from "../models/bookingModel.js";

// ------------------------------------------------------------
// 🧾 Obtener las reservas del usuario autenticado
// GET /api/bookings/mine
// ------------------------------------------------------------
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("user", "name email role");

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next({
      status: 500,
      message: "Error al obtener tus reservas",
      details: error.message,
    });
  }
};
  