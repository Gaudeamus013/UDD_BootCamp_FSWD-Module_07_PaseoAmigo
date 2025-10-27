# 🐾 Paseo Amigo – Frontend (React + Vite + TailwindCSS)

## 🧭 Descripción general
Este directorio contiene el **frontend** de la aplicación *Paseo Amigo*, desarrollado con **React 18**, **Vite**, **TailwindCSS**, y animaciones con **Framer Motion**.  
El frontend está diseñado para ofrecer una **experiencia moderna, rápida y responsiva**, con integración directa a la API backend desplegada en **Render.com** y pasarela de pago **PayPal Sandbox**.

---

## 🚀 Tecnologías principales
- **React 18 + Vite 5** → estructura modular con recarga rápida.
- **TailwindCSS 3.4+** → estilado con diseño adaptativo.
- **Framer Motion** → animaciones fluidas (transiciones de páginas, feedback visual).
- **Embla Carousel** → secciones con carrusel dinámico (testimonios, galería).
- **PayPal React SDK** → integración completa de pasarela de pago Sandbox.
- **React Router DOM 6** → navegación SPA entre páginas.

---

## 📂 Estructura de carpetas
```bash
frontend/
├── public/                     # Recursos estáticos
├── src/
│   ├── assets/                 # Imágenes, íconos y fuentes
│   ├── components/             # Componentes reutilizables (UI, layouts, etc.)
│   │   ├── ui/                 # Switch, botones, loaders
│   │   ├── navigation/         # Header, Footer, ScrollToTop
│   │   └── experience/         # Sección de testimonios
│   ├── hooks/                  # Hooks personalizados
│   ├── pages/                  # Páginas principales (Landing, Galería, Checkout, etc.)
│   ├── App.jsx                 # Layout global (header + footer)
│   ├── main.jsx                # Configuración del router principal
│   ├── index.css               # Estilos globales y animaciones
│   └── tailwind.config.js      # Configuración extendida de Tailwind
├── package.json
├── vite.config.js
└── .env.local
```

---

## ⚙️ Configuración local

### 1️⃣ Instalar dependencias
```bash
cd frontend
npm install
```

### 2️⃣ Variables de entorno
Crea un archivo `.env.local` con el siguiente contenido:

```bash
VITE_API_BASE_URL=https://udd-bootcamp-fswd-module-07-paseoamigo.onrender.com
VITE_PAYPAL_CLIENT_ID=ATGKBCavyZ4jFORLIDm1pESsJR-LaQfRuOovuGDo8r_VCw-6CtU05nPzcefXjT6PQLGnTSnPLcF4udgJ
VITE_PAYPAL_CURRENCY=USD
VITE_CLOUDINARY_CLOUD_NAME=dmnxyqxcz
VITE_CLOUDINARY_UPLOAD_PRESET=default
```

### 3️⃣ Ejecutar en desarrollo
```bash
npm run dev
```
Abrir en navegador: [http://localhost:5173](http://localhost:5173)

---

## 💳 Integración PayPal (Sandbox)
El flujo de pago se ejecuta en la página `/checkout`, usando el **PayPal React SDK** y endpoints en el backend `/api/checkout/paypal/`.

- **Crear orden:** `POST /api/checkout/paypal/create-order`
- **Capturar orden:** `POST /api/checkout/paypal/capture-order/:orderId`

Credenciales Sandbox utilizadas:
```
Business: sb-te5a433774013@business.example.com
Personal: sb-xalfs33720943@personal.example.com
```

---

## 🌈 Animaciones y diseño
El frontend utiliza una interfaz basada en el concepto *Emergent UI*, con efectos suaves, gradientes dinámicos y compatibilidad con **modo oscuro**.  
Cada componente importante está comentado y optimizado para producción.

---

## 🧪 Scripts útiles
| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Inicia servidor de desarrollo (Vite) |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Vista previa del build local |

---

## 🧱 Despliegue (Vercel)
El frontend está desplegado en **Vercel**.  
Configuración usada:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:** idénticas a `.env.local`

URL de producción:  
🔗 [https://paseoamigo.vercel.app](https://paseoamigo.vercel.app)

---

## 🧾 Créditos
Proyecto desarrollado como parte del **Bootcamp Full Stack Developer – Universidad del Desarrollo (Módulo 07)**  
Autor: **Reynaldo Añasco Ruiz**  
Versión: **v1.0.1 (MVP Final – UI Oficial)**  
