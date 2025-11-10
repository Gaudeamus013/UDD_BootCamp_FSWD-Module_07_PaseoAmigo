import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const heroDayLocal = "/assets/img/hero-day-light.jpg";
  const heroNightLocal = "/assets/img/hero-night-dark.jpg";

  const heroDayCloud =
    "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761335551/hero-day-light_zhhbxf.jpg";
  const heroNightCloud =
    "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761335551/hero-night-dark_ccgc4f.jpg";

  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-between px-6 py-12 md:py-20 max-w-6xl mx-auto mb-0" // 🔧 Ajuste de espaciado
    >
      {/* Texto principal */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center md:text-left md:w-1/2"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
          Paseos felices para <br /> perros felices{" "}
          <span className="text-purple-500">🐾</span>
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
          En{" "}
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            Paseo Amigo
          </span>{" "}
          tu mascota es prioridad. Paseos seguros, divertidos y personalizados
          para mejorar su bienestar y energía.
        </p>

        <Link
          to="/servicios"
          className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 px-6 rounded-full transition inline-flex items-center"
        >
          Agendar Paseo 🐕
        </Link>
      </motion.div>

      {/* Imagen dinámica */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative md:w-1/2 mt-10 md:mt-0 flex justify-center"
      >
        <img
          src={heroDayCloud}
          alt="Paseo Amigo día"
          className="block dark:hidden rounded-3xl shadow-xl object-cover w-full max-w-lg"
          onError={(e) => (e.target.src = heroDayLocal)}
        />
        <img
          src={heroNightCloud}
          alt="Paseo Amigo noche"
          className="hidden dark:block rounded-3xl shadow-xl object-cover w-full max-w-lg"
          onError={(e) => (e.target.src = heroNightLocal)}
        />

        <div className="absolute bottom-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-md text-sm font-medium">
          +100 paseos felices 🌟
        </div>
      </motion.div>
    </section>
  );
}
