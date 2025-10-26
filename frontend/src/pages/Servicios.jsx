// ============================================================
// 🐾 Paseo Amigo – Página de Servicios (Emergent UI Final)
// ============================================================
// - Cloudinary (día/noche) con fallback local simultáneo
// - Detección reactiva del modo oscuro
// - Compatible con Vite, Render y Vercel
// - Coherente con LandingPage (Emergent UI Evolutiva)
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 🌤️ URLs Cloudinary + fallback local
const servicios = [
  {
    titulo: "Paseos Cortos",
    descripcion:
      "Paseos de 30 minutos ideales para razas pequeñas o perros senior que prefieren tranquilidad y atención cercana.",
    icono: "🐕",
    imagen: {
      light: {
        cloud:
          "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761363020/servicio-corto-dia_g116ev.jpg",
        local: "/assets/img/servicio-corto-dia.jpg",
      },
      dark: {
        cloud:
          "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761363019/servicio-corto-noche_svwowm.jpg",
        local: "/assets/img/servicio-corto-noche.jpg",
      },
    },
  },
  {
    titulo: "Paseos Largos",
    descripcion:
      "Sesiones de 50 minutos con actividad física, juegos, hidratación y registro GPS para garantizar seguridad y bienestar.",
    icono: "🏃‍♂️",
    imagen: {
      light: {
        cloud:
          "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761363020/servicio-largo-dia_myivui.jpg",
        local: "/assets/img/servicio-largo-dia.jpg",
      },
      dark: {
        cloud:
          "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761363019/servicio-largo-noche_fecw0a.jpg",
        local: "/assets/img/servicio-largo-noche.jpg",
      },
    },
  },
  {
    titulo: "Cuidado Especial",
    descripcion:
      "Atención personalizada para cachorros, perros en recuperación o con necesidades médicas específicas.",
    icono: "💖",
    imagen: {
      light: {
        cloud:
          "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761363021/servicio-especial-dia_ejzgnz.jpg",
        local: "/assets/img/servicio-especial-dia.jpg",
      },
      dark: {
        cloud:
          "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761363020/servicio-especial-noche_pbnapu.jpg",
        local: "/assets/img/servicio-especial-noche.jpg",
      },
    },
  },
];

export default function Servicios() {
  // 🌗 Estado reactivo para modo oscuro/claro
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Cloudinary + fallback local
  const getImageUrl = (img) => {
    const cloudUrl = isDarkMode ? img.dark.cloud : img.light.cloud;
    const localUrl = isDarkMode ? img.dark.local : img.light.local;
    return `url("${cloudUrl}"), url("${localUrl}")`;
  };

  return (
    <div className="min-h-screen bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark transition-colors duration-700 ease-in-out">
      {/* ================= HERO ================= */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100 transition-colors duration-700"
        >
          Nuestros Servicios 🐾
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Diseñados para adaptarse a las necesidades únicas de tu compañero de
          cuatro patas. Calidad, confianza y amor en cada paseo.
        </motion.p>
      </section>

      {/* ================= SERVICIOS ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-10">
        {servicios.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700"
          >
            {/* Imagen de servicio */}
            <div
              className="h-56 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: getImageUrl(s.imagen),
              }}
            ></div>

            {/* Contenido */}
            <div className="p-6 text-center">
              <div className="text-5xl mb-4">{s.icono}</div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100 transition-colors duration-700">
                {s.titulo}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {s.descripcion}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ================= CTA ================= */}
      <section className="text-center py-16 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 transition-colors duration-700">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100"
        >
          ¿Listo para agendar tu próximo paseo?
        </motion.h2>
        <motion.a
          href="/checkout"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="inline-block bg-primary-light hover:bg-brand-dark text-white px-8 py-3 rounded-full font-semibold shadow-soft transition-all duration-300"
        >
          Reservar ahora
        </motion.a>
      </section>
    </div>
  );
}
