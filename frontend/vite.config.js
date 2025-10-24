// ============================================================
// ⚙️ Vite Config – Paseo Amigo (Frontend)
// ============================================================
// Configuración optimizada para despliegue en Vercel
// ============================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ============================================================
// 🔧 CONFIGURACIÓN BASE
// ============================================================
export default defineConfig({
  plugins: [react()],
  // La base debe ser "/" para Vercel
  base: "/",

  // Configuración del servidor de desarrollo local
  server: {
    port: 5173,
    open: true,
  },

  // Configuración de compilación (build)
  build: {
    outDir: "dist",
    sourcemap: false,
  },

  // Variables de entorno disponibles
  define: {
    "process.env": process.env,
  },
});
