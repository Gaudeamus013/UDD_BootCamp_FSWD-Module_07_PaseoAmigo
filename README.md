![Logo](https://github.com/Gaudeamus013/UDD_BootCamp_FSWD/blob/main/images/banner.png)

# 🐾 Paseo Amigo

Paseo Amigo es una aplicación web **full-stack** orientada a la gestión y contratación de servicios de paseo para mascotas, integrando autenticación de usuarios y un flujo de pago mediante **PayPal**.

El proyecto fue desarrollado con fines **académicos y demostrativos**, priorizando claridad de flujo, separación de responsabilidades y buenas prácticas generales.

---

## 📌 Estado del Proyecto

### ✔️ Implementado

- Autenticación de usuarios (registro y login)
- Flujo completo de compra:
  - Selección de servicio
  - Carrito
  - Checkout
  - Pago con PayPal Sandbox
  - Confirmación de reserva
- Persistencia de transacciones
- Manejo de estados de negocio
- Separación frontend / backend

### 🚧 Planificado (Etapa Posterior)

- Confirmación de pagos vía Webhooks PayPal
- Tests E2E (Playwright)
- CI/CD automático
- SEO avanzado y métricas de rendimiento

---

## 🧱 Stack Tecnológico

### Frontend
- React + Vite
- React Router
- Context API
- PayPal JS SDK

### Backend
- Node.js
- Express
- MongoDB
- JWT
- PayPal REST API

---

## 🚀 Ejecución del Proyecto

```bash
git clone <url-del-repositorio>
cd UDD_BootCamp_FSWD-Module_07_PaseoAmigo
```

Documentación específica:

- Frontend → `frontend_README.md`
- Backend → `backend_README.md`

---

## 🧪 Modo Evaluación Académica

- El evaluador puede registrar un usuario nuevo.
- El pago se realiza mediante **PayPal Sandbox**.
- Las credenciales de prueba se encuentran documentadas en `backend_README.md`.

---

## ⚠️ Consideraciones

- Proyecto configurado solo para fines académicos.
- No apto para uso productivo sin mejoras de seguridad.

---

## 👤 Autor

Reynaldo Javier Añasco Ruiz  
Desarrollador Web Full-Stack
