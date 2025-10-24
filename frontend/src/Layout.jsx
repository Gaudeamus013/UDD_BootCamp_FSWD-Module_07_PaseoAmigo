import React from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import useScrollHeader from "./hooks/useScrollHeader.jsx"
import ScrollToTop from "./components/navigation/ScrollToTop.jsx"
import ThemeSwitch from "./components/ui/ThemeSwitch.jsx"

export default function Layout() {
  const location = useLocation()
  const isScrolled = useScrollHeader()

  return (
    <div className="min-h-screen flex flex-col bg-secondary-light text-text-light dark:bg-secondary-dark dark:text-text-dark transition-colors duration-500 ease-in-out">
      {/* HEADER */}
      <header
        className={`sticky top-0 z-20 backdrop-blur-xl transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-neutral-900/90 shadow-md border-b border-gray-200 dark:border-neutral-800"
            : "bg-white/40 dark:bg-neutral-900/40 border-transparent shadow-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
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

          {/* Navegación + Modo Oscuro */}
          <nav className="flex items-center gap-6 text-sm">
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
              to="/galeria"
              className={`transition-colors duration-200 ${
                location.pathname === "/galeria"
                  ? "text-primary-light dark:text-primary-dark font-medium"
                  : "hover:text-primary-light dark:hover:text-primary-dark"
              }`}
            >
              Galería
            </Link>
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

            {/* Botón de modo oscuro */}
            <ThemeSwitch />
          </nav>
        </div>
      </header>

      {/* Scroll top automático */}
      <ScrollToTop />

      {/* Transición global */}
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

      {/* FOOTER */}
      <footer className="border-t border-gray-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
          © {new Date().getFullYear()} Paseo Amigo — Hecho con ❤️ en Chile
        </div>
      </footer>
    </div>
  )
}
