// src/components/payments/PayPalCheckout.jsx
import React, { useCallback } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const currency = import.meta.env.VITE_PAYPAL_CURRENCY || "USD";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

/**
 * Componente modular PayPal Checkout
 * Props esperadas:
 * - items: array de objetos { id, name, qty, price }
 * - total: número (total de la compra)
 */
export default function PayPalCheckout({ items = [], total = 0 }) {
  const navigate = useNavigate();

  const createOrder = useCallback(async () => {
    try {
      localStorage.setItem("lastTotal", total); // ✅ guarda el monto
      const res = await fetch(`${backendURL}/api/paypal/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total, currency }),
      });
      const data = await res.json();
      if (!res.ok || !data?.id) throw new Error("No se pudo crear la orden.");
      return data.id;
    } catch (error) {
      console.error("❌ Error en createOrder:", error);
      alert("Error creando la orden: " + error.message);
      throw error;
    }
  }, [items, total]);

  const onApprove = useCallback(async (data) => {
    try {
      const res = await fetch(`${backendURL}/api/paypal/capture-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID }),
      });
      const details = await res.json();
      if (!res.ok || details?.status !== "COMPLETED")
        throw new Error("Error al capturar la orden.");
      navigate(`/exito?orderId=${encodeURIComponent(data.orderID)}`);
    } catch (error) {
      console.error("❌ Error al capturar:", error);
      alert("Error capturando la orden: " + error.message);
    }
  }, [navigate]);

  const onCancel = useCallback(() => navigate("/cancelado"), [navigate]);

  if (!clientId) {
    return (
      <div className="p-4 bg-yellow-50 border rounded-xl text-sm">
        ⚠️ Falta configurar <code>VITE_PAYPAL_CLIENT_ID</code> en el archivo <code>.env</code>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ "client-id": clientId, currency }}>
      <div className="p-4 bg-white border rounded-2xl shadow-sm">
        <p className="mb-3 text-gray-700">
          Total: <span className="font-semibold">${total.toFixed(2)} {currency}</span>
        </p>
        <PayPalButtons
          style={{ layout: "vertical", label: "paypal" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={onCancel}
          forceReRender={[total, currency]}
        />
      </div>
    </PayPalScriptProvider>
  );
}
