// ============================================================
// 🐾 Paseo Amigo – Configuración TailwindCSS (Optimizada)
// ============================================================
// ✨ Incluye:
// - Soporte para modo oscuro basado en clase ("dark").
// - Extensión de colores de marca (primary, secondary, text).
// - Fuentes personalizadas ("Inter" y "Poppins").
// - Plugins oficiales instalados (forms, typography, aspect-ratio).
// ============================================================

import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

export default {
  // ============================================================
  // 🌙 MODO OSCURO
  // ============================================================
  darkMode: "class",

  // ============================================================
  // 📁 RUTAS A ARCHIVOS (purga inteligente)
  // ============================================================
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // ============================================================
  // 🎨 THEME PERSONALIZADO – PALETA Y FUENTES
  // ============================================================
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#F59E0B",  // Ámbar cálido – energía y confianza
          DEFAULT: "#F59E0B",
          dark: "#D97706",
        },
        secondary: {
          light: "#FFF8E7",  // Fondo cálido y limpio
          dark: "#18181B",   // Fondo oscuro elegante
        },
        text: {
          light: "#1F2937",  // Gris oscuro legible
          dark: "#E5E7EB",   // Gris claro en modo oscuro
        },
        brand: {
          light: "#FACC15",
          dark: "#EAB308",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Poppins", "Inter", "ui-sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.05)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },

  // ============================================================
  // 🔌 PLUGINS OFICIALES
  // ============================================================
  plugins: [forms, typography, aspectRatio],
};
