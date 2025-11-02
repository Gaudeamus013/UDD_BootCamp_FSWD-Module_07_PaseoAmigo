
// ============================================================
// 🐾 Modelo de Tipos de Paseo (WalkType)
// ============================================================

import mongoose from "mongoose";

const walkTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },       // Nombre visible del servicio
    description: { type: String, trim: true },                 // Descripción corta
    duration: { type: String, required: true },                // Ej: "30 minutos", "50 minutos"
    price: { type: Number, required: true },                   // Precio en CLP (número entero)
    image: { type: String },                                   // (opcional) icono/imagen
    isActive: { type: Boolean, default: true },                // Para activar/desactivar sin eliminar
  },
  { timestamps: true }
);

export const WalkType = mongoose.model("WalkType", walkTypeSchema);
