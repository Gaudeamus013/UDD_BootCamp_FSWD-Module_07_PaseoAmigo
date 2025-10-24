import { motion } from "framer-motion";

export default function Beneficios() {
  const beneficios = [
    {
      icon: "🦮",
      title: "Confianza y Seguridad",
      desc: "Nuestros paseadores están certificados y cuentan con experiencia comprobada en manejo responsable de mascotas.",
    },
    {
      icon: "💚",
      title: "Bienestar Animal",
      desc: "Diseñamos cada paseo para el bienestar físico y emocional de tu perro, respetando su ritmo y personalidad.",
    },
    {
      icon: "🕒",
      title: "Flexibilidad Horaria",
      desc: "Elige la hora y duración del paseo según tus necesidades. Nos adaptamos a ti y a tu amigo peludo.",
    },
    {
      icon: "📍",
      title: "Cobertura Local",
      desc: "Disponibles en toda la Región Metropolitana, con rutas seguras y monitoreo en tiempo real.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white py-20"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          ¿Por qué elegir <span className="text-brand">Paseo Amigo</span>?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficios.map((b, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-all p-6"
            >
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {b.title}
              </h3>
              <p className="text-gray-600 text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
