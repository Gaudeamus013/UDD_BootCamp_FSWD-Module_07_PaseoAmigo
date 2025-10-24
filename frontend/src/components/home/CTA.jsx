import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-brand to-brand-dark text-white py-20"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-6"
        >
          ¡Haz feliz a tu mejor amigo hoy mismo! 🐕‍🦺
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Reserva un paseo con nuestros profesionales certificados y descubre
          cómo una rutina feliz mejora la vida de tu perro y la tuya. 
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-brand font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Reserva tu paseo hoy 🚀
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
