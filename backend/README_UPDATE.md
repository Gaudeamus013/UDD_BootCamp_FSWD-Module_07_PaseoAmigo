# Paseo Amigo — Actualización Backend (JWT + Refresh + PayPal)

Cambios incluidos:
- JWT dual (Access + Refresh) con cookie HttpOnly.
- Captura PayPal server-to-server y creación de reservas.
- Seguridad: helmet, rate-limit, cookie-parser, CORS con credenciales.
- Rutas: /api/auth/* y /api/bookings/*.
- dotenv-safe con .env.example.

Variables nuevas:
- JWT_ACCESS_SECRET / JWT_REFRESH_SECRET
- JWT_ACCESS_EXPIRES / JWT_REFRESH_EXPIRES
- COOKIE_NAME / COOKIE_SECURE / COOKIE_SAMESITE / COOKIE_DOMAIN
- PAYPAL_API
- RATE_LIMIT_MAX
