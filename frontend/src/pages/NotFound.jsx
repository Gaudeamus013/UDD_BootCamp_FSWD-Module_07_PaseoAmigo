// ============================================================
// 🚫 NotFound.jsx — Página de error 404
// Paseo Amigo · React Router v6
// ============================================================

import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 text-gray-800 dark:text-gray-100">
      <h1 className="text-6xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
        404
      </h1>
      <p className="text-lg mb-6">
        Oops 😢 La página que buscas no existe.
      </p>
      <Link
        to="/"
        className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
