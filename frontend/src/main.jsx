// ============================================================
// 🚪 main.jsx — Bootstrapping global con ErrorBoundary
// Paseo Amigo · React 18 + Vite + Tailwind + PayPal + AuthContext
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ErrorBoundary } from "./components/errors/ErrorBoundary.jsx";
import ErrorFallback from "./components/errors/ErrorFallback.jsx";
import router from "./router.jsx";

// Contextos globales
import { UserProvider } from "./context/UserContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import "./index.css";

// ============================================================
// 💳 Configuración PayPal
// ============================================================
const paypalOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
  currency: import.meta.env.VITE_PAYPAL_CURRENCY || "USD",
  intent: "capture",
  components: "buttons",
  locale: "es_CL",
};

// ============================================================
// 🚀 Renderización principal
// ============================================================
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PayPalScriptProvider options={paypalOptions}>
        <UserProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </UserProvider>
      </PayPalScriptProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
