import { motion } from "framer-motion";

export default function ExperienceSection() {
  const experiencias = [
    {
      nombre: "María",
      comuna: "Ñuñoa",
      comentario:
        "Mi perro Max adora sus paseos. Son puntuales, amables y siempre me envían fotos durante el recorrido. ¡Confío plenamente en ellos!",
      imagen:
        "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761411527/paseoamigo/testimonio_maria_nunoa.jpg",
      local: "/assets/img/testimonios/testimonio_maria_nunoa.jpg",
    },
    {
      nombre: "Rodrigo",
      comuna: "Providencia",
      comentario:
        "Tenía dudas al principio, pero fue una gran decisión. Toby vuelve feliz y relajado. El servicio es profesional y cariñoso.",
      imagen:
        "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761411538/paseoamigo/testimonio_rodrigo_providencia.jpg",
      local: "/assets/img/testimonios/testimonio_rodrigo_providencia.jpg",
    },
    {
      nombre: "Carla",
      comuna: "Las Condes",
      comentario:
        "Mi perrita Luna ama a su paseador. Se nota que les gusta su trabajo y tratan a las mascotas con mucho cariño.",
      imagen:
        "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761411504/paseoamigo/testimonio_carla_lascondes.jpg",
      local: "/assets/img/testimonios/testimonio_carla_lascondes.jpg",
    },
  ];

  const fallback =
    "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761412895/paseoamigo/fallback-user.jpg";

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent to-white/10 dark:to-black/20 transition-colors">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Experiencias que inspiran confianza 🐾
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Descubre cómo Paseo Amigo ha mejorado la vida de nuestros clientes y sus compañeros de
          cuatro patas.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {experiencias.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="relative bg-white/70 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-all p-6"
          >
            <img
              src={exp.imagen}
              alt={`${exp.nombre} - ${exp.comuna}`}
              className="w-20 h-20 rounded-full mx-auto object-cover mb-4 border-4 border-emerald-400/80 shadow-md dark:border-emerald-500/70"
              onError={(e) => {
                // Si falla Cloudinary → intenta local
                e.target.onerror = () => {
                  // Si también falla local → usa fallback-user
                  e.target.src = fallback;
                };
                e.target.src = exp.local;
              }}
            />
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              “{exp.comentario}”
            </p>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {exp.nombre}, {exp.comuna}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
