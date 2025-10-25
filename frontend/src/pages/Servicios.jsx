// ============================================================
// 🐾 Paseo Amigo – Página de Servicios (Emergent UI Final)
// ============================================================
// - Fotografías reales día/noche (Cloudinary + fallback local)
// - Modo oscuro reactivo automático
// - Animaciones suaves con framer-motion
// - Diseño editorial coherente con LandingPage
// ============================================================

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// 🌤️ Imágenes Cloudinary (modo día/noche)
const heroImages = {
  corto: {
    day: "https://res.cloudinary.com/dmnxyqxcz/image/upload/q_auto,f_auto,dpr_auto,c_fill,g_auto/v1/paseoamigo/servicio-corto.jpg",
    night: "https://res.cloudinary.com/dmnxyqxcz/image/upload/q_auto,f_auto,dpr_auto,c_fill,g_auto/v1/paseoamigo/servicio-corto-night.jpg",
  },
  largo: {
    day: "https://res.cloudinary.com/dmnxyqxcz/image/upload/q_auto,f_auto,dpr_auto,c_fill,g_auto/v1/paseoamigo/servicio-largo.jpg",
    night: "https://res.cloudinary.com/dmnxyqxcz/image/upload/q_auto,f_auto,dpr_auto,c_fill,g_auto/v1/paseoamigo/servicio-largo-night.jpg",
  },
  especial: {
    day: "https://res.cloudinary.com/dmnxyqxcz/image/upload/q_auto,f_auto,dpr_auto,c_fill,g_auto/v1/paseoamigo/servicio-especial.jpg",
    night: "https://res.cloudinary.com/dmnxyqxcz/image/upload/q_auto,f_auto,dpr_auto,c_fill,g_auto/v1/paseoamigo/servicio-especial-night.jpg",
  },
};

// 🎨 Definición base de servicios
const serviciosBase = [
  {
    id: "corto",
    titulo: "Paseos Cortos",
    descripcion:
      "Paseos de 30 minutos ideales para razas pequeñas, adultos mayores o perros de baja energía. Perfectos para un respiro y contacto con la naturaleza.",
    color:
      "from-emerald-100/60 to-emerald-50/20 dark:from-emerald-900/40 dark:to-emerald-800/20",
  },
  {
    id: "largo",
    titulo: "Paseos Largos",
    descripcion:
      "Sesiones de 50 minutos con actividades de estimulación, juego y socialización. Incluyen hidratación y seguimiento GPS del recorrido.",
    color:
      "from-sky-100/60 to-sky-50/20 dark:from-sky-900/40 dark:to-sky-800/20",
  },
  {
    id: "especial",
    titulo: "Cuidado Especial",
    descripcion:
      "Paseos personalizados para cachorros, perros senior o con necesidades médicas. Ritmo tranquilo, supervisión constante y cariño garantizado.",
    color:
      "from-amber-100/60 to-amber-50/20 dark:from-amber-900/40 dark:to-amber-800/20",
  },
];

export default function Servicios() {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Detectar cambios de modo oscuro en tiempo real
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDarkMode(dark);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark transition-colors duration-700 ease-in-out">
      {/* ================= HERO ================= */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-4"
        >
          Nuestros Servicios 🐕‍🦺
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Diseñados para adaptarse a las necesidades de cada mascota.  
          En Paseo Amigo, cada paseo es una experiencia única 💚
        </motion.p>
      </section>

      {/* ================= CARDS ================= */}
      <section className="grid gap-12 px-6 md:px-16 lg:px-24 pb-24">
        {serviciosBase.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
            className={`rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-neutral-700 bg-gradient-to-br ${s.color}`}
          >
            <div className="grid md:grid-cols-2">
              {/* Imagen */}
              <div className="relative h-64 md:h-auto">
                <img
                  src={
                    isDarkMode
                      ? heroImages[s.id].night
                      : heroImages[s.id].day
                  }
                  alt={s.titulo}
                  loading="lazy"
                  className="object-cover w-full h-full transition-all duration-700 ease-in-out"
                  // Fallback automático si Cloudinary falla
                  onError={(e) =>
                    (e.target.src = `/assets/img/servicio-${s.id}${
                      isDarkMode ? "-night" : ""
                    }.jpg`)
                  }
                />
              </div>

              {/* Contenido */}
              <div className="flex flex-col justify-center p-8 text-center md:text-left">
                <h2 className="text-3xl font-semibold mb-4">{s.titulo}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {s.descripcion}
                </p>
                <Link
                  to={`/checkout?type=${s.id}`}
                  className="self-center md:self-start bg-primary-light hover:bg-brand-dark text-white px-6 py-3 rounded-full font-semibold shadow-soft transition-transform duration-300 hover:scale-105"
                >
                  Agendar Paseo
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
