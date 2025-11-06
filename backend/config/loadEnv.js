// ============================================================
// 🌍 Pre-carga y validación de entorno - Paseo Amigo
// ============================================================
// Se ejecuta antes de todo el backend para garantizar que
// process.env esté disponible para controladores, PayPal, JWT, etc.
// ============================================================

import dotenvSafe from "dotenv-safe";

dotenvSafe.config({
  path: ".env",
  example: ".env.example",
  allowEmptyValues: true, // permite COOKIE_DOMAIN vacío en local
});

console.log("✅ Variables de entorno cargadas correctamente");
