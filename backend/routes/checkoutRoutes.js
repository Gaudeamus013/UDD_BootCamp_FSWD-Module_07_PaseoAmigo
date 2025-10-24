// ============================================================
// 💳 RUTA DE PAGOS - PAYPAL SDK MODERNO
// ============================================================
// Este endpoint crea una orden en PayPal Sandbox utilizando
// el nuevo SDK v2. Puedes adaptar el monto según el carrito,
// servicio o producto.
// ============================================================

import { Router } from "express";
import paypal from "@paypal/checkout-server-sdk";

const router = Router();

// ✅ Crear una nueva orden (sandbox)
router.post("/paypal/create-order", async (req, res) => {
  try {
    console.log("🔄 Iniciando creación de orden PayPal...");
    
    // Validar que las variables de entorno estén disponibles
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      console.error("❌ Variables de entorno PayPal faltantes");
      return res.status(500).json({ 
        message: "Error de configuración PayPal",
        details: "Variables de entorno faltantes"
      });
    }

    // Crear cliente PayPal dinámicamente
    const environment = process.env.PAYPAL_MODE === "live"
      ? new paypal.core.LiveEnvironment(
          process.env.PAYPAL_CLIENT_ID,
          process.env.PAYPAL_CLIENT_SECRET
        )
      : new paypal.core.SandboxEnvironment(
          process.env.PAYPAL_CLIENT_ID,
          process.env.PAYPAL_CLIENT_SECRET
        );

    const paypalClient = new paypal.core.PayPalHttpClient(environment);

    const { value, currency } = req.body || {};
    console.log("💰 Procesando orden:", { value, currency });

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
          description: "Paseo Amigo - Servicio de paseo de mascotas"
        },
      ],
    });

    console.log("📤 Enviando petición a PayPal...");
    const order = await paypalClient.execute(request);
    console.log("✅ Orden PayPal creada exitosamente:", order.result.id);
    
    return res.status(201).json({ id: order.result.id });
  } catch (error) {
    console.error("❌ Error completo al crear orden PayPal:");
    console.error("Mensaje:", error.message);
    console.error("Status Code:", error.statusCode);
    console.error("Headers:", error.headers);
    if (error.details) {
      console.error("Detalles del error:", JSON.stringify(error.details, null, 2));
    }
    console.error("Stack completo:", error.stack);
    
    return res.status(500).json({ 
      message: "Error al crear la orden PayPal",
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        statusCode: error.statusCode
      } : undefined
    });
  }
});

// ✅ Capturar una orden (sandbox)
router.post("/paypal/capture-order/:orderID", async (req, res) => {
  try {
    console.log("🔄 Iniciando captura de orden PayPal...");

    // Validar credenciales
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      console.error("❌ Variables de entorno PayPal faltantes para captura");
      return res.status(500).json({ 
        message: "Error de configuración PayPal (captura)",
        details: "Variables de entorno faltantes"
      });
    }

    // Crear cliente dinámico PayPal (igual que en create-order)
    const environment = process.env.PAYPAL_MODE === "live"
      ? new paypal.core.LiveEnvironment(
          process.env.PAYPAL_CLIENT_ID,
          process.env.PAYPAL_CLIENT_SECRET
        )
      : new paypal.core.SandboxEnvironment(
          process.env.PAYPAL_CLIENT_ID,
          process.env.PAYPAL_CLIENT_SECRET
        );

    const paypalClient = new paypal.core.PayPalHttpClient(environment);

    // Capturar orden
    const { orderID } = req.params;
    console.log("💳 Capturando orden:", orderID);

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await paypalClient.execute(request);
    console.log("✅ Orden capturada exitosamente:", capture.result.id);

    return res.json({
      status: capture.result.status,
      details: capture.result,
    });
  } catch (error) {
    console.error("❌ Error completo al capturar orden PayPal:");
    console.error("Mensaje:", error.message);
    console.error("Status Code:", error.statusCode);
    console.error("Headers:", error.headers);
    if (error.details) {
      console.error("Detalles del error:", JSON.stringify(error.details, null, 2));
    }
    console.error("Stack completo:", error.stack);

    return res.status(500).json({
      message: "Error al capturar la orden PayPal",
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        statusCode: error.statusCode
      } : undefined
    });
  }
});

export default router;