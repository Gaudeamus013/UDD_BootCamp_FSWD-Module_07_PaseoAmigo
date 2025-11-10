// ============================================================
// 🛡 ProtectedRoute.jsx — Protección de rutas privadas
// Paseo Amigo · usa useUser() para validar sesión JWT
// ============================================================

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Cargando sesión...
      </div>
    );
  }

  if (!isLoggedIn) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth/login?redirect=${redirect}`} replace />;
  }

  return <Outlet />;
}
