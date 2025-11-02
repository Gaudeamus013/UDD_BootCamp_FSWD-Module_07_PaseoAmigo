import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastAlert from "../components/ui/ToastAlert.jsx";
import { motion } from "framer-motion";

// ============================================================
// 🐾 Paseo Amigo – Cancelado.jsx (con ToastAlert y animación visual)
// ============================================================
// • Feedback automático en caso de cancelación del pago
// • Animación expresiva en tono naranja/dorado elegante
// • Compatible con modo día/noche
// ============================================================

export default function Cancelado() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("warning");

  useEffect(() => {
    setMessage("El proceso de pago fue cancelado.");
    const timer = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-yellow-50 dark:from-black dark:to-neutral-900 text-center px-4">
      <ToastAlert message={message} type={type} />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg"
        >
          <span className="text-white text-5xl font-bold">⚠️</span>
        </motion.div>

        <h1 className="text-3xl font-bold mt-8 text-gray-900 dark:text-gray-100">
          Pago cancelado
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
          El proceso de pago fue interrumpido o cancelado por el usuario. Puedes
          volver a intentarlo cuando lo desees desde tu carrito de compras.
        </p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate("/servicios")}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-semibold transition"
          >
            Volver a servicios
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-800 dark:text-gray-100 rounded-xl font-semibold transition"
          >
            Inicio
          </button>
        </div>
      </motion.div>
    </section>
  );
}