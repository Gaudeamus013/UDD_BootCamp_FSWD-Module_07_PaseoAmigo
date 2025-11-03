import { motion } from "framer-motion";

export default function ServiciosPreview() {
  const isDev = import.meta.env.MODE === "development";
  const iconBaseURL = isDev
    ? "/assets/icons/"
    : "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1762198660/paseoamigo/icons/";

  const servicios = [
    {
      title: "Paseo Corto (30 min)",
      desc: "Ideal para perros pequeños o con menor energía.",
      icon: "walk-30.svg",
    },
    {
      title: "Paseo Largo (50 min)",
      desc: "Ejercicio completo y diversión asegurada.",
      icon: "walk-50.svg",
    },
    {
      title: "Paseo Doble (2 perros)",
      desc: "Servicio especial para pasear dos perros del mismo hogar.",
      icon: "walk-double.svg",
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
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10">
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
            className="bg-white/70 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-xl transition-shadow"
          >
            <img
              src={`${iconBaseURL}${srv.icon}`}
              alt={srv.title}
              className="w-14 h-14 mx-auto mb-4 transition-all duration-500 dark:invert dark:brightness-200"
              onError={(e) => {
                // fallback local + ajuste de color
                e.target.src = `/assets/icons/${srv.icon}`;
                e.target.classList.add(
                  "transition-all",
                  "duration-500",
                  "dark:invert",
                  "dark:brightness-200"
                );
              }}
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
              {srv.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{srv.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
