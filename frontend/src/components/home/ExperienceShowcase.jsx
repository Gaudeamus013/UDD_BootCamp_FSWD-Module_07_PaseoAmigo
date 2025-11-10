// ============================================================
// 🐾 components/home/ExperienceShowcase.jsx
// ------------------------------------------------------------
// - Restaura Cloudinary + fallback local.
// - Corrige márgenes y espaciado sin romper el layout.
// - Respeta texto, animaciones y diseño original.
// ============================================================

import { motion } from "framer-motion";

const CLOUD = {
  fallback:
    "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761412895/paseoamigo/fallback-user.jpg",
  carla:
    "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761411504/paseoamigo/testimonio_carla_lascondes.jpg",
  maria:
    "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761411527/paseoamigo/testimonio_maria_nunoa.jpg",
  rodrigo:
    "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761411538/paseoamigo/testimonio_rodrigo_providencia.jpg",
};

const LOCAL = {
  fallback: "/assets/img/testimonios/fallback-user.jpg",
  carla: "/assets/img/testimonios/testimonio_carla_lascondes.jpg",
  maria: "/assets/img/testimonios/testimonio_maria_nunoa.jpg",
  rodrigo: "/assets/img/testimonios/testimonio_rodrigo_providencia.jpg",
};

const testimonios = [
  {
    nombre: "Carla, Las Condes",
    texto:
      "Mi perro Max adora sus paseos. Son puntuales, amables y siempre me envían fotos durante el recorrido. ¡Confío plenamente en ellos!",
    cloud: CLOUD.carla,
    local: LOCAL.carla,
  },
  {
    nombre: "María José, Ñuñoa",
    texto:
      "Tenía dudas al principio, pero fue una gran decisión. Mi Toby vuelve feliz y relajado. El servicio es profesional y cariñoso.",
    cloud: CLOUD.maria,
    local: LOCAL.maria,
  },
  {
    nombre: "Rodrigo, Providencia",
    texto:
      "Se nota que les gusta su trabajo y tratan a las mascotas con mucho cariño. 100% recomendados.",
    cloud: CLOUD.rodrigo,
    local: LOCAL.rodrigo,
  },
];

export default function ExperienceShowcase() {
  return (
    <motion.section
      id="experiencia"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-gradient-to-b from-transparent to-white/5 dark:to-black/20 py-12 md:py-16 px-6"
    >
      {/* Encabezado */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Experiencia y confianza que nos respaldan
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Más de 5 años paseando perros felices en Santiago. Nuestro equipo está
          formado por amantes de los animales, comprometidos con su seguridad,
          diversión y bienestar. Esto dicen nuestros clientes:
        </p>
      </div>

      {/* Tarjetas de testimonios */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonios.map((t, idx) => (
          <motion.div
            key={t.nombre}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-lg p-6 text-center"
          >
            <img
              src={t.cloud}
              alt={t.nombre}
              onError={(e) => {
                e.currentTarget.src = t.local || CLOUD.fallback;
              }}
              className="w-20 h-20 mx-auto rounded-full object-cover mb-4 shadow-md transition-all dark:invert-0 dark:brightness-110"
            />
            <p className="text-gray-700 dark:text-gray-300 italic mb-4 text-sm leading-relaxed">
              “{t.texto}”
            </p>
            <h4 className="text-emerald-600 dark:text-emerald-400 font-semibold">
              {t.nombre}
            </h4>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
