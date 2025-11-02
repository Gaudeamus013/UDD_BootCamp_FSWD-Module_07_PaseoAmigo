// ============================================================
// 💳 Componente: PayPalCheckout.jsx (Versión Final Estable)
// ============================================================

import React, { useCallback, useState, useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";

export default function PayPalCheckout({ total, items }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const currency = import.meta.env.VITE_PAYPAL_CURRENCY || "USD";
  const [loading, setLoading] = useState(false);

  const exchangeRate = 0.0011;
  const usdAmount = (total * exchangeRate).toFixed(2);

  const createOrder = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendURL}/api/checkout/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountClp: total }),
      });
      const data = await res.json();
      if (!res.ok || !data.id) throw new Error(data?.message || "Error creando la orden");
      return data.id;
    } catch (error) {
      console.error("❌ Error en createOrder:", error);
      navigate("/cancelado");
      return null;
    } finally {
      setLoading(false);
    }
  }, [total, backendURL, navigate]);

  const captureOrder = useCallback(
    async (orderId) => {
      try {
        setLoading(true);
        const res = await fetch(`${backendURL}/api/checkout/capture-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Error al capturar la orden PayPal");

        await fetch(`${backendURL}/api/checkout/register-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?._id || "anónimo",
            orderId: data.id,
            amountClp: total,
            amountUsd: usdAmount,
            items,
            status: data.status || "COMPLETED",
          }),
        });

        navigate("/exito");
      } catch (error) {
        console.error("❌ Error capturando o registrando el pago:", error);
        navigate("/cancelado");
      } finally {
        setLoading(false);
      }
    },
    [backendURL, navigate, total, usdAmount, items, user]
  );

  return (
    <div className="w-full mt-4 flex flex-col items-center">
      <PayPalScriptProvider
        options={{
          "client-id": clientId,
          currency,
          intent: "capture",
          components: "buttons",
        }}
      >
        {loading && <p className="text-sm text-gray-500 mb-2">Procesando pago...</p>}
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
            height: 48,
          }}
          createOrder={async () => {
            const orderId = await createOrder();
            if (!orderId) throw new Error("Error al crear la orden en backend");
            return orderId;
          }}
          onApprove={async (data) => await captureOrder(data.orderID)}
          onCancel={() => navigate("/cancelado")}
          onError={() => navigate("/cancelado")}
        />
        <p className="text-xs text-gray-400 mt-3 text-center">
          Monto: ${total.toLocaleString("es-CL")} CLP (≈ {usdAmount} USD)
          <br />
          Transacción segura mediante PayPal Sandbox.
        </p>
      </PayPalScriptProvider>
    </div>
  );
}
