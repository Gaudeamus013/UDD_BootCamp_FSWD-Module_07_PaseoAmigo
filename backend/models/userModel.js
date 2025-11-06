// ============================================================
// 👤 MODELO DE USUARIO - Paseo Amigo v5.0 (Roles: admin, paseador, cliente)
// ============================================================
// Validaciones:
// • Correo único y con formato válido
// • Contraseña segura y encriptada con bcryptjs
// • Roles originales conservados: admin, paseador, cliente
// ============================================================

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?/~]).{8,}$/.test(
            value
          );
        },
        message:
          "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un símbolo especial.",
      },
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "paseador", "cliente"],
      default: "cliente",
    },

    phone: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    address: { type: String, default: "" },
    comuna: { type: String, default: "" },
  },
  { timestamps: true }
);

// ------------------------------------------------------------
// 🔐 Middleware: Encriptar contraseña antes de guardar
// ------------------------------------------------------------
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
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
