// ============================================================
// 🪙 CONFIGURACIÓN PAYPAL SDK (Versión moderna v2)
// ============================================================
// Este archivo reemplaza al antiguo "paypal-rest-sdk".
// Utiliza el nuevo SDK oficial: "@paypal/checkout-server-sdk"
// que funciona con la API REST v2 (Orders API).
// ============================================================

import paypal from "@paypal/checkout-server-sdk";

// 🌍 Determinar entorno según variable de entorno
const environment =
  process.env.PAYPAL_MODE === "live"
    ? new paypal.core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_SECRET
      )
    : new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_SECRET
      );

// Crea una instancia del cliente PayPal
const paypalClient = new paypal.core.PayPalHttpClient(environment);

export default paypalClient;

