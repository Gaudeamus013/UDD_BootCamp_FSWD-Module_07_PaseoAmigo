// ============================================================
// 💳 Checkout.jsx — Flujo de pago con PayPal
// Paseo Amigo · Integrado con apiClient (JWT + Refresh)
// ============================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../lib/apiClient";
import ToastAlert from "../components/ui/ToastAlert.jsx";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setType("warning");
      setMessage("Tu carrito está vacío.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      setLoading(true);
      setType("info");
      setMessage("Conectando con PayPal...");

      const { data } = await apiClient.post("/checkout/create-order", { cart });

      if (!data || !data.id) {
        throw new Error("No se pudo crear la orden de pago");
      }

      const approveLink = data.links?.find((link) => link.rel === "approve");
      if (approveLink) {
        window.location.href = approveLink.href;
      } else {
        throw new Error("No se encontró el enlace de aprobación.");
      }

      setType("success");
      setMessage("Pago realizado correctamente.");
      setTimeout(() => setMessage(""), 2500);
    } catch (error) {
      console.error("Error en el pago:", error);
      setType("error");
      setMessage("Error al procesar el pago. Intenta nuevamente.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="min-h-screen flex flex-col items-center py-16 px-6 bg-gradient-to-b from-transparent to-white/5 dark:to-black/20 transition-colors">
      <ToastAlert message={message} type={type} />

      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Finalizar compra 💳
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-700 dark:text-gray-300">
          <p className="mb-4">Tu carrito está vacío</p>
          <button
            onClick={() => navigate("/servicios")}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition"
          >
            Ver servicios
          </button>
        </div>
      ) : (
        <div className="max-w-3xl w-full bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Resumen del pedido
          </h2>

          <div className="flex flex-col gap-4 mb-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3"
              >
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {item.name} ({item.quantity}x)
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {(item.price * item.quantity).toLocaleString("es-CL")} CLP
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xl font-semibold border-t border-gray-200 dark:border-gray-700 pt-4 mb-8">
            <span>Total</span>
            <span className="text-emerald-600 dark:text-emerald-400">
              {total.toLocaleString("es-CL")} CLP
            </span>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`px-8 py-3 rounded-xl text-white font-semibold transition-colors duration-300 ${
                loading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              {loading ? "Procesando pago..." : "Pagar con PayPal 💰"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
