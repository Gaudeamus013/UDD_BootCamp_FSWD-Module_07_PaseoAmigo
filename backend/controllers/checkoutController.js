// ============================================================
// 💳 Controlador: Checkout (PayPal + Registro de Pago)
// ============================================================

import asyncHandler from "express-async-handler";
import { createOrder, captureOrder } from "../config/paypalConfig.js";
import Payment from "../models/paymentModel.js";

// Crear orden PayPal
export const createOrderController = asyncHandler(async (req, res) => {
  const { amountClp, description } = req.body;
  if (!amountClp || isNaN(amountClp)) {
    res.status(400);
    throw new Error("Monto CLP inválido o no proporcionado.");
  }

  try {
    const order = await createOrder({
      amountClp,
      description: description || "Servicio Paseo Amigo",
      referenceId: `PA-${Date.now()}`,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la orden PayPal", error: error?.message });
  }
});

// Capturar orden PayPal
export const captureOrderController = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) {
    res.status(400);
    throw new Error("ID de orden PayPal no proporcionado.");
  }

  try {
    const capture = await captureOrder(orderId);
    res.status(200).json(capture);
  } catch (error) {
    res.status(500).json({ message: "Error al capturar la orden PayPal", error: error?.message });
  }
});

// Registrar pago en MongoDB
export const registerPayment = asyncHandler(async (req, res) => {
  try {
    const { userId, orderId, amountClp, amountUsd, items, status } = req.body;
    if (!userId || !orderId) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    const newPayment = new Payment({
      userId,
      orderId,
      amountClp,
      amountUsd,
      items,
      status: status || "COMPLETED",
      createdAt: new Date(),
    });

    await newPayment.save();
    console.log("💾 Pago registrado correctamente en MongoDB");
    res.status(201).json({ message: "Pago registrado correctamente." });
  } catch (error) {
    console.error("❌ Error registrando pago:", error);
    res.status(500).json({ message: "Error al registrar el pago." });
  }
});
