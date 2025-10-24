import { motion } from "framer-motion";

export default function Testimonios() {
  const testimonios = [
    {
      nombre: "Camila, Ñuñoa",
      texto: "Mi perro Max adora sus paseos. Son puntuales, amables y siempre me envían fotos durante el recorrido. ¡Confío plenamente en ellos!",
      imagen:
        "https://images.unsplash.com/photo-1603415526960-f7e0328d06c5?auto=format&fit=crop&w=200&q=80",
    },
    {
      nombre: "Rodrigo, Providencia",
      texto: "Tenía dudas al principio, pero fue una gran decisión. Toby vuelve feliz y relajado. El servicio es profesional y cariñoso.",
      imagen:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80",
    },
    {
      nombre: "Valentina, Las Condes",
      texto: "Mi perrita Luna ama a su paseador. Se nota que les gusta su trabajo y tratan a las mascotas con mucho cariño.",
      imagen:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-gray-50 py-20"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonios.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                x: idx % 2 === 0 ? -40 : 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: idx * 0.2,
              }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-all p-6 text-center"
            >
              {/* Imagen circular */}
              <img
                src={t.imagen}
                alt={t.nombre}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4 shadow-md"
              />

              {/* Testimonio */}
              <p className="text-gray-600 italic mb-4 text-sm leading-relaxed">
                “{t.texto}”
              </p>

              {/* Nombre */}
              <h4 className="text-brand-dark font-semibold">{t.nombre}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
