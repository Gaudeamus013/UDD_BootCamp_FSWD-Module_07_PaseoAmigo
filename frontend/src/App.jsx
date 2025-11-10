// ============================================================
// 🐾 Paseo Amigo – App.jsx (Versión estable y unificada)
// ============================================================
// - Header modular con login/logout dinámico (AuthContext)
// - Framer Motion + ScrollToTop + modo oscuro
// - Se comenta el antiguo header estático para evitar duplicación
// ============================================================

import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "./components/navigation/ScrollToTop.jsx";
import ThemeSwitch from "./components/ui/ThemeSwitch.jsx";
import useScrollHeader from "./hooks/useScrollHeader.jsx";
import Header from "./components/header/Header.jsx"; // 🧩 Header con AuthContext integrado

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isScrolled = useScrollHeader();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setIsMenuOpen(false), [location]);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const handleExperienciaClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.querySelector("#experiencia");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#experiencia");
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary-light text-text-light dark:bg-secondary-dark dark:text-text-dark transition-colors duration-500 ease-in-out">

      {/* ============================================================
         HEADER MODULAR (ÚNICO)
         ------------------------------------------------------------
         Se conserva solo el Header dinámico conectado a AuthContext.
         El header anterior completo queda comentado más abajo.
      ============================================================ */}
      <Header />

      {/* ============================================================
         CONTENIDO PRINCIPAL
      ============================================================ */}
      <ScrollToTop />
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ============================================================
         FOOTER
      ============================================================ */}
      <footer className="border-t border-gray-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
          © {new Date().getFullYear()} Paseo Amigo — Hecho con ❤️ en Chile
        </div>
      </footer>

      {/*
      =============================================================
      🔒 HEADER ANTIGUO (comentado)
      -------------------------------------------------------------
      Conservado como referencia. Si en el futuro deseas volver
      a un layout híbrido o integrarlo de nuevo, basta con descomentar.
      =============================================================
      <header
        className={`sticky top-0 z-30 backdrop-blur-xl transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-neutral-900/90 shadow-md border-b border-gray-200 dark:border-neutral-800"
            : "bg-white/40 dark:bg-neutral-900/40 border-transparent shadow-none"
        }`}
      >
        ... (código del header antiguo aquí)
      </header>
      */}
    </div>
  );
}
