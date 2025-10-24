import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([
    // Ítems de ejemplo: servicios de paseo
    { id: "walk-30", name: "Paseo 30 minutos", qty: 1, price: 12.00 },
    { id: "walk-50", name: "Paseo 50 minutos", qty: 1, price: 18.00 },
  ]);

  const total = useMemo(() => items.reduce((acc, it) => acc + it.price * it.qty, 0), [items]);

  const value = useMemo(() => ({
    items, setItems, total
  }), [items, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
