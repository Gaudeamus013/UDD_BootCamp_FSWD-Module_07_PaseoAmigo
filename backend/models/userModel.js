// ============================================================
// 👤 MODELO DE USUARIO - Paseo Amigo v4.0 (Optimizado)
// ============================================================
// Reglas avanzadas de validación:
// • Correo con formato correcto y manejo de duplicados
// • Contraseña con validación de seguridad (regex robusta)
// • Encriptación automática con bcryptjs
// ============================================================

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ------------------------------------------------------------
// 🧩 Esquema del Usuario
// ------------------------------------------------------------
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
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Formato de correo inválido."],
    },

    password: {
      type: String,
      required: [true, "La contraseña es obligatoria."],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres."],
      validate: {
        validator: function (value) {
          // Debe tener minúscula, mayúscula, número y carácter especial
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?/~]).{8,}$/.test(
            value
          );
        },
        message:
          "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un símbolo especial.",
      },
      select: false, // 🔒 evita devolver la contraseña en consultas
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
  }
);

// ------------------------------------------------------------
// 🔐 Middleware: Encriptar contraseña antes de guardar
// ------------------------------------------------------------
userSchema.pre("save", async function (next) {
  // Si la contraseña no fue modificada, continuar
  if (!this.isModified("password")) return next();

  // Generar salt y encriptar
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ------------------------------------------------------------
// 🔑 Método auxiliar: comparar contraseñas (login)
// ------------------------------------------------------------
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ------------------------------------------------------------
// 🚀 Exportación del modelo
// ------------------------------------------------------------
const User = mongoose.model("User", userSchema);
export default User;
