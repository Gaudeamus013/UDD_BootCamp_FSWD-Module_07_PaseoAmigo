// ============================================================
// 🔐 CONTROLADOR DE AUTENTICACIÓN - Paseo Amigo (Roles activos)
// ============================================================
// Maneja: Registro, Login, Refresh, Logout y Perfil
// Roles: admin, paseador, cliente
// ============================================================

import User from "../models/userModel.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { getCookieOptions } from "../config/cookieOptions.js";

// ------------------------------------------------------------
// 🆕 Registro de usuario (por defecto: cliente)
// ------------------------------------------------------------
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const validRoles = ["admin", "paseador", "cliente"];
    const userRole = validRoles.includes(role) ? role : "cliente";

    const user = await User.create({ name, email, password, role: userRole });

    const accessToken = signAccessToken({ id: user._id, role: user.role });
    const refreshToken = signRefreshToken({ id: user._id, role: user.role });

    res.cookie(process.env.COOKIE_NAME || "rt", refreshToken, getCookieOptions());
    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------------------
// 🔑 Login de usuario
// ------------------------------------------------------------
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: "Credenciales inválidas" });

    const accessToken = signAccessToken({ id: user._id, role: user.role });
    const refreshToken = signRefreshToken({ id: user._id, role: user.role });

    res.cookie(process.env.COOKIE_NAME || "rt", refreshToken, getCookieOptions());
    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------------------
// ♻️ Refrescar token de acceso
// ------------------------------------------------------------
export const refreshToken = async (req, res, next) => {
  try {
    const rt = req.cookies?.[process.env.COOKIE_NAME || "rt"];
    if (!rt) return res.status(401).json({ message: "Sin refresh token" });

    const decoded = verifyRefreshToken(rt);
    const accessToken = signAccessToken({ id: decoded.id, role: decoded.role });
    return res.json({ accessToken });
  } catch (error) {
    next({ status: 401, message: "Refresh inválido o expirado" });
  }
};

// ------------------------------------------------------------
// 🚪 Logout
// ------------------------------------------------------------
export const logoutUser = async (_req, res) => {
  res.clearCookie(process.env.COOKIE_NAME || "rt", {
    path: "/",
    domain: process.env.COOKIE_DOMAIN || undefined,
  });
  return res.json({ message: "Sesión cerrada" });
};

// ------------------------------------------------------------
// 👤 Perfil autenticado
// ------------------------------------------------------------
export const getProfile = async (req, res) => {
  return res.json({ user: req.user });
};
