// ============================================================
// 💳 Checkout.jsx — Flujo de pago con PayPal
// Paseo Amigo · Integrado con apiClient (JWT + Refresh)
// ============================================================
// - Mantiene la UI y estilo acordados (gradiente, card, ToastAlert)
// - Usa apiClient en lugar de fetch directo
// - Integra PayPal JS SDK (createOrder + onApprove)
// - Llama a:
//      1) POST /api/checkout/create-order
//      2) POST /api/checkout/capture-order
// - Crea Booking en backend al completar el pago
// ============================================================

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { apiClient } from "../lib/apiClient";
import ToastAlert from "../components/ui/ToastAlert.jsx";

// ============================================================
// 🔧 Configuración de entorno
// ============================================================
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const PAYPAL_CURRENCY = import.meta.env.VITE_PAYPAL_CURRENCY || "USD";

// ============================================================
// 🧮 Hook: cálculo de totales CLP y USD estimado
// ============================================================
function useTotals(cart) {
  const totalClp = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  // Debe estar alineado con EXCHANGE_RATE_CLP_TO_USD del backend
  const exchangeRate = 0.0011;
  const priceUSD = useMemo(
    () => Number((totalClp * exchangeRate).toFixed(2)),
    [totalClp]
  );

  return { totalClp, priceUSD };
}

