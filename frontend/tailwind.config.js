/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Permite el modo oscuro con la clase "dark"
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ✅ Compatibilidad con clases antiguas (bg-brand)
        brand: {
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
        },

        // 🎨 Paleta oficial del rebranding
        primary: {
          light: '#4CAF50',
          dark: '#81C784',
        },
        secondary: {
          light: '#F5F0E6',
          dark: '#1E1E1E',
        },
        accent: {
          light: '#FFB300',
          dark: '#FFCA28',
        },
        text: {
          light: '#212121',
          dark: '#E0E0E0',
        },
        subtext: {
          light: '#757575',
          dark: '#BDBDBD',
        },
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },

      boxShadow: {
        soft: '0 4px 14px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
