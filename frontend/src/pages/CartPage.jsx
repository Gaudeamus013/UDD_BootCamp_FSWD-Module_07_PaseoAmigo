import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastAlert from "../components/ui/ToastAlert.jsx";

// ============================================================
// 🐾 Paseo Amigo – CartPage.jsx (con ToastAlert integrado)
// ============================================================
// • Feedback visual al eliminar o actualizar servicios
// • Mantiene compatibilidad con localStorage y dark mode
// • Usa distintos tipos de ToastAlert (success, warning)
// ============================================================

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  // ------------------------------------------------------------
  // 🔄 Cargar carrito desde localStorage al montar
  // ------------------------------------------------------------
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // ------------------------------------------------------------
  // 🗑️ Eliminar servicio del carrito
  // ------------------------------------------------------------
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (updatedCart.length === 0) {
      setType("warning");
      setMessage("El carrito está vacío.");
    } else {
      setType("success");
      setMessage("Servicio eliminado del carrito.");
    }
    setTimeout(() => setMessage(""), 2500);
  };

  // ------------------------------------------------------------
  // 🔁 Actualizar cantidad
  // ------------------------------------------------------------
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: newQty } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setType("success");
    setMessage("Cantidad actualizada correctamente.");
    setTimeout(() => setMessage(""), 2500);
  };

  // ------------------------------------------------------------
  // 🧾 Calcular total
  // ------------------------------------------------------------
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ------------------------------------------------------------
  // 🧱 Renderizado principal
  // ------------------------------------------------------------
  return (
    <section className="min-h-screen flex flex-col items-center py-16 px-6 bg-gradient-to-b from-transparent to-white/5 dark:to-black/20 transition-colors">
      <ToastAlert message={message} type={type} />

      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Tu carrito 🛒
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-700 dark:text-gray-300">
          <p className="mb-4">No hay servicios en tu carrito</p>
          <button
            onClick={() => navigate("/servicios")}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition"
          >
            Ver servicios
          </button>
        </div>
      ) : (
        <div className="max-w-4xl w-full flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-md p-6"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-4xl">{item.name.includes("corto") ? "🐕" : item.name.includes("largo") ? "🦮" : "🐾"}</span>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.description}
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    {item.price.toLocaleString("es-CL")} CLP
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-2 text-gray-600 dark:text-gray-300 hover:text-emerald-500"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center border-t border-gray-300 dark:border-gray-700 pt-6 mt-4">
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Total:
            </p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {total.toLocaleString("es-CL")} CLP
            </p>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate("/checkout")}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-lg font-semibold transition"
            >
              Proceder al pago 💳
            </button>
          </div>
        </div>
      )}
    </section>
  );
}