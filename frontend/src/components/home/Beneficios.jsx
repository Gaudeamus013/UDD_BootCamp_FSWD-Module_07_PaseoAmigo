// ============================================================
// 💡 Beneficios.jsx — Sección de beneficios Paseo Amigo
// ============================================================
// - Ajustes de modo día/noche coherentes con la UI global.
// - Fondo gris claro (día) y gris antracita (noche).
// - Mantiene estructura original, sin alterar animaciones.
// ============================================================

import { motion } from "framer-motion";

export default function Beneficios() {
  const beneficios = [
    {
      titulo: "Cuidadores expertos",
      descripcion:
        "Nuestro equipo está compuesto por amantes de los animales con años de experiencia en paseos y adiestramiento.",
      icono: "🐶",
    },
    {
      titulo: "Seguridad garantizada",
      descripcion:
        "Cada paseo está diseñado pensando en la seguridad, con rutas revisadas y seguimiento en tiempo real.",
      icono: "🦮",
    },
    {
      titulo: "Flexibilidad total",
      descripcion:
        "Reserva en línea, elige horarios y tipos de paseo adaptados al ritmo y energía de tu mascota.",
      icono: "⏰",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="py-16 md:py-20 bg-gray-50 dark:bg-neutral-900 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10">
          ¿Por qué elegir Paseo Amigo?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {beneficios.map((b, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/70 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{b.icono}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {b.titulo}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {b.descripcion}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
