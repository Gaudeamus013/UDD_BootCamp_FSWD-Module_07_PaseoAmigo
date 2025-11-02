// ============================================================
// 🛣️ RUTAS DE AUTENTICACIÓN – Paseo Amigo v4.0
// ============================================================
// Incluye:
// • Registro
// • Inicio de sesión
// • Perfil protegido (requiere token)
// ============================================================

import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Registro de usuario nuevo
router.post("/register", registerUser);

// Inicio de sesión
router.post("/login", loginUser);

// Perfil del usuario autenticado
router.get("/profile", protect, getUserProfile);

export default router;
