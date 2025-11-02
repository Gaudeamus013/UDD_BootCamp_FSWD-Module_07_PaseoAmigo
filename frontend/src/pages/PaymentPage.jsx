// ============================================================
// 💳 Página: PaymentPage.jsx (Versión Integrada Final)
// ============================================================
// - Verifica sesión antes de mostrar PayPalCheckout.
// - Diseño coherente con el estilo global de Paseo Amigo.
// - Animaciones suaves y responsive.
// ============================================================

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PayPalCheckout from "../components/payments/PayPalCheckout.jsx";
import { useUser } from "../context/UserContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function PaymentPage() {
  const { user } = useUser();
  const { items, total } = useCart();

  const exchangeRate = 0.0011;
  const usdAmount = (total * exchangeRate).toFixed(2);

  // 🧭 Caso 1: Usuario no logeado
  if (!user) {
    return (
      <motion.section
        className="flex flex-col items-center justify-center text-center min-h-[70vh] px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="max-w-md bg-white dark:bg-neutral-900 p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <h1 className="text-2xl font-display font-semibold mb-4 text-primary-light dark:text-primary-dark">
            ⚠️ Debes iniciar sesión
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Para poder agendar y realizar el pago de tu servicio, por favor
            inicia sesión en tu cuenta de Paseo Amigo.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-2.5 bg-primary-light text-white font-medium rounded-lg shadow-md hover:bg-primary-light/90 transition-all"
          >
            Iniciar sesión
          </Link>
        </motion.div>
      </motion.section>
    );
  }

  // 🧭 Caso 2: Usuario logeado pero sin carrito
  if (!items || items.length === 0) {
    return (
      <motion.section
        className="flex flex-col items-center justify-center text-center min-h-[70vh] px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="max-w-md bg-white dark:bg-neutral-900 p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <h1 className="text-2xl font-display font-semibold mb-4 text-primary-light dark:text-primary-dark">
            🐾 No tienes servicios seleccionados
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Agrega un paseo o servicio a tu carrito antes de continuar con el
            pago.
          </p>
          <Link
            to="/servicios"
            className="inline-block px-6 py-2.5 bg-primary-light text-white font-medium rounded-lg shadow-md hover:bg-primary-light/90 transition-all"
          >
            Ver servicios
          </Link>
        </motion.div>
      </motion.section>
    );
  }

  // ✅ Caso 3: Usuario logeado y carrito válido
  return (
    <motion.section
      className="flex flex-col items-center justify-center text-center min-h-[70vh] px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-md w-full bg-white dark:bg-neutral-900 p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-800"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <h1 className="text-2xl font-display font-semibold mb-6 text-primary-light dark:text-primary-dark">
          Completar pago <span className="ml-1">🐾</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Estás pagando el siguiente servicio:
        </p>
        <div className="border-t border-gray-300 dark:border-neutral-700 pt-3 mb-6">
          {items.map((item, index) => (
            <p
              key={index}
              className="flex justify-between text-gray-700 dark:text-gray-300 mb-1"
            >
              <span>{item.name}</span>
              <span>${item.price.toLocaleString("es-CL")}</span>
            </p>
          ))}
          <p className="font-semibold text-lg mt-3">
            Total (CLP): ${total.toLocaleString("es-CL")}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ≈ {usdAmount} USD (tasa ref. 0.0011)
          </p>
        </div>

        {/* 💳 Componente PayPal */}
        <PayPalCheckout total={total} items={items} />

        <p className="text-xs text-gray-400 mt-4">
          Transacción segura mediante PayPal Sandbox.
        </p>
      </motion.div>
    </motion.section>
  );
}
    