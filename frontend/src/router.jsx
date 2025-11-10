// ============================================================
// 🧭 router.jsx — Rutas públicas y protegidas (con ErrorBoundary)
// Paseo Amigo · React Router v6 + AuthContext + ErrorFallback
// ============================================================

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { ErrorBoundary } from "./components/errors/ErrorBoundary.jsx";
import ErrorFallback from "./components/errors/ErrorFallback.jsx";

// 🧱 Páginas públicas
import Home from "./pages/Home.jsx";
import Servicios from "./pages/Servicios.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import NotFound from "./pages/NotFound.jsx";

// 🧱 Páginas protegidas
import Checkout from "./pages/Checkout.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

// ============================================================
// 🚀 Configuración del Router
// ============================================================

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <ErrorFallback />,

    children: [
      // Rutas públicas
      { index: true, element: <Home /> },
      { path: "servicios", element: <Servicios /> },
      { path: "galeria", element: <GalleryPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "auth/login", element: <LoginPage /> },
      { path: "auth/register", element: <RegisterPage /> },

      // Rutas protegidas
      {
        element: <ProtectedRoute />,
        children: [
          { path: "checkout", element: <Checkout /> },
          { path: "pago", element: <PaymentPage /> },
        ],
      },

      // Ruta 404
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
