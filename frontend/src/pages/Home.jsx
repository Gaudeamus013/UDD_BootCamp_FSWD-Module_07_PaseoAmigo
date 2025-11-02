import React, { useEffect } from "react";
import ToastAlert from "../components/ui/ToastAlert.jsx";
import { useUser } from "../context/UserContext.jsx";

// ============================================================
// 🐾 Paseo Amigo – Home.jsx (con ToastAlert global)
// ============================================================
// • Escucha el estado global de statusMessage en UserContext
// • Muestra toasts informativos al iniciar/cerrar sesión
// • Compatible con modo día/noche y UI existente
// ============================================================

export default function Home() {
  const { statusMessage, setStatusMessage, messageType } = useUser();

  // 🧹 Limpia el mensaje automáticamente después de unos segundos
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage, setStatusMessage]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-black text-center px-4 transition-colors">
      <ToastAlert message={statusMessage} type={messageType} />

      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
          Bienvenido a Paseo Amigo 🐾
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
          El servicio de paseos caninos diseñado para cuidar y acompañar a tu
          mejor amigo con responsabilidad, cariño y profesionalismo.
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Accede a tu cuenta, revisa tus servicios o conoce nuestras opciones de
          paseo y reserva directamente.
        </p>
      </div>
    </section>
  );
}