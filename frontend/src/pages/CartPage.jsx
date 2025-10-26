// ============================================================
// 📂 src/pages/CartPage.jsx
// 🛒 Paseo Amigo – Carrito de Compras (Versión MVP)
// ============================================================
// ✨ Características:
// - Visualización de productos agregados al carrito (simulados)
// - Control de cantidad (+ / -) y eliminación
// - Redirección simulada a /checkout
// - Mensaje emocional si el carrito está vacío
// - Animaciones suaves con Framer Motion
// - Compatible con modo claro / oscuro
// ============================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ============================================================
// 🧩 Productos de ejemplo (simulan planes del servicio)
// ============================================================
const productosIniciales = [
  {
    id: 1,
    nombre: "Paseo Light",
    descripcion: "30 minutos – ideal para rondas rápidas",
    precio: 9990,
    imagen: "/assets/img/productos/paseo_light.jpg",
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "Paseo Full",
    descripcion: "50 minutos – ejercicio y registro GPS",
    precio: 14990,
    imagen: "/assets/img/productos/paseo_full.jpg",
    cantidad: 1,
  },
  {
    id: 3,
    nombre: "Paseo Especial",
    descripcion: "90 minutos – entrenamiento + fotos + reporte",
    precio: 22990,
    imagen: "/assets/img/productos/paseo_especial.jpg",
    cantidad: 1,
  },
];

export default function CartPage() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState(productosIniciales);

  // ============================================================
  // ⚙️ Funciones de manejo del carrito
  // ============================================================

  const incrementar = (id) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  const decrementar = (id) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id && p.cantidad > 1
          ? { ...p, cantidad: p.cantidad - 1 }
          : p
      )
    );
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const subtotal = productos.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  const irAlCheckout = () => {
    // 🔹 Simulación: redirige visualmente a /checkout
    navigate("/checkout");
  };

  // ============================================================
  // 🎞️ Variantes de animación (Framer Motion)
  // ============================================================
  const fadeSlideIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // ============================================================
  // 🖼️ Render principal
  // ============================================================
  return (
    <motion.section
      id="carrito"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeSlideIn}
      className="py-20 px-8 transition-colors duration-700 
                 bg-gradient-to-b from-white via-amber-50 to-white 
                 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
    >
      {/* Encabezado */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4"
        >
          Tu carrito de Paseo Amigo 🐾
        </motion.h2>
        <p className="text-subtext-light dark:text-subtext-dark">
          Revisa tus servicios antes de continuar al pago.
        </p>
      </div>

      {/* Carrito vacío */}
      {productos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <img
            src="/assets/img/ui/empty-cart.svg"
            alt="Carrito vacío"
            className="w-32 h-32 mb-6 opacity-80"
            loading="lazy"
          />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Tu carrito está vacío 🐾
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Agrega un plan para alegrar el día de tu mascota.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Lista de productos */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {productos.map((p) => (
              <motion.div
                key={p.id}
                variants={fadeSlideIn}
                className="flex flex-col md:flex-row items-center justify-between 
                           bg-white/90 dark:bg-neutral-800/80 rounded-2xl shadow-md p-6 
                           transition-all duration-500 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-24 h-24 object-cover rounded-xl shadow-sm"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {p.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {p.descripcion}
                    </p>
                    <p className="font-medium text-primary-dark dark:text-primary-light mt-2">
                      ${p.precio.toLocaleString("es-CL")}
                    </p>
                  </div>
                </div>

                {/* Controles */}
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => decrementar(p.id)}
                    className="px-3 py-1 bg-gray-200 dark:bg-neutral-700 rounded-lg hover:scale-105 transition"
                  >
                    –
                  </button>
                  <span className="min-w-[24px] text-center">
                    {p.cantidad}
                  </span>
                  <button
                    onClick={() => incrementar(p.id)}
                    className="px-3 py-1 bg-gray-200 dark:bg-neutral-700 rounded-lg hover:scale-105 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => eliminarProducto(p.id)}
                    className="ml-4 text-red-500 hover:text-red-700 text-sm font-medium transition"
                  >
                    Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resumen del carrito */}
          <motion.div
            variants={fadeSlideIn}
            className="bg-white/90 dark:bg-neutral-800/80 rounded-2xl shadow-md p-6 h-fit self-start"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Resumen de tu pedido
            </h3>

            <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString("es-CL")}</span>
            </div>

            <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-4 border-b border-gray-300 dark:border-neutral-700 pb-2">
              <span>Total</span>
              <span className="font-bold text-primary-dark dark:text-primary-light">
                ${subtotal.toLocaleString("es-CL")}
              </span>
            </div>

            <button
              onClick={irAlCheckout}
              disabled={productos.length === 0}
              className={`w-full py-3 mt-2 rounded-full font-semibold transition-transform duration-300 ${
                productos.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary-dark text-white hover:scale-105"
              }`}
            >
              Proceder al Checkout
            </button>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}
