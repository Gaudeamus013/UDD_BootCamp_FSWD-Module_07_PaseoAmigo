import { motion } from "framer-motion";

export default function Servicios() {
  const servicios = [
    {
      title: "Paseo Corto (30 min)",
      desc: "Ideal para perros pequeños o con menor energía.",
      icon: "🐕‍🦺",
    },
    {
      title: "Paseo Largo (50 min)",
      desc: "Ejercicio completo y diversión asegurada.",
      icon: "🏞️",
    },
    {
      title: "Paseo Premium",
      desc: "Sesión de paseo y entrenamiento personalizado.",
      icon: "✨",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-6xl mx-auto px-4 py-20 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
        Nuestros Servicios
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {servicios.map((srv, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">{srv.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {srv.title}
            </h3>
            <p className="text-gray-600">{srv.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
