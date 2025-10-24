/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#16a34a",    // Verde principal (vibrante y natural)
          light: "#4ade80",      // Verde claro, usado en hover y detalles
          dark: "#15803d",       // Verde oscuro, usado en botones o header
        },
        accent: {
          DEFAULT: "#f59e0b",    // Naranja cálido (energía, amistad)
          soft: "#fbbf24",       // Versión más suave para íconos y acentos
        },
        neutral: {
          light: "#f9fafb",      // Fondo claro global
          dark: "#1f2937",       // Texto principal o header
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          700: "#374151",
          900: "#111827",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
