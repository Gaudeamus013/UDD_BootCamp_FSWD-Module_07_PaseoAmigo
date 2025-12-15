// ============================================================
// 💳 Checkout.jsx — Flujo de pago con PayPal (Defensive Version)
// Paseo Amigo · Integrado con apiClient (JWT + Refresh)
// ============================================================
// - Compatible con PayPalScriptProvider global (main.jsx)
// - NO carga el SDK dos veces
// - Validación defensiva ante datos corruptos
// ============================================================

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { apiClient } from "../lib/apiClient";
import ToastAlert from "../components/ui/ToastAlert.jsx";

// ============================================================
// 🔧 Configuración de entorno
// ============================================================
const PAYPAL_CURRENCY = import.meta.env.VITE_PAYPAL_CURRENCY || "USD";

// ============================================================
// 🧮 Hook: cálculo defensivo de totales CLP y USD
// ============================================================
function useTotals(cart) {
  const totalClp = useMemo(() => {
    if (!Array.isArray(cart)) return 0;

    return cart.reduce((sum, item) => {
      const price = Number(item?.price ?? 0);
      const quantity = Number(item?.quantity ?? 0);

      const safePrice = Number.isFinite(price) ? price : 0;
      const safeQty = Number.isFinite(quantity) ? quantity : 0;

      return sum + safePrice * safeQty;
    }, 0);
  }, [cart]);

  const exchangeRate = 0.0011;

  const priceUSD = useMemo(() => {
    const usd = totalClp * exchangeRate;
    return Number.isFinite(usd) ? Number(usd.toFixed(2)) : 0;
  }, [totalClp]);

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
  notes,
  setNotes,
}) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-gray-200">
          Tipo de servicio
        </label>
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="rounded-xl border border-gray-300 dark:bg-white/5 px-3 py-2"
        >
          <option value="paseo-30">Paseo 30 minutos</option>
          <option value="paseo-60">Paseo 60 minutos</option>
          <option value="full">Paseo full (90 minutos)</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-gray-200">
          Fecha y hora del paseo
        </label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="rounded-xl border border-gray-300 dark:bg-white/5 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-gray-200">
          Duración (minutos)
        </label>
        <input
          type="number"
          value={durationMins}
          readOnly
          className="w-32 rounded-xl border border-gray-300 dark:bg-white/5 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-gray-200">
          Notas adicionales
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="rounded-xl border border-gray-300 dark:bg-white/5 px-3 py-2"
          placeholder="Ej: Es tímido con otros perros, lleva arnés propio, etc."
        />
      </div>
    </div>
  );
}

// ============================================================
// 💳 Subcomponente: PayPal Checkout
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
    Array.isArray(cart) &&
    cart.length > 0 &&
    dateTime &&
    durationMins > 0 &&
    priceUSD > 0;

  const handleCreateOrder = async () => {
    try {
      setIsCreatingOrder(true);

      const { data } = await apiClient.post("/checkout/create-order", {
        cart,
        description: `Reserva de paseo - ${serviceType}`,
      });

      return data.id;
    } catch (error) {
      onError("Error al crear la orden de pago.");
      throw error;
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleApprove = async (data) => {
    try {
      setIsCapturing(true);

      const bookingDateISO = new Date(dateTime).toISOString();

      const { data: result } = await apiClient.post("/checkout/capture-order", {
        orderId: data.orderID,
        serviceType,
        date: bookingDateISO,
        durationMins,
        priceUSD,
        notes,
      });

      onSuccess(result);
    } catch (error) {
      onError("Error al capturar el pago o crear la reserva.");
      throw error;
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">
        Pago seguro con PayPal 💳
      </h3>

      {!isReadyToPay && (
        <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-2 mb-3">
          Debes agregar servicios, fecha y hora antes de pagar.
        </div>
      )}

      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-3">
        <PayPalButtons
          style={{ layout: "vertical" }}
          disabled={!isReadyToPay || isCreatingOrder || isCapturing}
          createOrder={handleCreateOrder}
          onApprove={handleApprove}
          onError={() => onError("Hubo un problema con PayPal.")}
          onCancel={() => onError("El pago fue cancelado.")}
        />

        {(isCreatingOrder || isCapturing) && (
          <p className="mt-2 text-xs text-gray-500">
            Procesando tu pago, por favor espera...
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 🧾 Componente principal: Checkout
// ============================================================
export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [serviceType, setServiceType] = useState("paseo-30");
  const [dateTime, setDateTime] = useState("");
  const [durationMins, setDurationMins] = useState(30);
  const [notes, setNotes] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [createdBooking, setCreatedBooking] = useState(null);

  const { totalClp, priceUSD } = useTotals(cart);

  useEffect(() => {
    if (serviceType === "paseo-30") setDurationMins(30);
    if (serviceType === "paseo-60") setDurationMins(60);
    if (serviceType === "full") setDurationMins(90);
  }, [serviceType]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setCart(parsed);
      } catch {
        setCart([]);
      }
    }
  }, []);

  const showToast = (msg, kind = "info", timeout = 3000) => {
    setMessage(msg);
    setType(kind);
    if (timeout) setTimeout(() => setMessage(""), timeout);
  };

  const handleSuccess = (result) => {
    setCreatedBooking(result.booking);
    localStorage.removeItem("cart");
    setCart([]);
    showToast("Pago exitoso y reserva creada.", "success", 4000);
  };

  const handleError = (msg) => {
    showToast(msg, "error", 4000);
  };

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
          {!createdBooking && (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Resumen del pedido
              </h2>

              <div className="flex flex-col gap-4 mb-6">
                {cart.map((item, idx) => {
                  const price = Number(item?.price ?? 0);
                  const qty = Number(item?.quantity ?? 0);

                  const safePrice = Number.isFinite(price) ? price : 0;
                  const safeQty = Number.isFinite(qty) ? qty : 0;
                  const lineTotal = safePrice * safeQty;

                  return (
                    <div
                      key={item?._id ?? `${item?.name}-${idx}`}
                      className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3"
                    >
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {item?.name ?? "Servicio"} ({safeQty}x)
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {lineTotal.toLocaleString("es-CL")} CLP
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center text-xl font-semibold border-t border-gray-200 dark:border-gray-700 pt-4 mb-2">
                <span>Total</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {totalClp.toLocaleString("es-CL")} CLP
                </span>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Referencia en USD (estimado):{" "}
                <span className="font-semibold">
                  {priceUSD.toFixed(2)} {PAYPAL_CURRENCY}
                </span>
              </p>

              <BookingForm
                serviceType={serviceType}
                setServiceType={setServiceType}
                dateTime={dateTime}
                setDateTime={setDateTime}
                durationMins={durationMins}
                notes={notes}
                setNotes={setNotes}
              />

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
            </>
          )}

          {createdBooking && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 dark:bg-emerald-900/20 p-4 text-sm text-gray-800 dark:text-gray-100">
              <h3 className="font-semibold mb-2">Reserva confirmada ✅</h3>
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

              <button
                onClick={() => navigate("/servicios")}
                className="mt-4 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition"
              >
                Volver a servicios
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
