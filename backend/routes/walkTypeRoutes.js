
// ============================================================
// 🐾 Rutas para Tipos de Paseo (WalkType) – Versión Corregida
// ============================================================
// Este archivo define las rutas del modelo WalkType, incluyendo
// la ruta /seed accesible tanto por POST (original) como por GET
// (para pruebas locales desde el navegador).
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
    res.status(500).json({ message: "Error al obtener los tipos de paseo", error: String(error) });
  }
});

// ============================================================
// 🧩 GET /api/walktypes/seed
// Versión GET para permitir pruebas desde navegador
// ============================================================
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
    res.status(201).json({ message: "Tipos de paseo insertados correctamente", inserted });
  } catch (error) {
    res.status(500).json({ message: "Error al sembrar datos", error: String(error) });
  }
});

// ============================================================
// 🧩 POST /api/walktypes/seed
// Ruta POST (versión original, recomendada en producción)
// ============================================================
router.post("/seed", async (req, res) => {
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
    res.status(201).json({ message: "Tipos de paseo insertados correctamente", inserted });
  } catch (error) {
    res.status(500).json({ message: "Error al sembrar datos", error: String(error) });
  }
});

export default router;
