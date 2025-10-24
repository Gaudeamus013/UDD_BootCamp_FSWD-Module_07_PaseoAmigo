// ============================================================
// 🛡️ MIDDLEWARE DE AUTENTICACIÓN JWT - Paseo Amigo v3.0
// ============================================================
// Este middleware protege las rutas que requieren usuario logueado.
// Verifica el token JWT y lo asocia al objeto req.user.
// ============================================================

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No autorizado, token ausente." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Token válido, pero usuario no encontrado." });
    }

    next();
  } catch (error) {
    console.error("❌ Error en protect middleware:", error);
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};
