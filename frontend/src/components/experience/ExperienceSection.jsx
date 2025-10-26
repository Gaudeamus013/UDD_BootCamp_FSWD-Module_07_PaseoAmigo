// ============================================================
// 📂 src/components/experience/ExperienceSection.jsx
// 🐾 Paseo Amigo – Sección de Experiencias / Testimonios (Versión MVP Limpia)
// ============================================================
// ✨ Características de esta versión:
// - Estructura estática: 3 testimonios visibles simultáneamente.
// - Sin Embla, sin autoplay, sin glass reflection.
// - Animaciones suaves con Framer Motion (fade + slide).
// - Soporte para modo claro / oscuro.
// - Ideal para presentaciones MVP (rendimiento alto y foco en contenido).
// ============================================================

import React from "react";
import { motion } from "framer-motion";

// ============================================================
// 🐶 Testimonios (datos de muestra)
// ============================================================
const testimonios = [
  {
    nombre: "Carla",
    comuna: "Las Condes",
    texto:
      "Desde que contraté Paseo Amigo, mi perrita Luna está mucho más feliz y tranquila. El servicio es puntual y se nota el cariño con el que la tratan. ¡Los recomiendo totalmente!",
    imagenCloud:
      "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761411504/paseoamigo/testimonio_carla_lascondes.jpg",
    imagenLocal: "/assets/img/testimonios/testimonio_carla_lascondes.jpg",
  },
  {
    nombre: "María José",
    comuna: "Ñuñoa",
    texto:
      "Mi perro Rocky disfruta cada paseo. Además, me encanta que siempre me envíen el registro GPS y fotos. Paseo Amigo es sin duda un servicio confiable y profesional.",
    imagenCloud:
      "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761411527/paseoamigo/testimonio_maria_nunoa.jpg",
    imagenLocal: "/assets/img/testimonios/testimonio_maria_nunoa.jpg",
  },
  {
    nombre: "Rodrigo",
    comuna: "Providencia",
    texto:
      "Llevo tres meses con Paseo Amigo y mi pastor alemán Max se ha adaptado increíblemente. Se nota la experiencia y la empatía del equipo, ¡un servicio de primer nivel!",
    imagenCloud:
      "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761411538/paseoamigo/testimonio_rodrigo_providencia.jpg",
    imagenLocal: "/assets/img/testimonios/testimonio_rodrigo_providencia.jpg",
  },
];

// ============================================================
// 🎬 Componente principal
// ============================================================
export default function ExperienceSection() {
  // Variantes de animación para entrada progresiva
  const fadeSlideIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="experiencia"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeSlideIn}
      className="py-20 px-8 transition-colors duration-700 
                 bg-gradient-to-b from-white via-amber-50 to-white 
                 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
    >
      {/* ======================================================
         🎯 Encabezado de sección
      ====================================================== */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4"
        >
          Experiencias que inspiran confianza
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-subtext-light dark:text-subtext-dark"
        >
          Conoce lo que nuestros clientes dicen sobre Paseo Amigo 🐾
        </motion.p>
      </div>

      {/* ======================================================
         🐾 Testimonios estáticos
      ====================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonios.map((t, i) => (
          <motion.div
            key={i}
            className="relative bg-white/90 dark:bg-neutral-800/80 rounded-2xl shadow-md 
                       hover:shadow-xl p-8 text-center transition-all duration-500 overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Imagen circular */}
            <div className="flex justify-center mb-6 relative z-10">
              <img
                src={t.imagenCloud}
                alt={`Foto de ${t.nombre} - ${t.comuna}`}
                className="w-24 h-24 object-cover rounded-full shadow-md 
                           border-4 border-primary-light dark:border-primary-dark 
                           transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Texto testimonial */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 relative z-10">
              {t.nombre}
            </h3>
            <p className="text-sm text-primary-light dark:text-primary-dark font-medium mb-3 relative z-10">
              {t.comuna}
            </p>
            <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed max-w-md mx-auto relative z-10">
              “{t.texto}”
            </p>
          </motion.div>
        ))}
      </div>

      {/* ======================================================
         📌 TODO: Revisión para versión 2.0 (carrusel dinámico)
      ======================================================
         • Integrar nuevamente Embla con autoplay y preload.
         • Reactivar efectos visuales avanzados si son relevantes
           para la experiencia de usuario final.
         ====================================================== */}
    </motion.section>
  );
}