// ============================================================
// 📅 Subcomponente: Formulario de datos de reserva
// ============================================================
function BookingForm({
  serviceType,
  setServiceType,
  dateTime,
  setDateTime,
  durationMins,
  setDurationMins,
  notes,
  setNotes,
}) {
  // Ajusta duración según tipo de servicio de forma automática
  useEffect(() => {
    if (serviceType === "paseo-30") setDurationMins(30);
    else if (serviceType === "paseo-60") setDurationMins(60);
    else if (serviceType === "full") setDurationMins(90);
  }, [serviceType, setDurationMins]);

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Tipo de servicio */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Tipo de servicio
        </label>
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="rounded-xl border border-gray-300 bg-white/80 dark:bg-white/5 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 outline-none ring-emerald-500/40 focus:ring"
        >
          <option value="paseo-30">Paseo 30 minutos</option>
          <option value="paseo-60">Paseo 60 minutos</option>
          <option value="full">Paseo full (90 minutos)</option>
        </select>
      </div>

      {/* Fecha y hora */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Fecha y hora del paseo
        </label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="rounded-xl border border-gray-300 bg-white/80 dark:bg-white/5 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 outline-none ring-emerald-500/40 focus:ring"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Selecciona la fecha y hora de inicio aproximada del paseo.
        </p>
      </div>

      {/* Duración (editable) */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Duración (minutos)
        </label>
        <input
          type="number"
          min={1}
          value={durationMins}
          onChange={(e) =>
            setDurationMins(Number(e.target.value) || 0)
          }
          className="w-32 rounded-xl border border-gray-300 bg-white/80 dark:bg-white/5 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 outline-none ring-emerald-500/40 focus:ring"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Se ajusta automáticamente según el tipo de servicio, pero puedes
          editarlo si tu modelo lo permite.
        </p>
      </div>

      {/* Notas */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Notas adicionales
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="rounded-xl border border-gray-300 bg-white/80 dark:bg-white/5 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 outline-none ring-emerald-500/40 focus:ring"
          placeholder="Ej: Es tímido con otros perros, lleva arnés propio, etc."
        />
      </div>
    </div>
  );
}

// ============================================================
// 💳 Subcomponente: Botón PayPal integrado con backend
// ============================================================
function PayPalCheckout({
  cart,
  serviceType,
  dateTime,
  durationMins,
  priceUSD,
  notes,
  onSuccess,
  onError,
}) {
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const isReadyToPay =
    cart.length > 0 && dateTime && durationMins > 0 && priceUSD > 0;

  if (!PAYPAL_CLIENT_ID) {
    return (
      <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
        Falta configurar{" "}
        <code className="bg-red-100 px-1 rounded text-xs">
          VITE_PAYPAL_CLIENT_ID
        </code>{" "}
        en el frontend.
      </div>
    );
  }

  // 1) createOrder: llama al backend para crear la orden PayPal
  const handleCreateOrder = async () => {
    try {
      setIsCreatingOrder(true);

      const { data } = await apiClient.post(
        "/checkout/create-order",
        {
          cart,
          description: `Reserva de paseo - ${serviceType}`,
        }
      );

      if (!data || !data.id) {
        throw new Error("No se pudo crear la orden de pago.");
      }

      return data.id; // orderId que usará PayPal JS SDK
    } catch (error) {
      console.error("Error en create-order:", error);
      onError(
        error.message ||
          "Ocurrió un error al crear la orden de pago. Intenta nuevamente."
      );
      throw error;
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // 2) onApprove: captura orden + crea Booking
  const handleApprove = async (data, actions) => {
    try {
      setIsCapturing(true);

      const bookingDateISO = new Date(dateTime).toISOString();

      const { data: result } = await apiClient.post(
        "/checkout/capture-order",
        {
          orderId: data.orderID,
          serviceType,
          date: bookingDateISO,
          durationMins,
          priceUSD,
          notes,
        }
      );

      onSuccess(result); // booking + paypal
    } catch (error) {
      console.error("Error en capture-order:", error);
      onError(
        error.message ||
          "Ocurrió un error al capturar el pago o crear la reserva."
      );
      throw error;
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {!isReadyToPay && (
        <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-2 mb-2">
          Para habilitar el pago, asegúrate de:
          <ul className="list-disc list-inside">
            <li>Tener al menos un servicio en el carrito.</li>
            <li>Seleccionar fecha y hora válidas.</li>
          </ul>
        </div>
      )}

      <PayPalScriptProvider
        options={{
          "client-id": PAYPAL_CLIENT_ID,
          currency: PAYPAL_CURRENCY,
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          disabled={!isReadyToPay || isCreatingOrder || isCapturing}
          createOrder={handleCreateOrder}
          onApprove={handleApprove}
          onError={(err) => {
            console.error("PayPal onError:", err);
            onError(
              "Ocurrió un error en PayPal al procesar el pago. Intenta nuevamente."
            );
          }}
          onCancel={() =>
            onError("El pago fue cancelado desde la ventana de PayPal.")
          }
        />
      </PayPalScriptProvider>

      {(isCreatingOrder || isCapturing) && (
        <p className="text-xs text-gray-500">
          Procesando tu pago, por favor espera...
        </p>
      )}
    </div>
  );
}

// ============================================================
// 🧾 Componente principal: Checkout
// ============================================================
export default function Checkout() {
  const navigate = useNavigate();

  // Carrito (mismo esquema y localStorage que tenías antes)
  const [cart, setCart] = useState([]);

  // Formulario de reserva
  const [serviceType, setServiceType] = useState("paseo-30");
  const [dateTime, setDateTime] = useState("");
  const [durationMins, setDurationMins] = useState(30);
  const [notes, setNotes] = useState("");

  // Mensajes tipo Toast
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");

  // Reserva creada (para mostrar resumen)
  const [createdBooking, setCreatedBooking] = useState(null);

  const { totalClp, priceUSD } = useTotals(cart);

  // Cargar carrito desde localStorage (misma clave: "cart")
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      } catch {
        // Si falla, dejamos carrito vacío
        setCart([]);
      }
    }
  }, []);

  // Helpers para Toast
  const showToast = (msg, kind = "info", timeout = 3000) => {
    setType(kind);
    setMessage(msg);
    if (timeout) {
      setTimeout(() => setMessage(""), timeout);
    }
  };

  const handleSuccess = (result) => {
    setCreatedBooking(result.booking || null);
    showToast(
      "Tu pago fue procesado correctamente y tu reserva ha sido creada.",
      "success",
      4000
    );
    // Limpiamos carrito
    localStorage.removeItem("cart");
    setCart([]);
  };

  const handleError = (msg) => {
    showToast(
      msg || "Ocurrió un error al procesar el pago.",
      "error",
      4000
    );
  };

  // Total anterior (para UI)
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <section className="min-h-screen flex flex-col items-center py-16 px-6 bg-gradient-to-b from-transparent to-white/5 dark:to-black/20 transition-colors">
      <ToastAlert message={message} type={type} />

      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Finalizar compra 💳
      </h1>

      {cart.length === 0 && !createdBooking ? (
        <div className="text-center text-gray-700 dark:text-gray-300">
          <p className="mb-4">Tu carrito está vacío</p>
          <button
            onClick={() => navigate("/servicios")}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition"
          >
            Ver servicios
          </button>
        </div>
      ) : (
        <div className="max-w-3xl w-full bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Resumen del pedido
          </h2>

          {/* Resumen del carrito (como antes) */}
          <div className="flex flex-col gap-4 mb-6">
            {cart.map((item) => (
              <div
                key={item._id || `${item.name}-${item.price}`}
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3"
              >
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {item.name} ({item.quantity}x)
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {(item.price * item.quantity).toLocaleString("es-CL")} CLP
                </span>
              </div>
            ))}
          </div>

          {/* Total + info en USD estimado */}
          <div className="flex justify-between items-center text-xl font-semibold border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
            <span>Total</span>
            <span className="text-emerald-600 dark:text-emerald-400">
              {total.toLocaleString("es-CL")} CLP
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Referencia en USD (estimado):{" "}
            <span className="font-semibold">
              {priceUSD.toFixed(2)} {PAYPAL_CURRENCY}
            </span>
            . El monto exacto se calcula en el servidor según el tipo de cambio
            configurado.
          </p>

          {/* Formulario de datos de reserva */}
          <BookingForm
            serviceType={serviceType}
            setServiceType={setServiceType}
            dateTime={dateTime}
            setDateTime={setDateTime}
            durationMins={durationMins}
            setDurationMins={setDurationMins}
            notes={notes}
            setNotes={setNotes}
          />

          {/* Zona de pago con PayPal */}
          <div className="mt-4">
            <PayPalCheckout
              cart={cart}
              serviceType={serviceType}
              dateTime={dateTime}
              durationMins={durationMins}
              priceUSD={priceUSD}
              notes={notes}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>

          {/* Si ya se creó una reserva, mostramos resumen */}
          {createdBooking && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/80 dark:bg-emerald-900/20 p-4 text-sm text-gray-800 dark:text-gray-100">
              <h3 className="font-semibold mb-2">
                Detalles de tu reserva ✅
              </h3>
              <p>
                <span className="font-medium">Servicio:</span>{" "}
                {createdBooking.serviceType}
              </p>
              <p>
                <span className="font-medium">Fecha:</span>{" "}
                {new Date(createdBooking.date).toLocaleString("es-CL")}
              </p>
              <p>
                <span className="font-medium">Duración:</span>{" "}
                {createdBooking.durationMins} minutos
              </p>
              <p>
                <span className="font-medium">Precio (USD):</span>{" "}
                {createdBooking.priceUSD?.toFixed?.(2) ??
                  createdBooking.priceUSD}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
