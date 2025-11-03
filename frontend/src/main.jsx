// ============================================================
// 🚀 Punto de entrada principal – Paseo Amigo
// ============================================================
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import router from "./router.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./index.css";

const paypalOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: import.meta.env.VITE_PAYPAL_CURRENCY || "USD",
  intent: "capture",
  components: "buttons",
  locale: "es_CL",
};

console.log("🌍 VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider options={paypalOptions}>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </UserProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
);