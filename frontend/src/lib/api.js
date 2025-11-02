// ============================================================
// 🌐 API BASE URL – Paseo Amigo v4.1
// ============================================================
// - Detecta automáticamente el entorno (local / producción).
// - Usa variables de entorno Vite o fallback seguro.
// - Compatible con Vercel + Render.
// ============================================================

const isLocal = window.location.hostname === "localhost";

// ✅ Backend local (desarrollo)
const localURL = "http://localhost:4000";

// ✅ Backend desplegado en Render (producción)
const productionURL = "https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com";

// ✅ VITE_BACKEND_URL tiene prioridad si está definida
export const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || (isLocal ? localURL : productionURL);

// 🔍 Log de control (solo visible en desarrollo)
if (isLocal) {
  console.log("🌍 API_BASE_URL activa:", API_BASE_URL);
}
