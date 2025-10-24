import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PayPalCheckout from "../components/payments/PayPalCheckout.jsx";
import { CartProvider, useCart } from "../context/CartContext.jsx";

function CartTable() {
  const { items, total } = useCart();

  if (items.length === 0 || total === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-2xl border bg-white p-6 text-center shadow-sm"
      >
        <p className="text-gray-700 font-medium text-lg">🐾 Tu carrito está vacío</p>
        <p className="text-gray-500 text-sm mt-1">
          Agrega servicios antes de continuar al pago.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <table className="w-full">
        <thead className="bg-brand/10 text-left text-sm text-brand-dark">
          <tr>
            <th className="px-4 py-3">Servicio</th>
            <th className="px-4 py-3">Cantidad</th>
            <th className="px-4 py-3">Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-3">{it.name}</td>
              <td className="px-4 py-3">{it.qty}</td>
              <td className="px-4 py-3">${it.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50 font-semibold text-gray-800">
          <tr>
            <td className="px-4 py-3" colSpan={2}>
              Total
            </td>
            <td className="px-4 py-3">${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </motion.div>
  );
}

function CheckoutContent() {
  const { items, total } = useCart();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-brand-dark">
          🛒 Resumen de compra
        </h2>
        <CartTable />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 text-brand-dark">
          <img
            src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
            alt="PayPal"
            className="w-7 h-7"
          />
          Pagar con PayPal
        </h2>

        <AnimatePresence mode="wait">
          {total === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 border rounded-2xl bg-gray-50 text-center text-gray-600 shadow-sm"
            >
              <p className="text-sm">Agrega al menos un servicio para habilitar el pago.</p>
            </motion.div>
          ) : (
            <motion.div
              key="paypal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <PayPalCheckout total={total} items={items} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sugerencia UX: aviso de seguridad */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xs text-gray-500 text-center"
        >
          🔒 Pago seguro procesado por <span className="font-medium text-brand-dark">PayPal</span>.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

export default function Checkout() {
  return (
    <CartProvider>
      <CheckoutContent />
    </CartProvider>
  );
}
