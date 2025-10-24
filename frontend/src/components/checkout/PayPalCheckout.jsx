import React, { useCallback } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const currency = import.meta.env.VITE_PAYPAL_CURRENCY || "USD";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export default function PayPalCheckout() {
  const { items, total } = useCart();
  const navigate = useNavigate();

  const createOrder = useCallback(async () => {
    try {
      const res = await fetch(`${backendURL}/api/paypal/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          total: Number(total.toFixed(2)),
          currency,
        }),
      });
      if (!res.ok) throw new Error("No se pudo crear la orden");
      const data = await res.json();
      if (!data?.id) throw new Error("Respuesta inválida del backend");
      return data.id;
    } catch (err) {
      alert("Error creando la orden: " + err.message);
      throw err;
    }
  }, [items, total]);

  const onApprove = useCallback(async (data, actions) => {
    try {
      // IMPORTANTE: Capturar en el BACKEND, no en el cliente
      const res = await fetch(`${backendURL}/api/paypal/capture-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID }),
      });
      if (!res.ok) throw new Error("No se pudo capturar la orden");
      const details = await res.json();
      // Redirige a página de éxito
      navigate(`/exito?orderId=${encodeURIComponent(data.orderID)}`);
      return details;
    } catch (err) {
      alert("Error al capturar: " + err.message);
      throw err;
    }
  }, [navigate]);

  const onCancel = useCallback(() => {
    navigate("/cancelado");
  }, [navigate]);

  const onError = useCallback((err) => {
    console.error(err);
    alert("Ocurrió un error con PayPal.");
  }, []);

  if (!clientId) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
        <p className="font-semibold">Falta configuración</p>
        <p>Define <code>VITE_PAYPAL_CLIENT_ID</code> en tu <code>.env</code>.</p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ "client-id": clientId, currency }}>
      <div className="p-4 bg-white rounded-2xl border shadow-sm">
        <div className="mb-3">
          <p className="text-sm text-gray-600">Total:</p>
          <p className="text-2xl font-semibold">${"{"}total.toFixed(2){"}"} {currency}</p>
        </div>
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", label: "paypal" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={onCancel}
          onError={onError}
          forceReRender={[total, currency]}
        />
        <p className="mt-2 text-xs text-gray-500">
          Flujo: crear orden (backend) → aprobar (usuario) → capturar (backend).
        </p>
      </div>
    </PayPalScriptProvider>
  );
}
