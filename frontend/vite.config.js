// ============================================================
// 🐾 Paseo Amigo – Configuración Vite (Frontend)
// ============================================================
// 📄 Entorno optimizado para desarrollo local y despliegue
// en plataformas modernas (Vercel, Render, Netlify).
//
// Incluye:
// - Alias "@" → simplifica imports desde /src
// - Soporte React con Fast Refresh
// - Configuración de servidor accesible por red local
// - Build optimizado con separación de librerías pesadas
// - Acceso controlado a variables de entorno
// - Precarga de dependencias críticas
// ============================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ============================================================
// 🔧 CONFIGURACIÓN BASE
// ============================================================
export default defineConfig({
  // ------------------------------------------------------------
  // 🧩 PLUGINS ACTIVOS
  // ------------------------------------------------------------
  // @vitejs/plugin-react → habilita JSX, Fast Refresh y mejoras
  // de rendimiento específicas para entornos React.
  plugins: [react()],

  // ------------------------------------------------------------
  // 🌐 BASE DEL PROYECTO
  // ------------------------------------------------------------
  // En Vercel, Render o cualquier hosting moderno, la base debe ser "/".
  // Si el proyecto se publica en subcarpetas (por ejemplo GitHub Pages),
  // reemplazar por: base: "/nombre_proyecto/".
  base: "/",

  // ------------------------------------------------------------
  // 🧭 ALIAS DE RUTA
  // ------------------------------------------------------------
  // Permite usar "@" como raíz del directorio /src
  // Ejemplo de uso:
  // import ExperienceSection from "@/components/experience/ExperienceSection";
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ------------------------------------------------------------
  // 🧪 SERVIDOR DE DESARROLLO
  // ------------------------------------------------------------
  // Configuración ideal para entorno de desarrollo local:
  // - Permite pruebas desde dispositivos móviles en red local.
  // - Abre el navegador automáticamente.
  server: {
    host: true,        // Permite acceso desde IP local (ej. 192.168.x.x)
    port: 5173,        // Puerto por defecto de Vite
    open: true,        // Abre el navegador automáticamente
  },

  // ------------------------------------------------------------
  // ⚙️ CONFIGURACIÓN DE COMPILACIÓN (BUILD)
  // ------------------------------------------------------------
  // Optimiza el tamaño de bundle y facilita el cacheo.
  build: {
    outDir: "dist",               // Carpeta de salida
    sourcemap: false,             // Deshabilita mapas de fuente (más liviano)
    chunkSizeWarningLimit: 600,   // Eleva límite de advertencia (para librerías grandes)
    cssCodeSplit: true,           // Divide el CSS por componente
    assetsInlineLimit: 4096,      // Incrusta assets pequeños (<4 KB) en el bundle

    // ------------------------------------------------------------
    // 📦 CONFIGURACIÓN ROLLUP
    // ------------------------------------------------------------
    // Divide dependencias pesadas en chunks separados
    // para mejorar el cache y el tiempo de carga inicial.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["framer-motion", "embla-carousel-react"],
        },
      },
    },
  },

  // ------------------------------------------------------------
  // 🔒 VARIABLES DE ENTORNO
  // ------------------------------------------------------------
  // Permite acceder a variables definidas en archivos .env,
  // como VITE_API_URL o VITE_CLOUDINARY_URL.
  define: {
    "process.env": process.env,
  },

  // ------------------------------------------------------------
  // 🌈 OPTIMIZACIÓN DE DEPENDENCIAS
  // ------------------------------------------------------------
  // Precarga librerías críticas para reducir el tiempo de arranque
  // del servidor de desarrollo.
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "embla-carousel-react",
      "embla-carousel-autoplay",
    ],
  },
});
