// ============================================================
// 💳 PayPal Config (Depurada con logs de diagnóstico)
// ============================================================
// - Maneja autenticación OAuth2, creación y captura de órdenes.
// - Convierte CLP a USD según tasa fija de .env.
// - Incluye validaciones y logs detallados para entorno local.
// ============================================================

import dotenv from "dotenv";
dotenv.config();

const {
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  PAYPAL_API = "https://api-m.sandbox.paypal.com",
  PAYPAL_MODE = "sandbox",
  EXCHANGE_RATE_CLP_TO_USD,
  NODE_ENV,
} = process.env;

// ============================================================
// 🔢 Conversión CLP → USD
// ============================================================
const exchangeRate = Number(EXCHANGE_RATE_CLP_TO_USD || 0.0011);

export function clpToUsd(clp) {
  const usd = Number(clp || 0) * exchangeRate;
  return usd.toFixed(2); // Mantiene 2 decimales exactos
}

// ============================================================
// 🔐 Obtención de access_token (OAuth 2.0)
// ============================================================
async function getAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("❌ Faltan credenciales PAYPAL_CLIENT_ID o PAYPAL_CLIENT_SECRET en .env");
  }

  const credentials = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("❌ Error OAuth PayPal:", res.status, text);
    throw new Error(`Error al obtener token PayPal (${res.status})`);
  }

  const data = JSON.parse(text);
  if (NODE_ENV === "development") {
    console.log("✅ Token PayPal obtenido correctamente:", data.access_token?.slice(0, 12) + "...");
  }

  return data.access_token;
}

// ============================================================
// 🧾 Crear una orden PayPal
// ============================================================
export async function createOrder({ amountClp, description = "Servicio Paseo Amigo", referenceId = "PA-ORDER" }) {
  const accessToken = await getAccessToken();
  const valueUSD = clpToUsd(Number(amountClp));

  if (NODE_ENV === "development") {
    console.log("💰 Monto CLP recibido:", amountClp);
    console.log("💵 Convertido a USD:", valueUSD);
    console.log("🌍 PayPal API Base:", PAYPAL_API);
    console.log("🧩 Modo:", PAYPAL_MODE);
  }

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: referenceId,
        description,
        amount: {
          currency_code: "USD",
          value: valueUSD,
          breakdown: {
            item_total: { currency_code: "USD", value: valueUSD },
          },
        },
      },
    ],
    application_context: {
      brand_name: "Paseo Amigo",
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
    },
  };

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let json = {};
  try {
    json = JSON.parse(text);
  } catch {
    console.error("⚠️ No se pudo parsear la respuesta JSON de PayPal:", text);
  }

  if (!res.ok) {
    console.error("❌ Error creando orden PayPal:", res.status, json);
    throw new Error(`PayPal CreateOrder Error (${res.status}): ${json?.message || text}`);
  }

  console.log("✅ Orden creada exitosamente en modo:", PAYPAL_MODE);
  console.log("🧾 ID de orden:", json?.id);
  return json;
}

// ============================================================
// 💰 Capturar una orden existente
// ============================================================
export async function captureOrder(orderId) {
  const accessToken = await getAccessToken();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  const text = await res.text();
  let json = {};
  try {
    json = JSON.parse(text);
  } catch {
    console.error("⚠️ No se pudo parsear JSON en captureOrder:", text);
  }

  if (!res.ok) {
    console.error("❌ Error al capturar orden PayPal:", res.status, json);
    throw new Error(`PayPal Capture Error (${res.status}): ${json?.message || text}`);
  }

  console.log("✅ Orden capturada correctamente:", json?.id || orderId);
  return json;
}

// ============================================================
// ⚙️ Exportación de configuración general
// ============================================================
export const paypalConfig = {
  mode: PAYPAL_MODE,
  apiBase: PAYPAL_API,
  exchangeRate,
};
