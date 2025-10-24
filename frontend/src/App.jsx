import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "./components/navigation/ScrollToTop.jsx";
import useScrollHeader from "./hooks/useScrollHeader.jsx"; // Hook del header dinámico

export default function App() {
  const location = useLocation();
  const isScrolled = useScrollHeader();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className={`sticky top-0 z-10 backdrop-blur transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 shadow-md border-b border-gray-200"
            : "bg-white/40 border-transparent shadow-none"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* ✅ Logo animado */}
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex h-9 w-9 rounded-full bg-brand/15 items-center justify-center text-brand font-bold shadow-sm"
            >
              PA
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-semibold text-gray-800"
            >
              Paseo Amigo
            </motion.span>
          </Link>

          {/* Navegación */}
          <nav className="flex items-center gap-4 text-sm">
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "text-brand font-medium"
                  : "hover:text-brand transition-colors duration-200"
              }
            >
              Inicio
            </Link>
            <Link
              to="/checkout"
              className={
                location.pathname === "/checkout"
                  ? "text-brand font-medium"
                  : "hover:text-brand transition-colors duration-200"
              }
            >
              Checkout
            </Link>
          </nav>
        </div>
      </header>

      {/* Scroll automático al inicio */}
      <ScrollToTop />

      {/* Contenido con transición global */}
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

      {/* Footer */}
      <footer className="border-t bg-white/70 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-600 text-center sm:text-left">
          © {new Date().getFullYear()} Paseo Amigo — Hecho con ❤️ en Chile
        </div>
      </footer>
    </div>
  );
}
