// ============================================================
// 🐾 Paseo Amigo – TailwindCSS Config (v1.0.2 Final MVP 2025)
// ============================================================
// ✨ Optimizado para: Vite + React + Dark Mode class
// 🚀 Incluye:
//   - Paleta personalizada (brand, primary, secondary, text)
//   - Tipografías "Inter" y "Poppins"
//   - Animaciones compatibles con index.css
//   - Soporte para modo oscuro
//   - Plugins oficiales de Tailwind (forms, typography, aspect-ratio)
// ============================================================

import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  darkMode: "class", // 🌙 Modo oscuro controlado por clase `.dark`

  theme: {
    extend: {
      /* ------------------------------------------------------------
      🎨 PALETA DE COLORES PERSONALIZADA
      ------------------------------------------------------------- */
      colors: {
        primary: {
          light: "#FBBF24",  // Ámbar brillante
          dark: "#F59E0B",   // Ámbar profundo
        },
        secondary: {
          light: "#FFF8F1",  // Fondo cálido claro
          dark: "#1C1917",   // Fondo neutro oscuro
        },
        text: {
          light: "#2E2E2E",  // Texto principal claro
          dark: "#F5F5F5",   // Texto claro en modo oscuro
        },
        brand: {
          DEFAULT: "#EAB308", // Dorado vibrante (color de marca)
          dark: "#CA8A04",    // Dorado profundo para hover
        },
      },

      /* ------------------------------------------------------------
      🧱 TIPOGRAFÍAS
      ------------------------------------------------------------- */
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "sans-serif"],
      },

      /* ------------------------------------------------------------
      🌈 SOMBRAS Y TRANSICIONES
      ------------------------------------------------------------- */
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        md: "0 8px 24px rgba(0, 0, 0, 0.08)",
        xl: "0 16px 32px rgba(0, 0, 0, 0.1)",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },

      /* ------------------------------------------------------------
      🪄 ANIMACIONES PERSONALIZADAS (sin conflictos con index.css)
      ------------------------------------------------------------- */
      keyframes: {
        fadeSlideIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
      },
      animation: {
        fadeSlideIn: "fadeSlideIn 0.8s ease-out forwards",
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
      },
    },
  },

  /* ------------------------------------------------------------
  🔌 PLUGINS OFICIALES
  ------------------------------------------------------------- */
  plugins: [forms, typography, aspectRatio],
};
