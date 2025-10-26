// ============================================================
// 💳 Paseo Amigo – Checkout.jsx (Versión Final con /paypal/)
// ============================================================
// - Integra PayPal Sandbox funcionalmente.
// - Compatible con backend en Render.
// - Validación automática de variables VITE_*.
// - Fallback seguro ante errores o mala configuración.
// ============================================================

import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// ============================================================
// ⚙️ FUNCIÓN DE VALIDACIÓN DE VARIABLES DE ENTORNO
// ============================================================
// Verifica que las variables del .env.local estén disponibles
// antes de cargar el SDK de PayPal.
const checkEnvVars = () => {
  const requiredVars = [
    "VITE_API_BASE_URL",
    "VITE_PAYPAL_CLIENT_ID",
    "VITE_PAYPAL_CURRENCY",
  ];

  const missing = requiredVars.filter((v) => !import.meta.env[v]);
  if (missing.length > 0) {
    console.error("❌ Faltan variables de entorno:", missing);
    alert(
      `Configuración incompleta.\nFaltan variables: ${missing.join(
        ", "
      )}\n\nVerifica tu archivo .env.local o las variables en Vercel.`
    );
    return false;
  }

  console.group("✅ Variables de entorno detectadas (Checkout.jsx)");
  console.log("🌍 API BASE URL:", import.meta.env.VITE_API_BASE_URL);
  console.log("💳 PAYPAL CLIENT ID:", import.meta.env.VITE_PAYPAL_CLIENT_ID);
  console.log("💵 MONEDA:", import.meta.env.VITE_PAYPAL_CURRENCY);
  console.groupEnd();

  return true;
};

// ============================================================
// 💳 COMPONENTE PRINCIPAL: CHECKOUT
// ============================================================
export default function Checkout() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  // -----------------------------------------------
  // Validar variables VITE_* antes de inicializar PayPal
  // -----------------------------------------------
  useEffect(() => {
    const valid = checkEnvVars();
    setIsReady(valid);
  }, []);

  // -----------------------------------------------
  // Fallback visual si falta configuración o envs
  // -----------------------------------------------
  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-light dark:bg-secondary-dark text-center px-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Configuración pendiente ⚙️
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg">
          No se encontraron las variables de entorno necesarias. <br />
          Revisa tu archivo <strong>.env.local</strong> o las variables en{" "}
          <strong>Vercel / Render</strong>.
        </p>
      </div>
    );
  }

  // ============================================================
  // 🔗 VARIABLES DE ENTORNO SEGURAS
  // ============================================================
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const CURRENCY = import.meta.env.VITE_PAYPAL_CURRENCY || "USD";

  // ============================================================
  // 🧩 FUNCIÓN SEGURO PARA FETCH (con fallback de error)
  // ============================================================
  const safeFetch = async (url, options) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("🚨 Error en safeFetch:", err);
      setError("No se pudo conectar con el servidor. Intenta más tarde.");
      throw err;
    }
  };

  // ============================================================
  // 💰 RENDER PRINCIPAL DE CHECKOUT
  // ============================================================
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-light dark:bg-secondary-dark text-center px-6 py-20">
      {/* ---------------------- Encabezado ---------------------- */}
      <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6">
        Pago Seguro con PayPal
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-xl">
        Realiza tu pago con confianza a través de PayPal Sandbox. <br />
        Al completar el pago, serás redirigido automáticamente al estado
        correspondiente (éxito o cancelación).
      </p>

      {/* =======================================================
          💳 PAYPAL SCRIPT PROVIDER
          Carga el SDK con tu Client ID y moneda seleccionada
      ========================================================== */}
      <PayPalScriptProvider
        options={{
          "client-id": CLIENT_ID,
          currency: CURRENCY,
          intent: "capture",
        }}
      >
        <div className="bg-white/80 dark:bg-neutral-900/80 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700 w-full max-w-md">
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "paypal",
            }}
            // ------------------------------------------------------
            // 🧾 CREAR ORDEN (ruta con /paypal/)
            // ------------------------------------------------------
            createOrder={async () => {
              try {
                const data = await safeFetch(
                  `${API_BASE}/api/checkout/paypal/create-order`,
                  { method: "POST" }
                );
                console.log("🧾 Orden creada:", data);
                return data.id;
              } catch {
                return null;
              }
            }}
            // ------------------------------------------------------
            // 💰 CAPTURAR ORDEN (ruta con /paypal/)
            // ------------------------------------------------------
            onApprove={async (data) => {
              try {
                const result = await safeFetch(
                  `${API_BASE}/api/checkout/paypal/capture-order/${data.orderID}`,
                  { method: "POST" }
                );
                console.log("✅ Pago completado:", result);

                if (result.status === "COMPLETED") {
                  window.location.href = "/exito";
                } else {
                  window.location.href = "/cancelado";
                }
              } catch {
                window.location.href = "/cancelado";
              }
            }}
            // ------------------------------------------------------
            // ❌ CANCELACIÓN DEL USUARIO
            // ------------------------------------------------------
            onCancel={() => {
              console.warn("🟡 Compra cancelada por el usuario");
              window.location.href = "/cancelado";
            }}
            // ------------------------------------------------------
            // ⚠️ ERROR GLOBAL DEL SDK PAYPAL
            // ------------------------------------------------------
            onError={(err) => {
              console.error("💥 Error global en PayPal SDK:", err);
              setError("Ocurrió un problema al procesar el pago.");
            }}
          />
        </div>
      </PayPalScriptProvider>

      {/* ============================================================
          🧩 FALLBACK DE ERROR VISUAL
      ============================================================ */}
      {error && (
        <div className="mt-6 bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 px-4 py-2 rounded-lg shadow">
          {error}
        </div>
      )}
    </div>
  );
}
