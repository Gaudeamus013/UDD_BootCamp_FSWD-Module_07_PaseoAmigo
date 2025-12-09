// ============================================================
// 📅 bookingModel.js — Modelo de reservas (Bookings)
// ============================================================
// - Registra las reservas de Paseo Amigo asociadas a un usuario
// - Guarda tipo de servicio, fecha, duración, precio y pago PayPal
// - Evita reservas duplicadas mediante índice único
// ============================================================

import mongoose from "mongoose";

const { Schema } = mongoose;

// ------------------------------------------------------------
// 💳 Sub-esquema de pago (payment)
// ------------------------------------------------------------
// Se almacena como subdocumento embebido dentro de Booking.
// No requiere _id propio porque no vamos a tratar pagos como
// documentos independientes.
// ------------------------------------------------------------
const paymentSchema = new Schema(
  {
    provider: {
      type: String,
      default: "paypal", // Por ahora solo PayPal, futuro: otros providers
      trim: true,
    },
    orderId: {
      type: String,
      trim: true, // Evita espacios accidentales
    },
    captureId: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["CREATED", "APPROVED", "COMPLETED", "VOIDED", "FAILED"],
      default: "CREATED",
      // IMPORTANTE: este status debe ser coherente con los valores que
      // PayPal devuelve y los que usamos en el controlador.
    },
  },
  { _id: false } // No generamos _id para este subdocumento
);

// ------------------------------------------------------------
// 🧾 Esquema principal de Booking
// ------------------------------------------------------------
const bookingSchema = new Schema(
  {
    // Usuario dueño de la reserva (relación con colección User)
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "La reserva debe estar asociada a un usuario."],
      index: true, // Consultas frecuentes por usuario
    },

    // Tipo de servicio contratado
    serviceType: {
      type: String,
      enum: ["paseo-30", "paseo-60", "full"],
      required: [true, "Debe especificarse el tipo de servicio."],
      // Nota: asegúrate que el frontend envíe exactamente estos strings.
    },

    // Fecha/hora de la reserva
    date: {
      type: Date,
      required: [true, "La fecha de la reserva es obligatoria."],
    },

    // Duración del servicio en minutos
    durationMins: {
      type: Number,
      required: [true, "La duración en minutos es obligatoria."],
      min: [1, "La duración mínima debe ser mayor a 0 minutos."],
    },

    // Precio cobrado al cliente en USD (post conversión CLP→USD)
    priceUSD: {
      type: Number,
      required: [true, "El precio en USD es obligatorio."],
      min: [0, "El precio no puede ser negativo."],
    },

    // Información de pago (PayPal u otro futuro proveedor)
    payment: paymentSchema,

    // Notas opcionales del cliente
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Las notas no pueden exceder los 500 caracteres."],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ------------------------------------------------------------
// 🔍 Índices para mejorar el rendimiento de consultas
// ------------------------------------------------------------

// Listar reservas de un usuario ordenadas por fecha descendente
bookingSchema.index({ user: 1, date: -1 });

// Listar reservas por fecha (ej. calendario global, próximos paseos)
bookingSchema.index({ date: -1 });

// ------------------------------------------------------------
// 🚫 Índice ÚNICO para evitar reservas duplicadas
// ------------------------------------------------------------
// Evita que se creen dos reservas con la misma combinación de:
// - usuario
// - fecha
// - tipo de servicio
// - duración
//
// Útil si el frontend o PayPal reintentan un pago o se produce una
// llamada duplicada al endpoint.
//
// Si se intenta insertar una reserva idéntica, Mongo/Mongoose lanzarán
// un error E11000 (duplicate key).
// ------------------------------------------------------------
bookingSchema.index(
  { user: 1, date: 1, serviceType: 1, durationMins: 1 },
  { unique: true }
);

// ------------------------------------------------------------
// ✅ Modelo Booking
// ------------------------------------------------------------
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
