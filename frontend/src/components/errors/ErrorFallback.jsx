// ============================================================
// 💥 ErrorFallback.jsx — Interfaz visual de errores
// Paseo Amigo · Compatible con ErrorBoundary
// ------------------------------------------------------------
// - Se muestra automáticamente cuando un componente falla.
// - Permite recargar o volver a la página de inicio.
// ============================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ErrorFallback({ error }) {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-rose-50 to-rose-100 dark:from-neutral-900 dark:to-neutral-950 text-gray-800 dark:text-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-4">
          ¡Ups! Algo salió mal 😢
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Ocurrió un error inesperado mientras se renderizaba la aplicación.
        </p>

        {error && (
          <pre className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-neutral-800 p-3 rounded-lg overflow-x-auto mb-6 text-left">
            {error.message || String(error)}
          </pre>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleReload}
            className="px-6 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition"
          >
            Recargar página
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 text-gray-800 dark:text-gray-200 font-semibold transition"
          >
            Ir al inicio
          </button>
        </div>
      </motion.div>

      <footer className="mt-10 text-sm text-gray-500 dark:text-gray-400 opacity-70">
        Paseo Amigo © {new Date().getFullYear()} — Todos los derechos reservados
      </footer>
    </section>
  );
}
