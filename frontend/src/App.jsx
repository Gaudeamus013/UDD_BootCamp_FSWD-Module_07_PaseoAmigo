// ============================================================
// 🐾 Paseo Amigo – Layout global (App.jsx)
// ============================================================
// - Header dinámico con modo oscuro y scroll reactivo
// - Menú móvil con efecto Parallax + Blur premium (tipo iOS)
// - Botón hamburguesa animado (líneas → X) con microfeedback táctil
// - Transición “spring” al volver al estado inicial
// - Scroll suave hacia sección “Experiencia”
// - Transiciones entre páginas con Framer Motion
// ============================================================

import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useScrollHeader from "./hooks/useScrollHeader.jsx";
import ScrollToTop from "./components/navigation/ScrollToTop.jsx";
import ThemeSwitch from "./components/ui/ThemeSwitch.jsx";

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
         HEADER (Desktop + Mobile)
      ============================================================ */}
      <header
        className={`sticky top-0 z-30 backdrop-blur-xl transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-neutral-900/90 shadow-md border-b border-gray-200 dark:border-neutral-800"
            : "bg-white/40 dark:bg-neutral-900/40 border-transparent shadow-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex h-9 w-9 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 items-center justify-center text-primary-light dark:text-primary-dark font-bold shadow-sm"
            >
              PA
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-display font-semibold text-lg tracking-wide"
            >
              Paseo Amigo
            </motion.span>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              to="/"
              className={`transition-colors duration-200 ${
                location.pathname === "/"
                  ? "text-primary-light dark:text-primary-dark font-medium"
                  : "hover:text-primary-light dark:hover:text-primary-dark"
              }`}
            >
              Inicio
            </Link>

            <Link
              to="/servicios"
              className={`transition-colors duration-200 ${
                location.pathname === "/servicios"
                  ? "text-primary-light dark:text-primary-dark font-medium"
                  : "hover:text-primary-light dark:hover:text-primary-dark"
              }`}
            >
              Servicios
            </Link>

            <Link
              to="/gallery"
              className={`transition-colors duration-200 ${
                location.pathname === "/gallery"
                  ? "text-primary-light dark:text-primary-dark font-medium"
                  : "hover:text-primary-light dark:hover:text-primary-dark"
              }`}
            >
              Galería
            </Link>

            <a
              href="/#experiencia"
              onClick={handleExperienciaClick}
              className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 cursor-pointer"
            >
              Experiencia
            </a>

            <Link
              to="/checkout"
              className={`transition-colors duration-200 ${
                location.pathname === "/checkout"
                  ? "text-primary-light dark:text-primary-dark font-medium"
                  : "hover:text-primary-light dark:hover:text-primary-dark"
              }`}
            >
              Checkout
            </Link>

            <ThemeSwitch />
          </nav>

          {/* ============================================================
             BOTÓN HAMBURGUESA ANIMADO + MICROFEEDBACK + REBOTE
          ============================================================ */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center md:hidden group focus:outline-none transition-transform"
            aria-label="Menú de navegación"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={
                isMenuOpen
                  ? { duration: 0.3, ease: "easeInOut" }
                  : { type: "spring", stiffness: 260, damping: 20 }
              }
              className="absolute w-6 h-[2px] bg-text-light dark:bg-text-dark rounded-full"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute w-6 h-[2px] bg-text-light dark:bg-text-dark rounded-full"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={
                isMenuOpen
                  ? { duration: 0.3, ease: "easeInOut" }
                  : { type: "spring", stiffness: 260, damping: 20 }
              }
              className="absolute w-6 h-[2px] bg-text-light dark:bg-text-dark rounded-full"
            />
          </motion.button>
        </div>

        {/* ============================================================
           MENÚ MÓVIL PARALLAX + BLUR
        ============================================================ */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-8 text-lg font-medium text-gray-800 dark:text-gray-200 animate-parallax-fade-in"
            >
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  location.pathname === "/"
                    ? "text-primary-light dark:text-primary-dark"
                    : "hover:text-primary-light dark:hover:text-primary-dark"
                }`}
              >
                Inicio
              </Link>

              <Link
                to="/servicios"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-primary-light dark:hover:text-primary-dark"
              >
                Servicios
              </Link>

              <Link
                to="/gallery"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-primary-light dark:hover:text-primary-dark"
              >
                Galería
              </Link>

              <a
                href="/#experiencia"
                onClick={handleExperienciaClick}
                className="hover:text-primary-light dark:hover:text-primary-dark cursor-pointer"
              >
                Experiencia
              </a>

              <Link
                to="/checkout"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-primary-light dark:hover:text-primary-dark"
              >
                Checkout
              </Link>

              <ThemeSwitch />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================================
         SCROLL AUTOMÁTICO ENTRE RUTAS
      ============================================================ */}
      <ScrollToTop />

      {/* ============================================================
         CONTENIDO PRINCIPAL
      ============================================================ */}
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
    </div>
  );
}
