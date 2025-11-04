// ============================================================
// 🏠 Home.jsx – Landing page principal
// ============================================================
import React from "react";
import Hero from "../components/home/Hero.jsx";
import ServiciosPreview from "../components/home/ServiciosPreview.jsx";
import ExperienceSection from "../components/experience/ExperienceSection.jsx";

export default function Home() {
  return (
    <div className="bg-secondary-light dark:bg-secondary-dark">
      <Hero />
      <ServiciosPreview />
      <ExperienceSection />
    </div>
  );
}