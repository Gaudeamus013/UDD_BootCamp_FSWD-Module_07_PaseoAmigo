
# 🐾 Paseo Amigo – MVP v1.0.1

### 🚀 Proyecto Full Stack – Desarrollado por Reynaldo Javier Añasco Ruiz  
**Bootcamp UDD – Módulo 07 | Fullstack Developer (Node.js + React + MongoDB)**

---

## 📋 Descripción General

**Paseo Amigo** es un MVP funcional de una plataforma web para la gestión de paseos de mascotas, que combina **frontend moderno con React y TailwindCSS**, un **backend Node.js/Express desplegado en Render**, y una **pasarela de pago PayPal Sandbox completamente integrada**.

El sistema fue desarrollado como entregable final del Bootcamp Fullstack de la Universidad del Desarrollo, cumpliendo con los siguientes objetivos técnicos:

- 🔐 Backend RESTful con autenticación JWT y conexión a MongoDB Atlas.  
- 💳 Integración de pago real en entorno sandbox mediante PayPal SDK.  
- ⚙️ Despliegue doble en Render (backend) y Vercel (frontend).  
- 🎨 UI/UX profesional basada en el enfoque **Emergent UI** (estilo visual fluido, sin IA).  
- 🌙 Implementación de modo claro/oscuro con transiciones suaves y microinteracciones.  
- 📦 Configuración modular y documentación profesional (comentarios, estructura limpia).  

---

## 🧱 Arquitectura del Proyecto

```
📦 UDD_BootCamp_FSWD-Module_07_PaseoAmigo/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── checkoutRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── server.js
│   ├── package.json
│   └── .env (Render)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── experience/ExperienceSection.jsx
│   │   │   └── ui/ThemeSwitch.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   ├── Servicios.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Exito.jsx
│   │   │   └── Cancelado.jsx
│   │   ├── hooks/
│   │   │   └── useScrollHeader.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── App.jsx
│   ├── public/
│   │   └── assets/img/...
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── .env.local (Vercel)
│
├── README.md
└── .gitignore
```

---

## 🌍 Despliegue

