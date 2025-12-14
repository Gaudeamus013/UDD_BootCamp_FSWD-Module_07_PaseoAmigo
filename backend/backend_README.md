# 🐾 Paseo Amigo – Backend

Backend encargado de la lógica de negocio, autenticación y confirmación de pagos.

---

## 🧱 Stack Backend

- Node.js
- Express
- MongoDB
- JWT
- PayPal REST API
- Webhooks PayPal

---

## 🔐 Variables de Entorno

Crear un archivo `.env` basado en `.env.example`.

Variables principales:
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`

⚠️ **Nunca subir el archivo `.env` al repositorio.**

---

## 💳 Flujo de Pago

1. Frontend crea una orden PayPal.
2. Usuario aprueba el pago.
3. Frontend captura el pago.
4. Backend persiste la transacción.
5. Webhook PayPal confirma el evento.
6. Backend actualiza el estado final.

---

## 🔁 Estados de Negocio

- `PENDING`
- `PAID`
- `FAILED`
- `CANCELED`

Estos estados permiten trazabilidad e idempotencia.

---

## 🔔 Webhook PayPal / PROXIMAMENTE

Endpoint:
```http
POST /api/webhooks/paypal
```

Eventos manejados:
- `PAYMENT.CAPTURE.COMPLETED`
- `CHECKOUT.ORDER.APPROVED`

---

## ▶️ Ejecutar Backend

```bash
npm install
npm run dev
```

---

## 📝 Notas

- El backend utiliza PayPal Sandbox.
- Preparado para validación de firma de webhook en producción.
