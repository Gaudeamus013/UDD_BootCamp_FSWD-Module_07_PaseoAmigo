// ============================================================
// 🐾 Paseo Amigo – Página de Éxito (Versión Final Unificada)
// ============================================================
// - Mantiene la lógica funcional original (orderId + total)
// - Aplica diseño visual Emergent UI (modo oscuro, transiciones suaves)
// - Animación de check SVG profesional y colores adaptativos
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";

export default function Exito() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const savedTotal = localStorage.getItem("lastTotal");
    if (savedTotal) setTotal(parseFloat(savedTotal));
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark transition-colors duration-700 px-4 py-16"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-neutral-700 transition-colors duration-700"
      >
        <div className="text-center">

          {/* ✅ Animación de Check */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-green-500/90 dark:bg-green-400/80 text-white rounded-full mb-4 shadow-lg"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10"
            >
              <motion.path
                d="M20 6L9 17l-5-5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>

          {/* Título principal */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            ¡Pago completado! 🎉
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Gracias por confiar en <span className="font-semibold">Paseo Amigo</span>.
          </p>

          {/* Resumen del pedido */}
          <div className="text-left bg-gray-50 dark:bg-neutral-800 rounded-xl p-4 border border-gray-200 dark:border-neutral-700 transition-colors duration-700 mb-6">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
              🧾 Resumen del pedido
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">ID de orden:</span>{" "}
              <span className="font-mono">{orderId || "No disponible"}</span>
            </p>
            {total !== null && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <span className="font-medium">Monto total:</span> ${total.toFixed(2)} USD
              </p>
            )}
          </div>

          {/* Botón Volver */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="mt-4"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary-light hover:bg-brand-dark text-white font-medium px-6 py-3 rounded-full shadow transition-all duration-300"
            >
              <span>Volver al inicio</span> 🏠
            </Link>
          </motion.div>

          {/* Footer */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 transition-colors duration-700">
            Si tienes dudas, contáctanos a{" "}
            <a href="mailto:contacto@paseoamigo.cl" className="underline">
              contacto@paseoamigo.cl
            </a>
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}
