// ============================================================
// 🧭 router.jsx – Enrutador Principal Paseo Amigo
// ============================================================
// Configura las rutas públicas y protegidas del proyecto
// Incluye:
// - Autenticación (Login/Register)
// - Checkout (requiere sesión)
// - Páginas de estado (Éxito/Cancelado)
// ============================================================

import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Servicios from "./pages/Servicios.jsx";
import Galeria from "./pages/Galeria.jsx";
import Experiencia from "./pages/Experiencia.jsx";
import Checkout from "./pages/Checkout.jsx";
import Exito from "./pages/Exito.jsx";
import Cancelado from "./pages/Cancelado.jsx";
import CartPage from "./pages/CartPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

// ✅ Nuevas rutas de autenticación
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "servicios", element: <Servicios /> },
      { path: "galeria", element: <Galeria /> },
      { path: "experiencia", element: <Experiencia /> },
      { path: "checkout", element: <Checkout /> },
      { path: "pago", element: <PaymentPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "exito", element: <Exito /> },
      { path: "cancelado", element: <Cancelado /> },

      // 🔐 Autenticación
      { path: "auth/login", element: <LoginPage /> },
      { path: "auth/register", element: <RegisterPage /> },
    ],
  },
]);
