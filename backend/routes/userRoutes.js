// ============================================================
// 🚏 RUTAS DE USUARIO - Paseo Amigo v3.0
// ============================================================
// Contiene la ruta protegida para obtener la información
// del usuario autenticado (perfil actual).
// ============================================================

import express from "express";
import { me } from "../controllers/userController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

// ✅ Obtener información del usuario autenticado
router.get("/me", protect, me);

export default router;
