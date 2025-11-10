// ============================================================
// 🌍 API base + cliente Axios global para Paseo Amigo (versión estable)
// ============================================================
// - Centraliza todas las peticiones HTTP hacia el backend Render.
// - Expone tanto `api` (instancia Axios) como `API_BASE_URL`.
// - Evita logs duplicados por HMR (Vite).
// ============================================================

import axios from "axios";

// Detecta entorno actual
const isLocal = window.location.hostname === "localhost";

// URL base
export const API_BASE_URL =
  import.meta?.env?.VITE_API_URL?.trim() ||
  (isLocal
    ? "http://localhost:4000"
    : "https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com");

// Solo log de control (una vez)
if (API_BASE_URL && !window.__api_logged) {
  console.log("🌍 API_BASE_URL activa:", API_BASE_URL);
  window.__api_logged = true;
}

// Crea la instancia Axios global
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Exporta por defecto la instancia y también la URL
export default api;
