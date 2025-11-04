// ============================================================
// 🐾 Rutas para Tipos de Paseo (WalkType) – Versión Final Segura
// ============================================================
// Este archivo define las rutas del modelo WalkType, incluyendo
// la ruta /seed accesible tanto por POST (original) como por GET
// (solo durante desarrollo).
// ============================================================

import express from "express";
import { WalkType } from "../models/walkTypeModel.js";

const router = express.Router();

// ============================================================
// ✅ GET /api/walktypes
// Obtiene todos los tipos de paseo activos
// ============================================================
router.get("/", async (req, res) => {
  try {
    const types = await WalkType.find({ isActive: true }).sort({ price: 1 });
    res.status(200).json(types);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los tipos de paseo", error: String(error) });
  }
});

// ============================================================
// 🧩 /api/walktypes/seed (solo disponible en desarrollo)
// ============================================================
// En entorno de producción, cualquier intento devolverá 403 Forbidden.
// ============================================================

if (process.env.NODE_ENV !== "production") {
  // ------------------------------------------------------------
  // 🧩 GET /api/walktypes/seed
  // Permite inicializar datos desde navegador
  // ------------------------------------------------------------
  router.get("/seed", async (req, res) => {
    try {
      const data = [
        {
          name: "Paseo corto (30 min)",
          description: "Ideal para perros pequeños o con menor energía.",
          duration: "30 minutos",
          price: 7000,
          image: "/assets/icons/walk-30.svg",
        },
        {
          name: "Paseo largo (50 min)",
          description: "Perfecto para perros activos o razas grandes.",
          duration: "50 minutos",
          price: 12000,
          image: "/assets/icons/walk-50.svg",
        },
        {
          name: "Paseo doble (2 perros)",
          description: "Servicio para dos perros del mismo hogar, rutas más amplias.",
          duration: "60 minutos",
          price: 16000,
          image: "/assets/icons/walk-double.svg",
        },
      ];

      await WalkType.deleteMany({});
      const inserted = await WalkType.insertMany(data);
      res.status(201).json({
        message: "Tipos de paseo insertados correctamente (modo desarrollo).",
        inserted,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al sembrar datos", error: String(error) });
    }
  });

  // ------------------------------------------------------------
  // 🧩 POST /api/walktypes/seed
  // Permite insertar datos de prueba desde cliente API (Postman)
  // ------------------------------------------------------------
  router.post("/seed", async (req, res) => {
    try {
      const bodyData = req.body?.length ? req.body : null;

      const data = bodyData || [
        {
          name: "Paseo corto (30 min)",
          description: "Ideal para perros pequeños o con menor energía.",
          duration: "30 minutos",
          price: 7000,
          image: "/assets/icons/walk-30.svg",
        },
        {
          name: "Paseo largo (50 min)",
          description: "Perfecto para perros activos o razas grandes.",
          duration: "50 minutos",
          price: 12000,
          image: "/assets/icons/walk-50.svg",
        },
        {
          name: "Paseo doble (2 perros)",
          description: "Servicio para dos perros del mismo hogar, rutas más amplias.",
          duration: "60 minutos",
          price: 16000,
          image: "/assets/icons/walk-double.svg",
        },
      ];

      await WalkType.deleteMany({});
      const inserted = await WalkType.insertMany(data);
      res.status(201).json({
        message: "Tipos de paseo insertados correctamente (modo desarrollo).",
        inserted,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al sembrar datos", error: String(error) });
    }
  });
} else {
  // ------------------------------------------------------------
  // 🚫 Bloqueo en producción
  // ------------------------------------------------------------
  router.all("/seed", (_req, res) =>
    res
      .status(403)
      .json({ message: "Ruta /seed deshabilitada en entorno de producción" })
  );
}

// ============================================================
// ✅ Exportación del router
// ============================================================
export default router;
