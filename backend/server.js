// ============================================================
// 🐾 Paseo Amigo – Servidor Backend (ES Modules + Seguridad Optimizada)
// ============================================================
// Características:
// - Estructura modular, compatible con Render.
// - dotenv-safe: valida entorno contra .env.example.
// - helmet: cabeceras seguras HTTP.
// - express-rate-limit: protege endpoints contra abuso.
// - morgan: logs legibles en desarrollo.
// - CORS dinámico: toma CORS_ORIGIN (coma-separado) o usa lista por defecto.
// - Conexión MongoDB via connectDB().
// - Rutas: authRoutes, productRoutes, checkoutRoutes, userRoutes.
// - Middleware de errores: notFound, errorHandler.
// - Compatible con entorno Sandbox/Producción PayPal.
// - Ruta raíz "/" (y HEAD "/") informativa para evitar 404 en Render.
// ============================================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv-safe";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";

// Rutas de la aplicación
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Middlewares de error
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// ============================================================
// 🔐 Carga y validación segura de variables de entorno
// ============================================================
dotenv.config({
  example: ".env.example",
});

// ============================================================
// 🚀 Inicialización del servidor Express
// ============================================================
const app = express();

// ==============================
// 🧩 Middlewares base
// ==============================
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false })); // formularios simples
app.use(morgan("dev")); // logging HTTP legible

// ==============================
// 🛡️ Seguridad HTTP con Helmet
// ==============================
app.use(helmet());

// ==============================
// 🔗 CORS Configuración completa
// ==============================
// Toma CORS_ORIGIN si está seteado (lista separada por comas), si no usa valores por defecto.
const defaultAllowedOrigins = [
  "http://localhost:5173",
  "https://paseoamigo.vercel.app",
  "https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com",
];

const envAllowed = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim()).filter(Boolean)
  : null;

const allowedOrigins = envAllowed && envAllowed.length > 0 ? envAllowed : defaultAllowedOrigins;

app.use(
  cors({
    origin: function (origin, callback) {
      // Permite herramientas como curl o llamadas del mismo host (sin origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Bloqueado por CORS:", origin);
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ==============================
// ⚙️ Rate Limiter: Control de Peticiones
// ==============================
// Límite: 100 solicitudes / 15 minutos por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Demasiadas solicitudes desde esta IP. Intenta nuevamente más tarde.",
  },
});
app.use(limiter);

// ==============================
// 🗄️ Conexión a la Base de Datos
// ==============================
(async () => {
  try {
    await connectDB();
    // console.log("✅ Conectado a MongoDB Atlas");
  } catch (err) {
    // console.log("❌ Error al conectar a MongoDB:", err?.message);
    process.exit(1);
  }
})();

// ==============================
// 📍 Ruta raíz informativa (evita 404 en Render)
// ==============================
app.get("/", (_req, res) => {
  res.status(200).json({
    service: "Paseo Amigo Backend",
    status: "online",
    mode: process.env.NODE_ENV || "development",
  });
});

// (Opcional) HEAD / para sondas que sólo chequean encabezados
app.head("/", (_req, res) => {
  res.status(200).end();
});

// ==============================
// 🩺 Healthcheck
// ==============================
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "Paseo Amigo Backend",
    mode: process.env.NODE_ENV || "development",
    paypalMode: process.env.PAYPAL_MODE || "SANDBOX",
  });
});

// ==============================
// 🚦 Rutas de negocio
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/users", userRoutes);

// ==============================
// 🧯 Manejo de Errores
// ==============================
app.use(notFound);
app.use(errorHandler);

// ==============================
// 🚀 Arranque del Servidor
// ==============================
const PORT = process.env.PORT || 4000; // Render define PORT; local usa 4000
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
});
    