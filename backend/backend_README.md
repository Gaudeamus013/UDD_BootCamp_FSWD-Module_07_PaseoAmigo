![Logo](https://github.com/Gaudeamus013/UDD_BootCamp_FSWD/blob/main/images/banner.png)

# 🐾 Paseo Amigo – Backend

API REST desarrollada con **Node.js y Express**, responsable de la lógica de negocio, autenticación y confirmación de pagos del proyecto Paseo Amigo.

El backend se integra con **PayPal Sandbox** para simular pagos en un entorno controlado con fines académicos.

---

## 🧱 Stack Backend

- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens)
- PayPal REST API
- Webhooks PayPal

---

## 🔐 Variables de Entorno

Crear un archivo `.env` a partir de `.env.example`.

Variables principales:

- PORT
- MONGO_URI
- JWT_SECRET
- PAYPAL_CLIENT_ID
- PAYPAL_CLIENT_SECRET
- PAYPAL_WEBHOOK_ID

⚠️ **Nunca subir el archivo `.env` al repositorio.**

---

## 💳 Flujo de Pago

1. El frontend solicita la creación de una orden PayPal.
2. El usuario aprueba el pago en PayPal.
3. El frontend captura la orden.
4. El backend persiste la transacción.
5. PayPal notifica el evento mediante Webhook.
6. El backend actualiza el estado final de la reserva.

---

## 🔁 Estados de Negocio

Las transacciones manejan los siguientes estados:

- PENDING
- PAID
- FAILED
- CANCELED

Esto permite trazabilidad e idempotencia.

---

## 🧪 Modo Evaluación – PayPal Sandbox

Este proyecto utiliza **PayPal Sandbox** exclusivamente con fines académicos.

Para simular un pago durante la evaluación se puede utilizar la siguiente cuenta de comprador Sandbox:

- **Email:** rfierro@prueba.com
- **Tipo:** Cuenta ficticia PayPal Sandbox (buyer)

> 🔐 La contraseña corresponde a la configurada en el entorno PayPal Developer.  
> El evaluador puede usar sus propias credenciales Sandbox o modificar la contraseña
> directamente desde el dashboard de PayPal Developer.

⚠️ Esta cuenta no corresponde a un usuario real de PayPal.

---

## 🔔 Webhook PayPal

Endpoint configurado:

POST /api/webhooks/paypal

Eventos manejados:

- PAYMENT.CAPTURE.COMPLETED
- CHECKOUT.ORDER.APPROVED

---

## ▶️ Ejecutar Backend

```bash
npm install
npm run dev
```

---

## 📌 Notas

- El backend está configurado para **PayPal Sandbox**.
- La validación de firma del webhook está preparada para un entorno productivo.
- Este backend no debe usarse en producción sin endurecer medidas de seguridad.
