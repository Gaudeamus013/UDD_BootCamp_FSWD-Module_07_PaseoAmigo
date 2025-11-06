// ============================================================
// 🌍 Cliente Axios global para Paseo Amigo (versión estable)
// ============================================================
// Centraliza todas las peticiones HTTP hacia el backend Render
// Evita warnings por carga duplicada (Vite HMR) y solo muestra
// logs útiles cuando la app está completamente inicializada.
// ============================================================

import axios from "axios";

// Intentamos leer la variable de entorno de forma segura
const API_BASE_URL = import.meta?.env?.VITE_API_URL?.trim();

// Solo mostramos un log si está definida correctamente
if (API_BASE_URL && !window.__api_logged) {
  console.log("🌍 API_BASE_URL activa:", API_BASE_URL);
  window.__api_logged = true; // evita doble log por HMR
}

// Creamos la instancia Axios global
const api = axios.create({
  baseURL: API_BASE_URL || "http://localhost:4000",
  withCredentials: true,
});

export default api;
