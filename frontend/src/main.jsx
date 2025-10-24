// ============================================================
// 🐾 Paseo Amigo – Router Principal (main.jsx)
// ============================================================
// - Configura las rutas base con React Router DOM.
// - Usa App.jsx como layout global (header, footer, transiciones).
// - LandingPage reemplaza a Home como portada principal.
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// 🧱 Layout global
import App from "./App.jsx";

// 🖼️ Páginas principales
import LandingPage from "./pages/LandingPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import Exito from "./pages/Exito.jsx";
import Cancelado from "./pages/Cancelado.jsx";

// ============================================================
// 🧭 Definición de rutas
// ============================================================
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 🏠 Página principal (landing)
      { index: true, element: <LandingPage /> },

      // 🖼️ Galería Cloudinary
      { path: "gallery", element: <GalleryPage /> },

      // 💳 Flujo de pago (PayPal)
      { path: "checkout", element: <Checkout /> },
      { path: "exito", element: <Exito /> },
      { path: "cancelado", element: <Cancelado /> },
    ],
  },
]);

// ============================================================
// 🚀 Renderizado raíz
// ============================================================
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
