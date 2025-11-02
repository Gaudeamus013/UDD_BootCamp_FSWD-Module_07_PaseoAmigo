// ============================================================
// 🧱 MIDDLEWARE DE AUTENTICACIÓN – Paseo Amigo v4.0
// ============================================================
// • Protege rutas privadas (como perfil, checkout, etc.)
// • Verifica y decodifica el JWT enviado por el cliente
// • Adjunta los datos del usuario autenticado al request
// ============================================================

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// ------------------------------------------------------------
// 🔒 Middleware protector de rutas privadas
// ------------------------------------------------------------
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1️⃣ Verificar encabezado de autorización
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extraer token del header
      token = req.headers.authorization.split(" ")[1];

      // Verificar token con la clave secreta del entorno
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar usuario asociado y excluir el campo "password"
      req.user = await User.findById(decoded.id).select("-password");

      // Continuar con la ruta
      next();
    } catch (error) {
      console.error("Error de autenticación JWT:", error.message);
      res.status(401);
      throw new Error("Token inválido o expirado. Por favor inicia sesión nuevamente.");
    }
  }

  // 2️⃣ Si no se envió token, denegar acceso
  if (!token) {
    res.status(401);
    throw new Error("Acceso no autorizado. Token no encontrado.");
  }
});

// ------------------------------------------------------------
// 🛡️ Middleware para administradores (opcional futuro)
// ------------------------------------------------------------
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Acceso denegado. Requiere privilegios de administrador.");
  }
};
