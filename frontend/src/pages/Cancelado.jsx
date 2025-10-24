import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Cancelado() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border-t-4 border-accent"
      >
        <div className="text-center">
          {/* Icono animado */}
          <motion.div
            initial={{ rotate: -15, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4"
          >
            ❌
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800">
            ¡Pago cancelado!
          </h1>
          <p className="mt-2 text-gray-600">
            No te preocupes,{" "}
            <span className="font-medium text-brand-dark">
              tu amigo peludo entiende.
            </span>{" "}
            Puedes intentarlo nuevamente cuando quieras 🐾
          </p>

          {/* Bloque de mensaje adicional */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 bg-gray-50 border rounded-xl p-4 text-sm text-gray-700"
          >
            <p>
              Tu pedido no se procesó, pero{" "}
              <span className="text-brand font-semibold">no se realizó ningún cargo</span>.
            </p>
            <p className="mt-1">
              Si deseas, puedes volver a la página de pago o regresar al inicio.
            </p>
          </motion.div>

          {/* Botones de acción */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/checkout"
              className="btn btn-brand hover:scale-105 transform transition duration-300"
            >
              Intentar nuevamente 💳
            </Link>
            <Link
              to="/"
              className="btn border border-gray-300 hover:bg-gray-100 transition duration-300"
            >
              Volver al inicio 🏠
            </Link>
          </motion.div>

          {/* Mensaje final */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xs text-gray-500 mt-8"
          >
            Si tienes dudas, contáctanos en{" "}
            <a
              href="mailto:contacto@paseoamigo.cl"
              className="underline hover:text-brand-dark"
            >
              contacto@paseoamigo.cl
            </a>
          </motion.p>
        </div>
      </motion.div>
    </motion.section>
  );
}
