import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Componente que asegura que cada cambio de ruta
 * haga scroll automático hasta el inicio de la página.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll suave hasta el inicio de la página
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
