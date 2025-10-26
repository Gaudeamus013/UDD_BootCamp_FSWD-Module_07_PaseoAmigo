// ============================================================
// 🐾 Paseo Amigo – Página de Pago Cancelado (Emergent UI Final)
// ============================================================
// - Diseño coherente con Exito.jsx y Checkout.jsx
// - Modo claro/oscuro con transiciones suaves
// - Animación de error con framer-motion
// ============================================================

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Cancelado() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark transition-colors duration-700 ease-in-out px-6">

      {/* ICONO ANIMADO DE ERROR */}
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="bg-red-500/90 dark:bg-red-400/80 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-6"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12"
        >
          <motion.line
            x1="18"
            y1="6"
            x2="6"
            y2="18"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
          />
          <motion.line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
          />
        </motion.svg>
      </motion.div>

      {/* TÍTULO */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3 text-center"
      >
        Pago cancelado ❌
      </motion.h1>

      {/* TEXTO PRINCIPAL */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-gray-700 dark:text-gray-300 text-center max-w-xl leading-relaxed mb-8"
      >
        La transacción fue cancelada antes de completarse.  
        Si fue un error, puedes intentarlo nuevamente o contactarnos para asistencia.
      </motion.p>

      {/* BOTÓN VOLVER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link
          to="/checkout"
          className="bg-primary-light hover:bg-brand-dark text-white font-semibold px-8 py-3 rounded-full shadow-soft transition-all duration-300 transform hover:scale-105"
        >
          Intentar nuevamente
        </Link>
      </motion.div>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-16 text-sm text-gray-600 dark:text-gray-400 text-center"
      >
        © {new Date().getFullYear()} Paseo Amigo — Todos los derechos reservados 🐾
      </motion.footer>
    </div>
  );
}
