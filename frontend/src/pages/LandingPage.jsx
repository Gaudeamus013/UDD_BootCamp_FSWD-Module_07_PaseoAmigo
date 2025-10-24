// ============================================================
// 🐾 Paseo Amigo – Landing Page de presentación
// ============================================================
// - Hero con animaciones y CTA
// - Secciones "Servicios", "Galería", "Contacto"
// - Diseño responsive con Tailwind y framer-motion
// ============================================================

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-blue-700 mb-4"
        >
          Paseo Amigo 🐶
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl"
        >
          Servicio profesional de paseos y bienestar para tu mascota.
          Confía en quienes los tratan como familia ❤️
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 flex gap-4"
        >
          <Link
            to="/services"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow"
          >
            Ver servicios
          </Link>
          <Link
            to="/gallery"
            className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50"
          >
            Galería
          </Link>
        </motion.div>
      </section>

      {/* SERVICIOS */}
      <section className="py-16 px-8 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Nuestros Servicios
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
              className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100"
            >
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="py-16 px-8 text-center bg-blue-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Contáctanos
        </h2>
        <p className="text-gray-600 mb-8">
          Agenda un paseo o consulta nuestros planes personalizados.
        </p>
        <a
          href="mailto:contacto@paseoamigo.cl"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow"
        >
          contacto@paseoamigo.cl
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-700 text-white py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Paseo Amigo — Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
