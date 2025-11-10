// ============================================================
// 🏠 Home.jsx – Landing page compacta (versión fluida continua)
// ============================================================
// - Reduce márgenes verticales y elimina divisores visibles
// - Optimizada para scroll natural en pantallas medianas
// - Sin alterar diseño ni componentes individuales
// ============================================================

import React from "react";
import Hero from "../components/home/Hero.jsx";
import ServiciosPreview from "../components/home/ServiciosPreview.jsx";
import ExperienceShowcase from "../components/home/ExperienceShowcase.jsx";
import CTA from "../components/home/CTA.jsx";
import Beneficios from "../components/home/Beneficios.jsx";

export default function Home() {
  return (
    <div className="bg-secondary-light dark:bg-secondary-dark">
      {/* 🦮 Sección principal */}
      <section id="hero" className="scroll-mt-24 pb-6 md:pb-8">
        <Hero />
      </section>

      {/* 💼 Servicios */}
      <section id="servicios" className="scroll-mt-24 pt-2 pb-8 md:pb-10">
        <ServiciosPreview />
      </section>

      {/* 💬 Testimonios */}
      <section id="experiencia" className="scroll-mt-24 pt-2 pb-10 md:pb-12">
        <ExperienceShowcase />
      </section>

      {/* 🌟 Beneficios */}
      <section id="beneficios" className="scroll-mt-24 pt-2 pb-10 md:pb-12">
        <Beneficios />
      </section>

      {/* 🚀 Llamado a la acción */}
      <section id="cta" className="scroll-mt-24 pt-6 pb-16 md:pb-20">
        <CTA />
      </section>
    </div>
  );
}
