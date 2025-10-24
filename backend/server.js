// ============================================================
// 🐾 Paseo Amigo – Servidor Backend (Optimizado)
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
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use("/api/users", userRoutes);
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
app.get("/", (req, res) => {
  res.json({
    ok: true,
    name: "Paseo Amigo Backend",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
  });
});

// ==============================
// 🚏 Rutas principales
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);

// ==============================
// ⚠️ Manejo de errores
// ==============================
app.use(notFound);
app.use(errorHandler);

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

