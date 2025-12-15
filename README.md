![Logo](https://github.com/Gaudeamus013/UDD_BootCamp_FSWD/blob/main/images/banner.png)

# 🐾 Paseo Amigo

Paseo Amigo es una aplicación web **full-stack** orientada a la gestión y contratación de servicios de paseo para mascotas, integrando autenticación de usuarios y un flujo de pago mediante **PayPal**.

El proyecto fue desarrollado con fines **académicos y demostrativos**, aplicando buenas prácticas de desarrollo frontend y backend, con foco en claridad de flujo, separación de responsabilidades y trazabilidad del proceso de pago.

---

## 📌 Estado del Proyecto

- ✅ Funcional a nivel académico  
- ✅ Flujo completo: selección de servicio → checkout → pago → confirmación  
- ✅ Integración PayPal (Sandbox)  
- ✅ Manejo de estados de negocio  
- 🚧 Mejoras futuras: QA E2E, SEO avanzado, CI/CD  

---

## 🧱 Stack Tecnológico

### Frontend
- React + Vite
- React Router
- Context API
- PayPal JS SDK
- SPA con SEO-lite

### Backend
- Node.js
- Express
- MongoDB
- JWT
- PayPal REST API + Webhooks

---

## 🚀 Ejecución del Proyecto

Clonar el repositorio y posicionarse en la carpeta raíz:

```
git clone <url-del-repositorio>
cd UDD_BootCamp_FSWD-Module_07_PaseoAmigo
```

Cada subproyecto cuenta con su propia documentación específica:

- Frontend → `frontend_README.md`
- Backend → `backend_README.md`

---

## 🧪 Modo Evaluación Académica

Este proyecto utiliza servicios externos en modo **Sandbox**, con fines exclusivamente académicos.

Para la revisión del flujo completo:

- El evaluador puede **registrar un usuario nuevo** directamente desde la aplicación.
- El flujo de pago se realiza mediante **PayPal Sandbox**.
- Las instrucciones y credenciales de prueba se encuentran documentadas en el archivo:

`backend_README.md`

---

## 🔎 Orden Sugerido de Revisión

1. Levantar backend y frontend
2. Registrar un usuario
3. Iniciar sesión
4. Seleccionar un servicio
5. Revisar carrito
6. Acceder a checkout
7. Simular pago con PayPal Sandbox
8. Confirmar creación de la reserva

---

## ⚠️ Consideraciones Importantes

- El archivo `.env` **no se incluye** en el repositorio.
- Usar siempre `.env.example` como referencia.
- El proyecto **no está configurado para producción**.

---

## 🎓 Contexto Académico

Proyecto desarrollado como parte del proceso formativo del **Bootcamp Full Stack Web Development**, priorizando la comprensión integral del flujo de una aplicación web moderna.

---

## 👤 Autor

**Reynaldo Javier Añasco Ruiz**  
Desarrollador Web Full-Stack
