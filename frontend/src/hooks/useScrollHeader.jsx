import { useEffect, useState } from "react";

/**
 * Hook que detecta si el usuario ha hecho scroll.
 * Retorna un booleano `isScrolled` para aplicar animaciones en el header.
 */
export default function useScrollHeader(threshold = 10) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
