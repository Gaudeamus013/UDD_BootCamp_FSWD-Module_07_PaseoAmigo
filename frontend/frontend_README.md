# 🐾 Paseo Amigo – Frontend

Frontend SPA desarrollado con **React + Vite**, encargado de la experiencia de usuario y del flujo completo de navegación y pago.

---

## 🧱 Stack Frontend

- React
- Vite
- React Router
- Context API
- PayPal JS SDK
- react-helmet-async (SEO-lite)

---

## 🧭 Flujo de Navegación

```text
/servicios
   ↓
/checkout
   ↓
/payment
   ↓
/payment/success | /payment/cancel
```

---

## 🔐 Autenticación

- El checkout y el pago requieren usuario autenticado.
- Si el usuario no está logeado, se redirige a Login.
- Tras autenticarse correctamente, el usuario vuelve al flujo de compra.

---

## 💳 Integración PayPal

- Componente PayPal único.
- `createOrder` genera la orden con monto dinámico.
- `onApprove` captura el pago y redirige automáticamente.
- Manejo explícito de estados: loading, success, cancel y error.

---

## 🔍 SEO-lite (SPA)

Dado que el proyecto es una SPA sin SSR, se implementa un enfoque SEO-lite:

- Títulos y meta descripciones por ruta.
- OpenGraph y Twitter Cards.
- `robots.txt` y `sitemap.xml`.
- JSON-LD básico.

---

## 🧪 Testing (Preparado)

- Estructura preparada para Playwright E2E.
- Modo de pruebas sin uso de PayPal real (mock).
- Tests orientados a smoke tests del flujo crítico.

---

## ▶️ Ejecutar Frontend

```bash
npm install
npm run dev
```

---

## 📌 Notas

Este frontend prioriza estabilidad y claridad del flujo por sobre optimizaciones prematuras.
