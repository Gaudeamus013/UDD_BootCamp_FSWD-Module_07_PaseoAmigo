// ============================================================
// 🔐 CONTROLADOR DE AUTENTICACIÓN – Paseo Amigo v4.0
// ============================================================
// Maneja:
// • Registro de nuevos usuarios con validaciones avanzadas
// • Inicio de sesión con verificación de hash bcrypt
// • Respuestas claras y coherentes con el frontend
// ============================================================

import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// ------------------------------------------------------------
// 🧩 Generar Token JWT
// ------------------------------------------------------------
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // 30 días de validez
  });
};

// ------------------------------------------------------------
// 🧾 Registrar nuevo usuario
// ------------------------------------------------------------
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validar campos obligatorios
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Todos los campos son obligatorios.");
  }

  // Verificar si el correo ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error(
      "Este correo ya pertenece a una cuenta. Si ya te registraste, inicia sesión o usa otro correo electrónico."
    );
  }

  // Crear nuevo usuario
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "Cuenta creada exitosamente 🎉 Bienvenido a Paseo Amigo",
    });
  } else {
    res.status(400);
    throw new Error("Datos inválidos. No se pudo crear la cuenta.");
  }
});

// ------------------------------------------------------------
// 🔓 Iniciar sesión
// ------------------------------------------------------------
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validar campos
  if (!email || !password) {
    res.status(400);
    throw new Error("Por favor ingrese correo y contraseña.");
  }

  // Buscar usuario por correo
  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "Inicio de sesión exitoso 👋 Bienvenido de nuevo",
    });
  } else {
    res.status(401);
    throw new Error("Correo o contraseña incorrectos.");
  }
});

// ------------------------------------------------------------
// 🔒 Obtener perfil del usuario autenticado
// ------------------------------------------------------------
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado.");
  }
});
