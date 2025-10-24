// ============================================================
// 🧠 CONEXIÓN A BASE DE DATOS - Paseo Amigo v3.0
// ============================================================
// Establece la conexión con MongoDB Atlas usando Mongoose.
// Muestra logs detallados en desarrollo y reconexión automática.
// En producción mantiene salida limpia y sin verbose innecesario.
// ============================================================

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // 🔧 Puedes añadir parámetros adicionales si lo deseas:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    // ==============================
    // 📊 Logs de conexión
    // ==============================
    if (process.env.NODE_ENV !== "production") {
      console.log("===============================================");
      console.log(`✅ MongoDB conectado correctamente`);
      console.log(`🏠 Servidor: ${conn.connection.host}`);
      console.log(`🧩 Base de datos: ${conn.connection.name}`);
      console.log(`🌍 Entorno: ${process.env.NODE_ENV}`);
      console.log("===============================================");
    } else {
      console.log(`✅ MongoDB conectado (${conn.connection.name})`);
    }
  } catch (error) {
    // ==============================
    // ❌ Manejo de errores
    // ==============================
    console.error("❌ Error al conectar con MongoDB:", error.message);

    if (process.env.NODE_ENV !== "production") {
      console.log("-----------------------------------------------");
      console.log("🔁 Intentando reconectar en 5 segundos...");
      console.log("-----------------------------------------------");
    }

    // 🔄 Intentar reconectar automáticamente tras 5 segundos
    setTimeout(connectDB, 5000);
  }
};

