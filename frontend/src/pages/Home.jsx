import React from "react";
import Hero from "../components/home/Hero.jsx";
import Servicios from "../components/home/Servicios.jsx";
import Beneficios from "../components/home/Beneficios.jsx";
import Testimonios from "../components/home/Testimonios.jsx";
import CTA from "../components/home/CTA.jsx";

/**
 * Página principal (Landing Page de alto impacto)
 * -------------------------------------------------
 * Estructura modular y escalable:
 * 1. Hero principal (imagen + texto + botón CTA)
 * 2. Servicios destacados (cards animadas)
 * 3. Beneficios (por qué elegir Paseo Amigo)
 * 4. Testimonios (clientes felices)
 * 5. CTA final (llamado a la acción para agendar)
 */
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* ===============================
          🐾 1. Hero principal
          =============================== */}
      <Hero />

      {/* ===============================
          💼 2. Servicios destacados
          =============================== */}
      <Servicios />

      {/* ===============================
          🌿 3. Beneficios
          =============================== */}
      <Beneficios />

      {/* ===============================
          💬 4. Testimonios
          =============================== */}
      <Testimonios />

      {/* ===============================
          🚀 5. CTA final
          =============================== */}
      <CTA />
    </div>
  );
}
