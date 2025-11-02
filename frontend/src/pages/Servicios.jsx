import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/api";
import { useUser } from "../context/UserContext.jsx";
import ToastAlert from "../components/ui/ToastAlert.jsx";
import { motion } from "framer-motion";

// ============================================================
// 🐾 Paseo Amigo – Servicios.jsx (versión FIXED)
// ============================================================
// • Usa verificación moderna de sesión: const isLoggedIn = !!user
// • Muestra ToastAlert si el usuario intenta comprar sin login
// • Mantiene compatibilidad con modo día/noche y UI general
// ============================================================

export default function Servicios() {
  const { user } = useUser();
  const isLoggedIn = !!user;

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/walktypes`);
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Error cargando servicios:", error);
        setMessage("No se pudieron cargar los servicios.");
        setType("error");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleAddToCart = (service) => {
    if (!isLoggedIn) {
      setType("warning");
      setMessage("Debes iniciar sesión para continuar.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item._id === service._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...service, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setType("success");
    setMessage("Servicio agregado al carrito.");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-transparent to-white/5 dark:to-black/20 py-16 px-6 transition-colors">
      <ToastAlert message={message} type={type} />

      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
          Nuestros Servicios 🐶
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Elige el paseo ideal para tu compañero, según su energía y tiempo disponible.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-400">Cargando servicios...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-red-500">No se pudieron cargar los servicios.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <motion.div
              key={service._id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white/70 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md overflow-hidden flex flex-col"
            >
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {service.name}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{service.description}</p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    ${service.price.toLocaleString("es-CL")}
                  </span>
                  <button
                    onClick={() => handleAddToCart(service)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg transition"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
