// ============================================================
// 🐾 Paseo Amigo – Vite Config (v1.0.2 Final MVP 2025)
// ============================================================
// 🚀 Configuración optimizada para:
//    - Vercel (frontend) + Render (backend)
//    - React + TailwindCSS + Framer Motion
//    - Cloudinary y recursos locales
// ============================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // ============================================================
  // ⚙️ Plugins base
  // ============================================================
  plugins: [react()],

  // ============================================================
  // 📁 Alias de rutas limpias
  // ============================================================
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ============================================================
  // 🌍 Configuración del servidor de desarrollo
  // ============================================================
  server: {
    port: 5173,
    open: true,
    cors: true,
    proxy: {
      // 🔗 Redirección automática al backend en Render
      "/api": {
        target:
          process.env.VITE_API_BASE_URL ||
          "https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // ============================================================
  // 🧱 Configuración de build para producción
  // ============================================================
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",

    rollupOptions: {
      output: {
        manualChunks(id) {
          // 📦 Separación lógica de dependencias grandes (optimiza cache)
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("react-router-dom")) return "router";
            if (id.includes("embla-carousel")) return "carousel";
            return "vendor";
          }
        },
      },
    },
  },

  // ============================================================
  // 📦 Manejo seguro de assets
  // ============================================================
  assetsInclude: ["**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.svg", "**/*.gif"],

  // ============================================================
  // 🌐 Configuración global para Cloudinary y fetch remoto
  // ============================================================
  define: {
    "process.env": process.env,
  },
});
