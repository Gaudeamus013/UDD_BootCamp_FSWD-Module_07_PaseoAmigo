import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* ===========================
            BLOQUE IZQUIERDO: TEXTO + CTA
        ============================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            <span className="text-brand">Paseos felices</span> para perros felices 🐾
          </h1>

          <p className="text-lg text-gray-600 max-w-lg">
            En <span className="font-semibold text-brand-dark">Paseo Amigo</span> 
            entendemos que tu mascota es parte de tu familia. 
            Ofrecemos paseos seguros, divertidos y personalizados 
            para mejorar su bienestar y energía.
          </p>

          <div className="pt-4">
            <Link
              to="/checkout"
              className="btn btn-brand hover:scale-105 transform transition-transform duration-300 shadow-md"
            >
              Agendar Paseo 🐕
            </Link>
          </div>
        </motion.div>

        {/* ===========================
            BLOQUE DERECHO: IMAGEN
        ============================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1601758125946-6ec2b73e3f66?auto=format&fit=crop&w=800&q=80"
            alt="Paseo con perro en el parque"
            className="rounded-3xl shadow-xl object-cover w-full h-[400px] md:h-[480px]"
          />
          <div className="absolute -bottom-4 -right-4 bg-brand text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium">
            +100 paseos felices 🌟
          </div>
        </motion.div>
      </div>
    </section>
  );
}
