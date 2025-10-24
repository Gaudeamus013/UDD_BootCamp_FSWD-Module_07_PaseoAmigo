// ============================================================
// 🐾 Paseo Amigo – Landing Page Oficial (Emergent UI Evolutiva)
// ============================================================
// - Hero visual con fondo real (Cloudinary + fallback local)
// - Sección "Servicios" modular con animaciones
// - Sección "Contacto" coherente con el layout global
// - Modo claro/oscuro reactivo en tiempo real (con MutationObserver)
// ============================================================

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// 🌤️ URLs de Cloudinary optimizadas (usa tus propias rutas con versión)
const heroImages = {
  light:
    "https://res.cloudinary.com/dmnxyqxcz/image/upload/q_auto,f_auto,dpr_auto,c_fill,g_auto/v1761335551/hero-day-light_zhhbxf.jpg",
  dark:
    "https://res.cloudinary.com/dmnxyqxcz/image/upload/q_auto,f_auto,dpr_auto,c_fill,g_auto/v1761335551/hero-night-dark_ccgc4f.jpg",
};

// 💾 Fallback local (asegúrate de tener estos .jpg en /public/assets/img/)
const localImages = {
  light: "/assets/img/hero-day-light.jpg",
  dark: "/assets/img/hero-night-dark.jpg",
};

export default function LandingPage() {
  // Estado del tema (día/noche)
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  // 🔄 Observa cambios dinámicos del modo oscuro
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // 🧩 Fondo dinámico con fallback local
  const backgroundImage = isDarkMode
    ? `url('${heroImages.dark}'), url('${localImages.dark}')`
    : `url('${heroImages.light}'), url('${localImages.light}')`;

  return (
    <div className="min-h-screen bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark transition-colors duration-700 ease-in-out">
      {/* ================= HERO ================= */}
      <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden">
        {/* Imagen de fondo (Cloudinary + fallback local) */}
        <div
          className="absolute inset-0 brightness-95 dark:brightness-75 transition-all duration-700"
          style={{
            backgroundImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-[2px]" />
        </div>

        {/* Contenido Hero */}
        <div className="relative z-10 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight"
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

          {/* CTA */}
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
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICIOS ================= */}
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
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-subtext-light dark:text-subtext-dark">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CONTACTO ================= */}
      <section className="py-20 px-8 text-center bg-secondary-light dark:bg-neutral-950 transition-colors duration-700">
        <h2 className="text-3xl font-bold mb-4">Contáctanos</h2>
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
