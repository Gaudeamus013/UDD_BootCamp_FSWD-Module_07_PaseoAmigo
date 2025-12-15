![Logo](https://github.com/Gaudeamus013/UDD_BootCamp_FSWD/blob/main/images/banner.png)

# 🐾 Paseo Amigo – Backend

API REST desarrollada con **Node.js y Express**, responsable de la lógica de negocio, autenticación de usuarios y gestión del flujo de pago del proyecto Paseo Amigo.

El backend se integra con **PayPal Sandbox** para simular pagos en un entorno controlado con fines académicos.

---

## 🧱 Stack Backend

- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens)
- PayPal REST API
- Webhooks PayPal *(planificado)*

---

## 🔐 Variables de Entorno

Crear un archivo `.env` a partir de `.env.example`.

Variables principales:

- PORT
- MONGO_URI
- JWT_SECRET
- PAYPAL_CLIENT_ID
- PAYPAL_CLIENT_SECRET
- PAYPAL_WEBHOOK_ID *(uso futuro)*

⚠️ **Nunca subir el archivo `.env` al repositorio.**

---

## 💳 Flujo de Pago (Implementado)

Actualmente, el flujo de pago funciona de la siguiente manera:

1. El frontend solicita al backend la creación de una orden PayPal.
2. El usuario aprueba el pago en PayPal.
3. El frontend captura la orden.
4. El backend valida la captura y persiste la transacción.
5. El backend crea la reserva asociada al usuario.

> 📌 La confirmación del pago se realiza **vía captura desde el frontend**.
> El uso de Webhooks PayPal queda planificado como mejora futura.

---

## 🔁 Estados de Negocio

Las transacciones manejan los siguientes estados:

- PENDING
- PAID
- FAILED
- CANCELED

Estos estados permiten trazabilidad y un manejo claro del ciclo de vida del pago.

---

## 🧪 Modo Evaluación – PayPal Sandbox

Este proyecto utiliza **PayPal Sandbox** exclusivamente con fines académicos.

Para simular un pago durante la evaluación se puede utilizar la siguiente cuenta de comprador Sandbox:

- **Email:** rfierro@prueba.com
- **Contraseña:** a1b2C3D4
- **Tipo:** Cuenta ficticia PayPal Sandbox (buyer)

⚠️ Esta cuenta **no corresponde a un usuario real de PayPal** y solo existe en el entorno Sandbox.

---

## 🔔 Webhook PayPal (Planificado / Próximamente)

Como mejora futura, se contempla la implementación de Webhooks PayPal para robustecer el flujo de pagos.

### Endpoint previsto

POST /api/webhooks/paypal

### Eventos a manejar

- PAYMENT.CAPTURE.COMPLETED
- CHECKOUT.ORDER.APPROVED

### Objetivo

- Confirmar pagos desde backend sin depender del frontend.
- Mejorar seguridad e idempotencia.
- Alinear el proyecto a un estándar productivo.

> 🚧 **Estado actual:** No implementado.  
> 🚀 **Estado futuro:** Implementación prevista como mejora post-evaluación.

---

## ▶️ Ejecutar Backend

```bash
npm install
npm run dev
```

---

## 📌 Notas

- El backend está configurado exclusivamente para **PayPal Sandbox**.
- La validación de firma de Webhooks está contemplada para una fase futura.
- Este backend **no debe usarse en producción** sin endurecer medidas de seguridad.
