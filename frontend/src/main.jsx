// ============================================================
// 🐾 Paseo Amigo – Router Principal (main.jsx)
// ============================================================
// - Define las rutas base del frontend con React Router DOM.
// - Usa App.jsx como layout global (Header, Footer, transiciones).
// - Contiene todas las páginas principales del flujo MVP:
//   Landing → Servicios → Galería → Carrito → Checkout → Éxito / Cancelado
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// 🧱 Layout global con header, footer y transiciones
import App from "./App.jsx";

// 🖼️ Páginas principales
import LandingPage from "./pages/LandingPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import Servicios from "./pages/Servicios.jsx";

// 🛒 Flujo de compra completo
import CartPage from "./pages/CartPage.jsx";          // 🆕 Página del carrito
import Checkout from "./pages/Checkout.jsx";  // 🆕 Checkout integrado con PayPal
import Exito from "./pages/Exito.jsx";
import Cancelado from "./pages/Cancelado.jsx";

// ============================================================
// 🧭 Definición de rutas
// ============================================================
// App.jsx actúa como contenedor principal (usa <Outlet />)
// Cada ruta hija representa una página independiente dentro del layout.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 🏠 Página principal
      { index: true, element: <LandingPage /> },

      // 🐕‍🦺 Servicios disponibles
      { path: "servicios", element: <Servicios /> },

      // 🖼️ Galería (Cloudinary)
      { path: "gallery", element: <GalleryPage /> },

      // 🛍️ Carrito de compras
      { path: "cart", element: <CartPage /> },

      // 💳 Checkout con PayPal Sandbox
      { path: "checkout", element: <Checkout /> },

      // ✅ Éxito de pago
      { path: "exito", element: <Exito /> },

      // ❌ Pago cancelado
      { path: "cancelado", element: <Cancelado /> },
    ],
  },
]);

// ============================================================
// 🚀 Renderizado raíz del frontend
// ============================================================
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
