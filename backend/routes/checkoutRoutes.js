// ============================================================
// 💳 RUTA DE PAGOS - PAYPAL SDK MODERNO
// ============================================================
// Este endpoint crea una orden en PayPal Sandbox utilizando
// el nuevo SDK v2. Puedes adaptar el monto según el carrito,
// servicio o producto.
// ============================================================

import { Router } from "express";
import paypalClient from "../config/paypal.js";
import paypal from "@paypal/checkout-server-sdk";

const router = Router();

// ✅ Crear una nueva orden (sandbox)
router.post("/paypal/create-order", async (req, res) => {
  try {
    const { value, currency } = req.body || {};
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency || "USD",
            value: value || "10.00",
          },
        },
      ],
    });

    const order = await paypalClient.execute(request);
    return res.status(201).json({ id: order.result.id });
  } catch (error) {
    console.error("❌ Error al crear orden PayPal:", error);
    return res.status(500).json({ message: "Error al crear la orden PayPal" });
  }
});

// ✅ Capturar una orden (sandbox)
router.post("/paypal/capture-order/:orderID", async (req, res) => {
  try {
    const { orderID } = req.params;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    const capture = await paypalClient.execute(request);
    return res.json({ status: capture.result.status, details: capture.result });
  } catch (error) {
    console.error("❌ Error al capturar orden PayPal:", error);
    return res.status(500).json({ message: "Error al capturar la orden" });
  }
});

export default router;
