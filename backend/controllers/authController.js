import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//import User from "../models/User.js";
import User from "../models/userModel.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }
    const normalizedEmail = email.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Formato de email inválido." });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
      });
    }
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "El email ya está registrado." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: normalizedEmail, password: hashedPassword });
    const token = generateToken(user);
    return res.status(201).json({
      message: "Usuario registrado correctamente.",
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    console.error("❌ Error en register:", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios." });
    }
    const normalizedEmail = email.toLowerCase();
    //const user = await User.findOne({ email: normalizedEmail });
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }
    const token = generateToken(user);
    return res.status(200).json({
      message: "Inicio de sesión exitoso.",
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    next(error);
  }
};
