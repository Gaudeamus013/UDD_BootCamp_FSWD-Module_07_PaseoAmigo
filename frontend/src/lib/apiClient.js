// ============================================================
// 🌐 apiClient.js — Cliente Axios unificado con JWT + Refresh
// Paseo Amigo · Fullstack JWT + Cookies + AutoRefresh
// ============================================================

import axios from "axios";
import { API_BASE_URL } from "../api/api.js"; // Base URL unificada

// ------------------------------------------------------------
// Instancia principal para todas las llamadas del frontend
// ------------------------------------------------------------
export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // necesario para que viaje la cookie refresh
});

// ------------------------------------------------------------
// Interceptor de REQUEST
// Adjunta Authorization si hay accessToken en localStorage
// ------------------------------------------------------------
apiClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem("userInfo");
  if (raw) {
    try {
      const { accessToken } = JSON.parse(raw);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch {
      // Ignorar si el JSON está corrupto
    }
  }
  return config;
});

// ------------------------------------------------------------
// Interceptor de RESPONSE
// Si recibe un 401, intenta refrescar el token automáticamente
// ------------------------------------------------------------
const refreshClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

let isRefreshing = false;
let pending = [];

// Reintenta las peticiones encoladas una vez hay nuevo token
function onRefreshed(newToken) {
  pending.forEach((cb) => cb(newToken));
  pending = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error?.config;

    // Si no es un 401 o ya fue reintentada, salir
    if (!original || error?.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    // Si ya hay un refresh en proceso, encola la petición
    if (isRefreshing) {
      return new Promise((resolve) => {
        pending.push((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(original));
        });
      });
    }

    // Ejecutar refresh
    isRefreshing = true;
    try {
      const { data } = await refreshClient.post("/auth/refresh");
      const newToken = data?.accessToken;
      if (!newToken) throw new Error("Respuesta de refresh sin accessToken");

      // Actualiza localStorage
      const raw = localStorage.getItem("userInfo");
      const current = raw ? JSON.parse(raw) : {};
      const updated = { ...current, accessToken: newToken };
      localStorage.setItem("userInfo", JSON.stringify(updated));

      // Actualiza headers globales
      apiClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      // Libera cola y reintenta petición original
      isRefreshing = false;
      onRefreshed(newToken);

      original.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(original);
    } catch (err) {
      // Si el refresh falla, limpiar sesión y redirigir al login
      isRefreshing = false;
      pending = [];

      try {
        await refreshClient.post("/auth/logout");
      } catch {}

      localStorage.removeItem("userInfo");

      if (typeof window !== "undefined") {
        const curr = window.location.pathname + window.location.search;
        const qs = new URLSearchParams({ redirect: curr });
        window.location.href = `/auth/login?${qs.toString()}`;
      }

      return Promise.reject(err);
    }
  }
);

// ------------------------------------------------------------
// 🧩 Compatibilidad con imports antiguos
// ------------------------------------------------------------
export const api = apiClient;
export default apiClient;
