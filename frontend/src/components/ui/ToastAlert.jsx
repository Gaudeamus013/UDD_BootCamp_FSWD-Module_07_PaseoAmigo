import { motion, AnimatePresence } from "framer-motion";
import React from "react";

// ============================================================
// 🐾 Paseo Amigo – ToastAlert.jsx (Versión Multitipo Final)
// ============================================================
// • Soporte para distintos tipos de alerta (success, error, warning, info)
// • Adaptativo a pantallas móviles, tablets y desktop
// • Diseño coherente con el tema global del proyecto (día/noche)
// • Reutilizable en Servicios, Login, Checkout, etc.
// ============================================================

export default function ToastAlert({ message, type = "success" }) {
  // ------------------------------------------------------------
  // 🎨 Paleta de colores según tipo de mensaje
  // ------------------------------------------------------------
  const typeStyles = {
    success: {
      bg: "bg-emerald-100/85 dark:bg-emerald-800/70",
      border: "border-emerald-400/50",
      text: "text-emerald-900 dark:text-emerald-100",
      icon: "✅",
    },
    error: {
      bg: "bg-red-100/85 dark:bg-red-800/70",
      border: "border-red-400/50",
      text: "text-red-900 dark:text-red-100",
      icon: "❌",
    },
    warning: {
      bg: "bg-yellow-100/85 dark:bg-yellow-700/70",
      border: "border-yellow-400/50",
      text: "text-yellow-900 dark:text-yellow-100",
      icon: "⚠️",
    },
    info: {
      bg: "bg-blue-100/85 dark:bg-blue-800/70",
      border: "border-blue-400/50",
      text: "text-blue-900 dark:text-blue-100",
      icon: "ℹ️",
    },
  };

  const { bg, border, text, icon } = typeStyles[type] || typeStyles.success;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`
            fixed bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2
            flex items-center justify-center gap-3
            px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4
            rounded-2xl z-50 backdrop-blur-md shadow-xl border
            w-[90%] sm:w-auto max-w-[600px] text-center font-medium
            ${bg} ${border} ${text}
            text-sm sm:text-base lg:text-lg
          `}
          style={{ lineHeight: 1.3 }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            className="text-lg sm:text-xl lg:text-2xl"
          >
            {icon}
          </motion.span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
