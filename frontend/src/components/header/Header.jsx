// ============================================================
// 🔝 components/header/Header.jsx — Encabezado con Auth + ThemeSwitch
// Paseo Amigo · Tailwind + Framer Motion
// ------------------------------------------------------------
// - Muestra Login/Registro si no hay sesión.
// - Muestra "Bienvenido, {nombre}" + Logout si hay sesión.
// - Incluye el ThemeSwitch para modo claro/oscuro.
// ============================================================

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { motion } from "framer-motion";
import ThemeSwitch from "../ui/ThemeSwitch.jsx"; // 🌓 Botón de modo claro/oscuro

export default function Header() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useUser();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Marca */}
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-primary">🐾</span>
            <span className="tracking-tight">Paseo Amigo</span>
          </Link>

          {/* Navegación principal */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/servicios" className="hover:text-primary transition">
              Servicios
            </Link>
            <Link to="/galeria" className="hover:text-primary transition">
              Galería
            </Link>
            <Link to="/cart" className="hover:text-primary transition">
              Carrito
            </Link>
            <Link to="/checkout" className="hover:text-primary transition">
              Checkout
            </Link>
          </nav>

          {/* Acciones de sesión + Switch */}
          <div className="flex items-center gap-3">
            {/* 🌓 Botón de modo día/noche */}
            <ThemeSwitch />

            {isLoggedIn ? (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <span className="text-sm opacity-80 hidden sm:inline">
                  Bienvenido{user?.name ? `, ${user.name}` : ""}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center rounded-lg px-3 py-2 text-sm border border-white/10 hover:border-primary hover:text-primary transition"
                >
                  Cerrar sesión
                </button>
              </motion.div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center rounded-lg px-3 py-2 text-sm border border-white/10 hover:border-primary hover:text-primary transition"
                >
                  Ingresar
                </Link>
                <Link
                  to="/auth/register"
                  className="inline-flex items-center rounded-lg px-3 py-2 text-sm bg-primary/10 hover:bg-primary/20 transition"
                >
                  Crear cuenta
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
