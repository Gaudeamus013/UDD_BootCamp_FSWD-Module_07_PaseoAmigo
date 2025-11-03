// ============================================================
// 🧭 router.jsx – Enrutador Principal Paseo Amigo (v3)
// ============================================================
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Servicios from "./pages/Servicios.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import Exito from "./pages/Exito.jsx";
import Cancelado from "./pages/Cancelado.jsx";
import CartPage from "./pages/CartPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import ErrorFallback from "./components/errors/ErrorFallback.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Home /> },
      { path: "servicios", element: <Servicios /> },
      { path: "galeria", element: <GalleryPage /> },
      { path: "checkout", element: <Checkout /> },
      { path: "pago", element: <PaymentPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "exito", element: <Exito /> },
      { path: "cancelado", element: <Cancelado /> },
      { path: "auth/login", element: <LoginPage /> },
      { path: "auth/register", element: <RegisterPage /> },
    ],
  },
]);