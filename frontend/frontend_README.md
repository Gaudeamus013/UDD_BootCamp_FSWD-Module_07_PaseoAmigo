![Logo](https://github.com/Gaudeamus013/UDD_BootCamp_FSWD/blob/main/images/banner.png)

# 🐾 Paseo Amigo – Frontend

Aplicación **SPA** desarrollada con React y Vite, encargada de la experiencia de usuario y del flujo de compra.

---

## 📌 Estado del Frontend

### ✔️ Implementado

- Navegación SPA con React Router
- Protección de rutas (checkout / pago)
- Carrito de compras
- Integración PayPal Sandbox
- Manejo de estados UI (loading, success, error)
- Confirmación visual de reserva

### 🚧 Planificado (Etapa Posterior)

- SEO avanzado (beyond SEO-lite)
- Tests E2E (Playwright)
- Mejoras de accesibilidad
- Optimización de performance

---

## 🧱 Stack Frontend

- React
- Vite
- React Router
- Context API
- PayPal JS SDK

---

## 🧭 Flujo de Navegación

/servicios  
→ /checkout  
→ /payment  
→ /payment/success | /payment/cancel

---

## 🧪 Modo Evaluación

- El evaluador puede crear un usuario directamente desde la UI.
- El flujo de pago utiliza PayPal Sandbox.
- Las credenciales se documentan en `backend_README.md`.

---

## ▶️ Ejecutar Frontend

```bash
npm install
npm run dev
```

---

## 📌 Notas

Frontend desarrollado con foco académico, priorizando estabilidad del flujo.
