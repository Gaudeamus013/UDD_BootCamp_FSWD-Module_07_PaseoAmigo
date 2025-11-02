// ============================================================
// 🔐 PÁGINA DE INICIO DE SESIÓN – Paseo Amigo v4.0
// ============================================================
// Características:
// • Validación de credenciales con feedback visual
// • Ícono 👁️ para mostrar/ocultar contraseña
// • Mensajes ToastAlert adaptativos
// • Diseño coherente con RegisterPage_FINAL.jsx
// • Total compatibilidad con modo día/noche
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import ToastAlert from "../../components/ui/ToastAlert.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------------------------------------------------------
  // Manejo de cambios en los campos
  // ------------------------------------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ------------------------------------------------------------
  // Envío del formulario
  // ------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setToastMessage("Por favor, completa ambos campos para continuar.");
      return;
    }

    try {
      setLoading(true);
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setToastMessage(result.message);
        setTimeout(() => navigate("/servicios"), 1500);
      } else {
        setToastMessage(result.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setToastMessage("Ocurrió un error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // Renderizado
  // ------------------------------------------------------------
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary-light dark:bg-secondary-dark transition-colors duration-500 px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-neutral-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary-light dark:text-primary-dark">
          Bienvenido a Paseo Amigo 🐶
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Correo */}
          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 pr-10 rounded-lg border border-gray-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-light hover:bg-primary-light/90 dark:bg-primary-dark dark:hover:bg-primary-dark/80 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          ¿Aún no tienes una cuenta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-primary-light dark:text-primary-dark font-medium hover:underline"
          >
            Regístrate aquí
          </button>
        </p>
      </div>

      <ToastAlert message={toastMessage} />
    </div>
  );
}
