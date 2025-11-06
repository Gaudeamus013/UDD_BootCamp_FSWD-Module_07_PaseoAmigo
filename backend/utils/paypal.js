// ============================================================
// 💳 Utilidades PayPal - Paseo Amigo (Versión Estable Producción)
// ============================================================
// Compatible con entornos: Sandbox y Live
// Flujo oficial:
//   1. Frontend → POST /api/checkout/create-order
//   2. Backend → PayPal API → Devuelve orderId y approve link
//   3. Usuario aprueba pago (redirigido al link)
//   4. Frontend → POST /api/checkout/capture-order
//   5. Backend captura y confirma transacción
// ============================================================

import fetch from "node-fetch";

// ------------------------------------------------------------
// 🔑 Obtener Access Token (Client Credentials Flow)
// ------------------------------------------------------------
export async function getPayPalAccessToken() {
  const base = process.env.PAYPAL_API;
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) throw new Error("❌ Error al obtener token de PayPal");
  return res.json();
}

// ------------------------------------------------------------
// 🧾 Crear orden PayPal
// ------------------------------------------------------------
export async function createOrder({
  amount,
  currency = process.env.PAYPAL_CURRENCY || "USD",
  description = "Paseo Amigo",
}) {
  const base = process.env.PAYPAL_API;
  const { access_token } = await getPayPalAccessToken();

  const res = await fetch(`${base}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: currency, value: amount },
          description,
        },
      ],
      application_context: {
        brand_name: "Paseo Amigo",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const err = new Error("❌ Error creando orden PayPal");
    err.details = data;
    throw err;
  }
  return data;
}

// ------------------------------------------------------------
// 💰 Capturar orden PayPal (una vez aprobada por el usuario)
// ------------------------------------------------------------
export async function captureOrder(orderId) {
  const base = process.env.PAYPAL_API;
  const { access_token } = await getPayPalAccessToken();

  const res = await fetch(`${base}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    const err = new Error("❌ Error al capturar orden PayPal");
    err.details = data;
    throw err;
  }
  return data;
}
