import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";

export default function Exito() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const [total, setTotal] = useState(null);

  useEffect(() => {
    // Si guardaste el total en localStorage antes del pago, recupéralo
    const savedTotal = localStorage.getItem("lastTotal");
    if (savedTotal) setTotal(parseFloat(savedTotal));
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border-t-4 border-brand"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4"
          >
            ✅
          </motion.div>

          <h1 className="text-3xl font-bold text-brand-dark">
            ¡Pago completado!
          </h1>
          <p className="mt-2 text-gray-600">
            Gracias por confiar en <span className="font-semibold">Paseo Amigo</span>.
          </p>

          <div className="mt-6 text-left bg-gray-50 rounded-xl p-4 border">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              🧾 Resumen del pedido
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium">ID de orden:</span>{" "}
              <span className="font-mono">{orderId || "No disponible"}</span>
            </p>
            {total !== null && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Monto total:</span>{" "}
                ${total.toFixed(2)} USD
              </p>
            )}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="mt-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-brand text-white font-medium px-6 py-3 rounded-2xl shadow hover:bg-brand-dark transition"
            >
              <span>Volver al inicio</span> 🏠
            </Link>
          </motion.div>

          <p className="text-xs text-gray-500 mt-6">
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
