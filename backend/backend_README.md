# 🐾 Paseo Amigo – Backend (Express + MongoDB + PayPal SDK)

## 🧭 Descripción general
Este directorio contiene el **backend del proyecto Paseo Amigo**, implementado con **Node.js + Express**, **MongoDB Atlas**, y **PayPal SDK v2**.  
Su propósito es ofrecer los servicios API necesarios para la gestión de usuarios, productos y pagos, conectando el frontend desplegado en **Vercel**.

---

## 🚀 Tecnologías principales
- **Node.js + Express** → API REST modular.
- **MongoDB + Mongoose** → Base de datos en la nube (MongoDB Atlas).
- **PayPal Checkout SDK** → Integración oficial para órdenes y capturas.
- **dotenv / dotenv-safe** → Manejo de variables de entorno.
- **helmet + cors + morgan** → Seguridad, CORS dinámico y logging.
- **Render.com** → Entorno de despliegue en producción.

---

## 📂 Estructura de carpetas
```bash
backend/
├── config/
│   ├── db.js                   # Conexión a MongoDB Atlas
│   ├── paypal.js               # Configuración de cliente PayPal
├── controllers/
│   ├── authController.js       # Autenticación y registro
│   ├── productController.js    # Gestión de productos
│   └── checkoutController.js   # Lógica de órdenes (si se usa modular)
├── middleware/
│   ├── errorMiddleware.js      # Manejo global de errores
│   ├── authMiddleware.js       # Verificación de tokens JWT
├── models/
│   ├── User.js                 # Modelo de usuario
│   ├── Product.js              # Modelo de producto
│   └── Order.js                # Modelo de orden PayPal
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── checkoutRoutes.js       # Endpoints /paypal/
│   └── userRoutes.js
├── server.js                   # Punto de entrada principal
└── .env                        # Variables de entorno
```

---

## ⚙️ Configuración local

### 1️⃣ Instalar dependencias
```bash
cd backend
npm install
```

### 2️⃣ Variables de entorno
Archivo `.env` de ejemplo:

```bash
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173,https://paseoamigo.vercel.app

MONGO_URI=mongodb+srv://paseoamigo_user:<password>@clusterpaseoamigo.mongodb.net/

JWT_SECRET=SuperSecretPaseoAmigo2025
REFRESH_TOKEN_SECRET=SuperRefreshTokenPaseoAmigo2025

PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=ATGKBCavyZ4jFORLIDm1pESsJR-LaQfRuOovuGDo8r_VCw-6CtU05nPzcefXjT6PQLGnTSnPLcF4udgJ
PAYPAL_CLIENT_SECRET=EEUBKfGSidJejoQXFK5_v9xp3WFdWXcNMC1T43q_EEj-gUjmyfvnfziMgnmTUIS2jTTT8QzDDlp4g3vI
PAYPAL_CURRENCY=USD
```

---

## 🧩 Endpoints principales

### 🔐 Autenticación
| Método | Ruta | Descripción |
|--------|------|--------------|
| POST | `/api/auth/register` | Crear nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión y obtener JWT |
| GET | `/api/users/profile` | Perfil autenticado (token requerido) |

### 💳 Pagos PayPal
| Método | Ruta | Descripción |
|--------|------|--------------|
| POST | `/api/checkout/paypal/create-order` | Crea una orden en PayPal Sandbox |
| POST | `/api/checkout/paypal/capture-order/:orderID` | Captura una orden existente |

### 🛍️ Productos
| Método | Ruta | Descripción |
|--------|------|--------------|
| GET | `/api/products` | Listar productos |
| POST | `/api/products` | Crear producto (solo admin) |

---

## 🧱 Middleware global
- `errorMiddleware.js` → Manejo estructurado de errores.
- `authMiddleware.js` → Autorización basada en JWT.
- `corsOptions` → Dominios permitidos dinámicamente según entorno (local/producción).

---

## 🌐 Despliegue (Render.com)
Configuración utilizada:

| Variable | Valor |
|-----------|--------|
| `Start Command` | `node server.js` |
| `Build Command` | *(vacío, usa dependencias npm)* |
| `PORT` | `4000` |
| `CORS_ORIGIN` | `http://localhost:5173,https://paseoamigo.vercel.app` |

API en producción:  
🔗 [https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com](https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com)

---

## 🧪 Pruebas básicas
Probar desde terminal o Postman:

```bash
curl -X POST https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com/api/checkout/paypal/create-order
```

Debe responder:
```json
{ "id": "PAYPAL_ORDER_ID" }
```

---

## 🧾 Créditos
Proyecto desarrollado como parte del **Bootcamp Full Stack Developer – Universidad del Desarrollo (Módulo 07)**  
Autor: **Reynaldo Añasco Ruiz**  
Versión: **v1.0.1 (MVP Final – Backend Oficial)**  
