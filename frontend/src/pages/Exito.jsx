  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import ToastAlert from "../components/ui/ToastAlert.jsx";
  import { motion } from "framer-motion";

  // ============================================================
  // 🐾 Paseo Amigo – Exito.jsx (con ToastAlert y animación visual)
  // ============================================================
  // • Muestra confirmación automática tras el pago exitoso
  // • Usa animación de check central con efecto de pulso
  // • Totalmente adaptado a modo día/noche
  // ============================================================

  export default function Exito() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");

    useEffect(() => {
      setMessage("Tu reserva fue confirmada correctamente.");
      const timer = setTimeout(() => setMessage(""), 2500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-emerald-50 dark:from-black dark:to-neutral-900 text-center px-4">
        <ToastAlert message={message} type={type} />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 15 }}
          className="flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
          >
            <span className="text-white text-5xl font-bold">✓</span>
          </motion.div>

          <h1 className="text-3xl font-bold mt-8 text-gray-900 dark:text-gray-100">
            ¡Pago Exitoso!
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
            Gracias por confiar en Paseo Amigo. Tu reserva ha sido procesada
            correctamente y recibirás un correo de confirmación en los próximos minutos.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-8 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition"
          >
            Volver al inicio
          </button>
        </motion.div>
      </section>
    );
  }