| Entorno | Plataforma | URL |
|----------|-------------|-----|
| **Frontend (Vite + React)** | Vercel | [https://paseoamigo.vercel.app](https://paseoamigo.vercel.app) |
| **Backend (Node + Express)** | Render | [https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com](https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com) |

---

## ⚙️ Variables de Entorno

### 🔹 Frontend (.env.local / .env.production)
```env
VITE_API_BASE_URL=https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com
VITE_PAYPAL_CLIENT_ID=ATGKBCavyZ4jFORLIDm1pESsJR-LaQfRuOovuGDo8r_VCw-6CtU05nPzcefXjT6PQLGnTSnPLcF4udgJ
VITE_PAYPAL_CURRENCY=USD
VITE_CLOUDINARY_CLOUD_NAME=dmnxyqxcz
VITE_CLOUDINARY_UPLOAD_PRESET=default
```

### 🔹 Backend (.env en Render)
```env
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://paseoamigo.vercel.app,https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com

MONGO_URI=mongodb+srv://paseoamigo_user:<PASSWORD>@clusterpaseoamigo.za3zom.mongodb.net/

JWT_SECRET=SuperSecretPaseoAmigo2025
REFRESH_TOKEN_SECRET=SuperRefreshTokenPaseoAmigo2025

PAYMENT_PROVIDER=paypal
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=ATGKBCavyZ4jFORLIDm1pESsJR-LaQfRuOovuGDo8r_VCw-6CtU05nPzcefXjT6PQLGnTSnPLcF4udgJ
PAYPAL_CLIENT_SECRET=EEUBKfGSidJejoQXFK5_v9xp3WFdWXcNMC1T43q_EEj-gUjmyfvnfziMgnmTUIS2jTTT8QzDDlp4g3vI
PAYPAL_CURRENCY=USD
```

---

## 💳 Integración PayPal (Sandbox)

### Flujo
1. El usuario selecciona servicio → pasa al **Carrito** → Checkout.
2. El botón de PayPal (SDK v2 React) abre el popup sandbox.
3. Tras completar el pago, la app redirige automáticamente:
   - `/exito?orderId=<ID>` si el pago fue **completado**.
   - `/cancelado` si el usuario canceló.
4. El backend maneja la creación y captura de órdenes vía SDK oficial de PayPal.

### Endpoints Backend
| Método | Ruta | Descripción |
|---------|------|-------------|
| `POST` | `/api/checkout/paypal/create-order` | Crea la orden y devuelve el ID |
| `POST` | `/api/checkout/paypal/capture-order/:orderID` | Captura la orden aprobada |

---

## 🧩 Stack Tecnológico

| Área | Tecnología |
|------|-------------|
| **Frontend** | React 18, Vite, TailwindCSS, Framer Motion, Embla Carousel |
| **Backend** | Node.js, Express, MongoDB Atlas, dotenv, morgan, cors |
| **Autenticación** | JWT + Refresh Tokens |
| **Pasarela de pago** | PayPal Checkout SDK (Sandbox) |
| **Despliegue** | Vercel (frontend) + Render (backend) |
| **Documentación API** | Swagger / OpenAPI (pendiente en producción) |

---

## 🎨 UI/UX – Diseño Emergent UI

La interfaz de **Paseo Amigo** sigue el enfoque **Emergent UI**, un estilo visual moderno basado en:

- Transiciones fluidas (Framer Motion).
- Uso de sombras suaves, bordes redondeados y microinteracciones.
- Adaptabilidad visual (modo claro/oscuro automático).
- Diseño emocional con íconos, emojis y tonos cálidos.  

🟢 *No se integra ningún motor de IA. “Emergent UI” es puramente un término de estilo visual.*

---

## 🧠 Hooks personalizados

| Hook | Función |
|------|----------|
| `useScrollHeader` | Cambia el estilo del header al hacer scroll. |
| `useLocalStorage` *(en versiones anteriores)* | Sincroniza estado con `localStorage`. |

---

## 🔐 Seguridad y buenas prácticas

- Variables sensibles gestionadas vía `.env` (no commitadas).  
- CORS configurado dinámicamente según entorno.  
- Helmet y Rate Limiting preparados para entorno productivo.  
- Validación de tokens y manejo de errores globales (`errorMiddleware.js`).

---

## 🧭 Rutas principales del Frontend

| Ruta | Descripción |
|------|--------------|
| `/` | Landing page (servicios, misión, testimonios). |
| `/servicios` | Descripción de planes Light, Full y Especial. |
| `/gallery` | Galería dinámica Cloudinary. |
| `/cart` | Carrito de compras. |
| `/checkout` | Pasarela de pago (PayPal Sandbox). |
| `/exito` | Confirmación de pago exitoso. |
| `/cancelado` | Pago cancelado o fallido. |

---

## 🧾 Scripts útiles

### 🔹 En desarrollo local
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

### 🔹 En producción
```bash
# Build frontend
cd frontend
npm run build
```

---

## 🧩 Versionado y ramas

| Versión | Rama | Descripción |
|----------|-------|-------------|
| `v0.4` | `main` | Primera versión estable con landing funcional. |
| `v1.0.0` | `ui-official` | Versión base MVP completa (UI + lógica PayPal). |
| `v1.0.1` | `main` | MVP final ajustado, integración PayPal validada y sincronizada entre Render/Vercel. |

---

## 🧭 Próximos pasos (Fase 2) | Post - Entrega

- Implementar autenticación de usuario y registro de cliente.  
- Ampliar catálogo de servicios dinámicos.  
- Añadir almacenamiento de órdenes y usuarios en MongoDB.  
- Implementar dashboard administrativo y facturación.  
- Integrar métricas y panel de seguimiento de paseos (GPS, mapas).

---

## 👨‍💻 Autor

**Reynaldo Javier Añasco Ruiz**  
- Ingeniero Civil Informático – MBA  
- Fullstack Developer (Bootcamp UDD)  
- Profesional Regional RM – Subsecretaría de Educación Parvularia  
📧 [reynaldo.anasco@gmail.com](mailto:reynaldo.anasco@gmail.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/reynaldo-anasco/)  

---

## 🏁 Licencia

Proyecto de uso académico bajo licencia MIT.  
Desarrollado con fines educativos y demostrativos dentro del Bootcamp UDD.

---

**© 2025 Paseo Amigo – Todos los derechos reservados.**
