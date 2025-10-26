// ============================================================
// 🐾 Paseo Amigo – Servidor Backend (Optimizado para Render)
// ============================================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

// ==============================
// 🔗 CORS Dinámico según entorno
// ==============================
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],   
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ==============================
// 🧠 Conexión Base de Datos
// ==============================
await connectDB();

// ==============================
// 🩺 Ruta de prueba (healthcheck)
// ==============================
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "Paseo Amigo Backend" });
});

// ==============================
// 🚏 Rutas principales
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);

// ==============================
// ⚠️ Manejo de errores
// ==============================
app.use(notFound);
app.use(errorHandler);

// ============================================
// 💳 Verificar entorno activo de PayPal
// ============================================
console.log(`💳 PayPal SDK inicializado en modo: ${process.env.PAYPAL_MODE?.toUpperCase() || "NO DEFINIDO"}`);

// ==============================
// 🚀 Arranque del servidor
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("===============================================");
  console.log(`🐾 Paseo Amigo Backend iniciado en puerto ${PORT}`);
  console.log(`🌍 Entorno activo: ${process.env.NODE_ENV}`);
  console.log(`🔐 CORS permitido desde: ${process.env.CORS_ORIGIN}`);
  console.log("===============================================");
});