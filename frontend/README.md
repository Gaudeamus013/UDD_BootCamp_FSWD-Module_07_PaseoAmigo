# Paseo Amigo – Frontend (React + Vite + Tailwind + PayPal)

Proyecto base del **Frontend** para Paseo Amigo, con integración del **PayPal SDK** vía `@paypal/react-paypal-js` (flujo Create → Approve → Capture vía backend), routing y estilos con Tailwind.

## 🚀 Requisitos previos
- Node.js 18+
- Variables de entorno en un archivo `.env` (ver `.env.example`)

## 📦 Instalación
```bash
npm install
```

## ⚙️ Configuración de entorno
Crea un archivo `.env` en la raíz del proyecto (o `.env.local`) tomando como referencia `.env.example`:

```env
VITE_PAYPAL_CLIENT_ID=TU_CLIENT_ID_DE_PAYPAL
VITE_PAYPAL_CURRENCY=USD
VITE_BACKEND_URL=http://localhost:4000
```

- `VITE_PAYPAL_CLIENT_ID`: Client ID de tu app en PayPal.
- `VITE_PAYPAL_CURRENCY`: Moneda ("USD", "EUR", "CLP", etc.).
- `VITE_BACKEND_URL`: URL del backend que expone los endpoints `/api/paypal/create-order` y `/api/paypal/capture-order`.

## 🧪 Modo desarrollo
```bash
npm run dev
```

## 🏗️ Build de producción
```bash
npm run build
npm run preview
```

## 🧭 Rutas incluidas
- `/` – Landing simple
- `/checkout` – Carrito + botón PayPal
- `/exito` – Página de pago exitoso (muestra orderId)
- `/cancelado` – Pago cancelado

## 🔌 Endpoints esperados en el backend
- `POST {VITE_BACKEND_URL}/api/paypal/create-order`
  - Body (ejemplo): `{ "items": [...], "total": 25.00, "currency": "USD" }`
  - Respuesta: `{ "id": "PAYPAL_ORDER_ID" }`
- `POST {VITE_BACKEND_URL}/api/paypal/capture-order`
  - Body: `{ "orderID": "PAYPAL_ORDER_ID" }`
  - Respuesta: `{ "status": "COMPLETED", ... }`

> Si en el backend capturas antes de aprobar, PayPal responde `ORDER_NOT_APPROVED`.
> El flujo correcto es: **createOrder (backend) → approve (usuario) → capture (backend)**.

## 📝 Notas
- Texto y variables están en español para tu preferencia.
- El diseño es minimal para que puedas personalizar Tailwind con facilidad.
