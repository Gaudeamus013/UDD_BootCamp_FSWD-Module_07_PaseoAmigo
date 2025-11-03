// ============================================================
// 🐾 Paseo Amigo – Servidor Backend (ES Modules + Seguridad)
// ============================================================
// Características:
// - dotenv-safe: valida variables con .env.example
// - Helmet + Rate Limit + CORS dinámico
// - Logs morgan solo en desarrollo
// - Healthcheck en / y /api/health
// - Conexión segura a MongoDB antes de levantar servidor
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
import walkTypeRoutes from "./routes/walkTypeRoutes.js";

// Middlewares de error
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// ============================================================
// 🔐 Carga y validación de variables de entorno
// ============================================================
dotenv.config({ example: ".env.example" });

// ============================================================
// 🚀 Inicialización del servidor
// ============================================================
const app = express();

// ============================================================
// 🛡️ Seguridad y utilidades base
// ============================================================
app.use(helmet());

// Logs HTTP solo en desarrollo
if ((process.env.NODE_ENV || "development") === "development") {
  app.use(morgan("dev"));
}

// Body parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

// Rate Limiting: 100 req / 15 min por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ============================================================
// 🔗 CORS Dinámico (env CORS_ORIGIN separados por coma)
// ============================================================
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Permite herramientas como Postman/SSR (sin 'Origin')
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("No permitido por CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ============================================================
// 🩺 Healthcheck
// ============================================================
app.get("/", (_req, res) => {
  res.status(200).json({
    service: "Paseo Amigo Backend",
    status: "online",
    mode: process.env.NODE_ENV || "development",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "Paseo Amigo Backend",
    mode: process.env.NODE_ENV || "development",
    paypalMode: process.env.PAYPAL_MODE || "sandbox",
  });
});

// ============================================================
// 🗄️ Conexión a DB (antes de montar rutas)
// ============================================================
try {
  await connectDB();
} catch (err) {
  // Error crítico, no iniciar servidor sin DB
  console.error("❌ Error conectando a MongoDB:", err?.message);
  process.exit(1);
}

// ============================================================
// 🚦 Rutas de negocio (versionadas bajo /api/*)
// ============================================================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/users", userRoutes);
app.use("/api/walktypes", walkTypeRoutes);

// ============================================================
// 🧯 Manejo de Errores
// ============================================================
app.use(notFound);
app.use(errorHandler);

// ============================================================
// ▶️ Arranque del servidor
// ============================================================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend listo en puerto ${PORT}`);
});
