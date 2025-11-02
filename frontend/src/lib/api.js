// ============================================================
// 🔗 Configuración base de API – Paseo Amigo
// ============================================================
// Detecta entorno local o de producción y exporta la URL base
// ============================================================

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";
