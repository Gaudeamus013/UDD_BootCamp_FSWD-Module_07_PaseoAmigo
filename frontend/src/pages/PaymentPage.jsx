// ============================================================
// 💳 PaymentPage.jsx — Alias de Checkout
// Paseo Amigo · Reutiliza la pantalla de Checkout
// ============================================================

import React from "react";
import Checkout from "./Checkout.jsx";

export default function PaymentPage() {
  // Reutilizamos toda la lógica y UI del nuevo Checkout
  return <Checkout />;
}
