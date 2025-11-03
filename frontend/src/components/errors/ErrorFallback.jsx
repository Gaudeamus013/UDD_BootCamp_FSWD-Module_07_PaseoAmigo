// ============================================================
// 🎯 ErrorFallback.jsx — Pantalla amigable de error (React Router v6)
// ============================================================
import React from "react";
import { useRouteError, Link } from "react-router-dom";

export default function ErrorFallback() {
  const error = useRouteError();
  console.error("💥 Error en la ruta:", error);

  const message = typeof error === "string"
    ? error
    : error?.data || error?.message || "Ha ocurrido un error inesperado.";

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold mb-3">😅 Ups... algo salió mal</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {message}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}