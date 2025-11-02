
// ============================================================
// 🐾 Paseo Amigo – RegisterPage_FINAL.jsx
// ============================================================
// • Registro seguro con validación avanzada de contraseñas
// • Campo de repetir contraseña
// • Ícono de “ojo” para mostrar/ocultar contraseña
// • Integración con UserContext + ToastAlert
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import { motion } from "framer-motion";
import ToastAlert from "../../components/ui/ToastAlert.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // ============================================================
  // Validar fortaleza de contraseña
  // ============================================================
  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setToastMessage("Por favor completa todos los campos.");
      setTimeout(() => setToastMessage(""), 3000);
      return;
    }

    if (password !== confirmPassword) {
      setToastMessage("Las contraseñas no coinciden.");
      setTimeout(() => setToastMessage(""), 3000);
      return;
    }

    if (!validatePassword(password)) {
      setToastMessage(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo."
      );
      setTimeout(() => setToastMessage(""), 5000);
      return;
    }

    const result = await register(name, email, password);

    if (result.success) {
      setToastMessage("Cuenta creada exitosamente 🎉");
      setTimeout(() => navigate("/servicios"), 1500);
    } else {
      setToastMessage(result.message);
    }

    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark transition-colors duration-500 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-light dark:text-primary-dark">
          Crear cuenta Paseo Amigo 🐾
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block mb-1 text-sm font-medium">Nombre completo</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Correo electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Contraseña */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-primary-light dark:hover:text-primary-dark"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirmar Contraseña */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium">Repetir contraseña</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-primary-light dark:hover:text-primary-dark"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-primary-light dark:bg-primary-dark text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200"
          >
            Crear cuenta
          </button>

          <p className="text-sm text-center mt-3">
            ¿Ya tienes una cuenta?{" "}
            <span
              className="text-primary-light dark:text-primary-dark cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Inicia sesión
            </span>
          </p>
        </form>
      </motion.div>

      <ToastAlert message={toastMessage} />
    </div>
  );
}
