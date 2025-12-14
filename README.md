# 🐾 Paseo Amigo

Paseo Amigo es una aplicación web **full‑stack** orientada a la gestión y contratación de servicios de paseo para mascotas, integrando autenticación de usuarios y un flujo de pago mediante **PayPal**.

El proyecto fue desarrollado con fines **académicos y demostrativos**, aplicando buenas prácticas de desarrollo frontend y backend, con foco en claridad de flujo, seguridad básica y trazabilidad.

---

## 📌 Estado del Proyecto

✅ Funcional a nivel académico  
✅ Flujo completo: selección de servicio → checkout → pago → confirmación  
✅ Integración PayPal (Sandbox)  
✅ Backend con persistencia y estados de negocio  
🚧 Mejoras futuras: QA E2E, SEO avanzado, refactor controlado

> **Nota:** El proyecto cumple con los requisitos académicos solicitados. Las mejoras planificadas apuntan a elevar el estándar hacia un entorno productivo.

---

## 🧱 Stack Tecnológico

### Frontend
- React + Vite
- React Router
- Context API
- PayPal JS SDK
- SPA con SEO‑lite

### Backend
- Node.js
- Express
- MongoDB
- JWT (autenticación)
- PayPal REST API + Webhooks

---

## 🚀 Cómo ejecutar el proyecto

### Requisitos
- Node.js 18 o superior
- MongoDB local o en la nube
- Cuenta PayPal Developer (Sandbox)

### Instalación general
```bash
git clone <url-del-repositorio>
cd paseo-amigo
```

Cada subproyecto (`frontend` y `backend`) posee su propio archivo README con instrucciones específicas.

---

## 📂 Estructura del Proyecto

```text
/
├── frontend/        # Aplicación React (Vite)
├── backend/         # API REST + lógica de negocio
├── README.md        # Documentación general
```

---

## 📄 Documentación Específica

- 📘 Frontend: `frontend/README.md`
- 📕 Backend: `backend/README.md`

---

## ⚠️ Consideraciones Importantes

- El archivo `.env` **no debe subirse al repositorio**
- Usar siempre `.env.example` como referencia
- El entorno de pago está configurado para **PayPal Sandbox**
- No se recomienda usar este proyecto directamente en producción sin endurecer seguridad

---

## 🎓 Contexto Académico

Este proyecto fue desarrollado como parte de un proceso formativo, priorizando:

- Comprensión del flujo completo de una aplicación web
- Separación clara frontend / backend
- Integración de pagos de forma controlada
- Buenas prácticas por sobre optimización prematura

---

## 📌 Autor

Proyecto desarrollado por **Reynaldo Javier Añasco Ruiz**  
Desarrollador Web Full‑Stack

