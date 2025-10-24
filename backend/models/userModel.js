// ============================================================
// 👤 MODELO DE USUARIO - Paseo Amigo v3.0
// ============================================================
// Define la estructura de los documentos de usuario en MongoDB.
// ============================================================

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio."],
      unique: true,
      lowercase: true,
      match: [/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, "Formato de correo inválido."],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria."],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres."],
      select: false, // evita devolverla en consultas
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);

const User = mongoose.model("User", userSchema);
export default User;
