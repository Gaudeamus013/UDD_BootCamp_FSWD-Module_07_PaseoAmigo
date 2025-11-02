// ============================================================
// 🗺️ Rutas principales del proyecto Paseo Amigo
// ============================================================
// Controla las páginas de alto nivel y sus rutas con React Router
// ============================================================

import React from "react";
import { createBrowserRouter } from "react-router-dom";

// 🌐 Layout global y contextos
import App from "./App.jsx";

// 🧭 Páginas principales
import LandingPage from "./pages/LandingPage.jsx";
import Servicios from "./pages/Servicios.jsx";
import GalleryPage from "./pages/GalleryPage.jsx"; // ✅ nombre correcto
import CartPage from "./pages/CartPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import PaymentPage from "./pages/PaymentPage.jsx"; 
import Exito from "./pages/Exito.jsx";
import Cancelado from "./pages/Cancelado.jsx";

// 👤 Autenticación
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "servicios", element: <Servicios /> },
      { path: "galeria", element: <GalleryPage /> },
      { path: "carrito", element: <CartPage /> },
      { path: "checkout", element: <Checkout /> },
      { path: "pago", element: <PaymentPage /> },
      { path: "exito", element: <Exito /> },
      { path: "cancelado", element: <Cancelado /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

export default router;
  