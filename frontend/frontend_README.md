![Logo](https://github.com/Gaudeamus013/UDD_BootCamp_FSWD/blob/main/images/banner.png)

# 🐾 Paseo Amigo – Frontend

Aplicación **SPA** desarrollada con **React + Vite**, responsable de la experiencia de usuario y del flujo completo de navegación y pago del proyecto Paseo Amigo.

Este frontend consume la API del backend y se comunica con PayPal mediante el SDK oficial en modo **Sandbox**.

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

/servicios  
→ /checkout  
→ /payment  
→ /payment/success | /payment/cancel

---

## 🔐 Autenticación

- El flujo de **checkout y pago** está protegido.
- Si el usuario no está autenticado, se redirige a la vista de login.
- Tras iniciar sesión correctamente, el usuario vuelve al flujo de compra.

---

## 💳 Flujo de Pago

- Integración con **PayPal Sandbox**.
- Componente PayPal único (sin carga duplicada del SDK).
- Estados controlados:
  - loading
  - success
  - cancel
  - error
- Redirecciones automáticas post-pago.

---

## 🔍 SEO-lite (SPA)

Dado que el proyecto es una SPA sin SSR, se implementa una estrategia SEO-lite:

- Títulos dinámicos por ruta.
- Meta descripciones.
- OpenGraph y Twitter Cards.
- robots.txt y sitemap.xml.
- JSON-LD básico.

---

## 🧪 Modo Evaluación

- El evaluador puede **registrar un usuario nuevo** directamente desde la interfaz.
- El pago se simula mediante **PayPal Sandbox**.
- Las credenciales de prueba y detalles del sandbox se documentan en:

`backend_README.md`

---

## ▶️ Ejecutar Frontend

```bash
npm install
npm run dev
```

---

## 📌 Notas

Este frontend prioriza estabilidad, claridad del flujo y separación de responsabilidades por sobre optimizaciones prematuras.
