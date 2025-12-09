// ============================================================
// 💳 PayPal Config optimizado — Paseo Amigo
// ============================================================
// - Maneja autenticación OAuth2, creación y captura de órdenes
// - Convierte CLP → USD usando una tasa configurable en .env
// - Reutiliza el access_token con caché para evitar llamadas extra
// - Incluye application_context (brand, return/cancel URL, etc.)
// ============================================================

// 👇 Opcional: si ya cargas dotenv en server.js (loadEnv.js) antes que nada,
// puedes eliminar estas dos líneas sin problema.
import dotenv from "dotenv";
dotenv.config();

const {
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  PAYPAL_API = "https://api-m.sandbox.paypal.com",
  PAYPAL_MODE = "sandbox", // "live" en producción real
  EXCHANGE_RATE_CLP_TO_USD,
  NODE_ENV = "development",
  FRONTEND_URL, // p.ej: http://localhost:5173 o tu dominio en producción
} = process.env;

// ============================================================
// 🔢 Conversión CLP → USD
// ============================================================
const exchangeRate = Number(EXCHANGE_RATE_CLP_TO_USD || "0.0011");

if (!EXCHANGE_RATE_CLP_TO_USD && NODE_ENV === "development") {
  console.warn(
    "⚠️ EXCHANGE_RATE_CLP_TO_USD no definido en .env, usando valor por defecto 0.0011"
  );
}

export function clpToUsd(clp) {
  const value = Number(clp || 0) * exchangeRate;
  // Devolvemos número con 2 decimales (no string) para trabajar más cómodo
  return Number(value.toFixed(2));
}

// ============================================================
// 🔐 Access Token con caché (OAuth 2.0 Client Credentials)
// ============================================================

let cachedToken = null;
let cachedTokenExpiresAt = 0; // timestamp en ms

async function getAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error(
      "❌ Faltan PAYPAL_CLIENT_ID o PAYPAL_CLIENT_SECRET en las variables de entorno"
    );
  }

  const now = Date.now();
  // Reutilizamos el token mientras no esté cerca de expirar (30s de margen)
  if (cachedToken && now < cachedTokenExpiresAt - 30_000) {
    if (NODE_ENV === "development") {
      console.log("🔁 Usando access_token PayPal en caché");
    }
    return cachedToken;
  }

  const credentials = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }

  if (!res.ok || !json?.access_token) {
    console.error("❌ Error OAuth PayPal:", res.status, json || text);
    const err = new Error(
      `Error al obtener token PayPal (${res.status})`
    );
    err.status = res.status;
    err.details = json || text;
    throw err;
  }

  cachedToken = json.access_token;
  const expiresInSec = Number(json.expires_in || 300);
  cachedTokenExpiresAt = now + expiresInSec * 1000;

  if (NODE_ENV === "development") {
    console.log(
      `🔐 Nuevo access_token PayPal obtenido. Expira en ~${expiresInSec}s`
    );
  }

  return cachedToken;
}

// ============================================================
// 🧾 Crear una orden PayPal (CLP → USD internamente)
// ============================================================
// Usado desde checkoutController.js:
//   const order = await createOrder({ amountClp, description, referenceId });
//
// Puedes sobreescribir returnUrl / cancelUrl y shippingPreference si lo necesitas.
//

export async function createOrder({
  amountClp,
  description = "Paseo Amigo - Servicios",
  referenceId = "PA-ORDER",
  returnUrl,      // opcional, sobreescribe FRONTEND_URL/checkout/success
  cancelUrl,      // opcional, sobreescribe FRONTEND_URL/checkout/cancel
  shippingPreference = "NO_SHIPPING", // o "GET_FROM_FILE" si algún día envías productos físicos
} = {}) {
  const totalClp = Number(amountClp || 0);
  if (!totalClp || totalClp <= 0) {
    throw new Error("Monto CLP inválido para crear orden PayPal.");
  }

  const accessToken = await getAccessToken();
  const valueUSD = clpToUsd(totalClp);

  // Normalizamos FRONTEND_URL y construimos URLs de retorno por defecto
  const baseFrontend = (FRONTEND_URL || "").replace(/\/$/, "");
  const finalReturnUrl =
    returnUrl || (baseFrontend ? `${baseFrontend}/checkout/success` : undefined);
  const finalCancelUrl =
    cancelUrl || (baseFrontend ? `${baseFrontend}/checkout/cancel` : undefined);

  if (NODE_ENV === "development") {
    console.log("💰 Monto total CLP:", totalClp);
    console.log("💵 Convertido a USD:", valueUSD);
    console.log("🌍 PayPal API Base:", PAYPAL_API);
    console.log("🧩 Modo PayPal:", PAYPAL_MODE);
    if (finalReturnUrl || finalCancelUrl) {
      console.log("🔗 return_url:", finalReturnUrl);
      console.log("🔗 cancel_url:", finalCancelUrl);
    }
  }

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: referenceId,
        description,
        amount: {
          currency_code: "USD",
          value: valueUSD.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: valueUSD.toFixed(2),
            },
          },
        },
      },
    ],
    application_context: {
      brand_name: "Paseo Amigo",
      shipping_preference: shippingPreference,
      user_action: "PAY_NOW",
      // Solo agregamos estas propiedades si tenemos URL base
      ...(finalReturnUrl && { return_url: finalReturnUrl }),
      ...(finalCancelUrl && { cancel_url: finalCancelUrl }),
    },
  };

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }

  if (!res.ok) {
    console.error("❌ Error creando orden PayPal:", res.status, json || text);
    const err = new Error(
      `PayPal CreateOrder Error (${res.status})`
    );
    err.status = res.status;
    err.details = json || text;
    throw err;
  }

  if (NODE_ENV === "development") {
    console.log("✅ Orden creada exitosamente en modo:", PAYPAL_MODE);
    console.log("🧾 ID de orden:", json?.id);
  }

  // json contiene: id, status, links, etc. Lo devolvemos tal cual.
  return json;
}

// ============================================================
// 💰 Capturar una orden existente
// ============================================================

export async function captureOrder(orderId) {
  if (!orderId) {
    throw new Error("orderId requerido para capturar la orden PayPal.");
  }

  const accessToken = await getAccessToken();

  const res = await fetch(
    `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }

  if (!res.ok) {
    console.error("❌ Error capturando orden PayPal:", res.status, json || text);
    const err = new Error(
      `PayPal Capture Error (${res.status})`
    );
    err.status = res.status;
    err.details = json || text;
    throw err;
  }

  if (NODE_ENV === "development") {
    console.log("✅ Orden capturada correctamente:", json?.id || orderId);
  }

  return json;
}

// ============================================================
// ⚙️ Exportación de configuración general (por si la necesitas)
// ============================================================
export const paypalConfig = {
  mode: PAYPAL_MODE,
  apiBase: PAYPAL_API,
  exchangeRate,
};
