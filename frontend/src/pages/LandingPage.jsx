// ============================================================
// 🐾 Paseo Amigo – Landing Page Oficial (Emergent UI Final)
// ============================================================
// - Cloudinary + fallback local simultáneo
// - Cambio reactivo día/noche (sin recargar)
// - Coherencia visual con Servicios.jsx
// - Contraste optimizado para modo oscuro/claro
// - Sección de Experiencia con scroll suave (#experiencia)
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ExperienceSection from "@/components/experience/ExperienceSection"; // 🧩 Carrusel integrado

// ☁️ Cloudinary + Fallback local
const heroImages = {
  light: {
    cloud: "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761335551/hero-day-light_zhhbxf.jpg",
    local: "/assets/img/hero-day-light.jpg",
  },
  dark: {
    cloud: "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761335551/hero-night-dark_ccgc4f.jpg",
    local: "/assets/img/hero-night-dark.jpg",
  },
};

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const location = useLocation();

  // ============================================================
  // 🎯 Scroll suave cuando la URL contiene un anclaje (#experiencia)
  // ============================================================
  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // ============================================================
  // 🌓 Observa cambios en el modo día/noche (reactivo)
  // ============================================================
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

  // ============================================================
  // ☁️ Función para obtener imagen de fondo con fallback Cloudinary/local
  // ============================================================
  const getHeroImage = () => {
    const hero = isDarkMode ? heroImages.dark : heroImages.light;
    return `url("${hero.cloud}"), url("${hero.local}")`;
  };

  // ============================================================
  // 🧩 Activa scroll-behavior: smooth globalmente
  // ============================================================
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // ============================================================
  // 🎨 Renderizado principal
  // ============================================================
  return (
    <div className="min-h-screen bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark transition-colors duration-700 ease-in-out">
      {/* ================= HERO ================= */}
      <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-95 dark:brightness-75 transition-all duration-700"
          style={{
            backgroundImage: getHeroImage(),
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-[2px]" />
        </div>

        {/* Contenido principal del hero */}
        <div className="relative z-10 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight text-gray-900 dark:text-gray-100 transition-colors duration-700"
          >
            Paseo Amigo 🐶
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Servicio profesional de paseos y bienestar para tu mascota.
            Confía en quienes los tratan como familia ❤️
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/servicios"
              className="bg-primary-light hover:bg-brand-dark text-white px-8 py-3 rounded-full font-semibold shadow-soft transition-all duration-300 transform hover:scale-105"
            >
              Ver servicios
            </Link>

            <Link
              to="/gallery"
              className="border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark px-8 py-3 rounded-full font-semibold hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
            >
              Galería
            </Link>

            {/* 🔗 Scroll suave hacia la sección de experiencia */}
            <a
              href="#experiencia"
              className="border border-amber-400 text-amber-600 dark:text-amber-300 px-8 py-3 rounded-full font-semibold hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Experiencias
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICIOS PREVIEW ================= */}
      <section className="py-20 px-8 bg-white dark:bg-neutral-900 text-center transition-colors duration-700">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10">
          Nuestros Servicios
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Paseos Cortos",
              desc: "Paseos de 30 min ideales para razas pequeñas o adultos mayores.",
              icon: "🐕",
            },
            {
              title: "Paseos Largos",
              desc: "Sesiones de 50 min con juegos, hidratación y registro GPS.",
              icon: "🏃‍♂️",
            },
            {
              title: "Cuidado Especial",
              desc: "Atención personalizada para cachorros o mascotas con necesidades médicas.",
              icon: "💖",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-secondary-light dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-neutral-700 transition-colors duration-500"
            >
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {s.title}
              </h3>
              <p className="text-subtext-light dark:text-subtext-dark">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= EXPERIENCIA DE USUARIO ================= */}
      <div
        id="experiencia"
        className="transition-colors duration-700 bg-gradient-to-b from-white via-amber-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
      >
        <ExperienceSection />
      </div>

      {/* ================= CONTACTO ================= */}
      <section className="py-20 px-8 text-center bg-secondary-light dark:bg-neutral-950 transition-colors duration-700">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Contáctanos
        </h2>
        <p className="text-subtext-light dark:text-subtext-dark mb-8">
          Agenda un paseo o consulta nuestros planes personalizados.
        </p>
        <a
          href="mailto:contacto@paseoamigo.cl"
          className="inline-block bg-primary-light hover:bg-brand-dark text-white px-8 py-3 rounded-full font-semibold shadow-soft transition-all duration-300 transform hover:scale-105"
        >
          contacto@paseoamigo.cl
        </a>
      </section>
    </div>
  );
}
