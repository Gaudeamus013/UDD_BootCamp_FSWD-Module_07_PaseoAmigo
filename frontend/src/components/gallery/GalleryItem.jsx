// Importamos `motion` desde Framer Motion.
// Nos permitirá animar los elementos con facilidad (escala, opacidad, etc.).
import { motion } from "framer-motion";

// Importamos hooks de React para manejar estado (`useState`) y efectos secundarios (`useEffect`).
import { useState, useEffect } from "react";

/**
 * 🧩 Hook personalizado: useImageWithFallback
 * --------------------------------------------------
 * Este hook se encarga de intentar cargar una imagen desde Cloudinary.
 * Si por algún motivo falla (por ejemplo, sin conexión o error de red),
 * automáticamente usa una copia local almacenada en `/assets/img/`.
 *
 * ➕ Beneficios:
 * - Asegura que la galería siempre muestre algo, incluso sin internet.
 * - Mejora la experiencia del usuario al evitar “imágenes rotas”.
 */
const useImageWithFallback = (cloudinaryUrl, localPath) => {
  // `src` guarda la ruta actual de la imagen (por defecto Cloudinary).
  const [src, setSrc] = useState(cloudinaryUrl);

  // `loaded` indica si la imagen terminó de cargar (true) o si sigue en proceso.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Creamos un nuevo objeto `Image` (nativo del navegador).
    // Esto nos permite precargar la imagen y detectar si falla o se carga correctamente.
    const img = new Image();

    // Definimos su fuente remota (Cloudinary).
    img.src = cloudinaryUrl;

    // Creamos un temporizador por si Cloudinary demora demasiado.
    // Si después de 5 segundos no carga, usamos la imagen local.
    const timer = setTimeout(() => {
      setSrc(localPath);  // Cambiamos la fuente a la copia local.
      setLoaded(true);    // Indicamos que ya está “cargada”.
    }, 5000);

    // Si la imagen se carga correctamente, limpiamos el temporizador.
    img.onload = () => {
      clearTimeout(timer);
      setSrc(cloudinaryUrl); // Confirmamos Cloudinary como fuente.
      setLoaded(true);       // Indicamos carga exitosa.
    };

    // Si ocurre un error (404, red, etc.), usamos la imagen local.
    img.onerror = () => {
      clearTimeout(timer);
      setSrc(localPath);
      setLoaded(true);
    };

    // Limpiamos el temporizador si el componente se desmonta.
    return () => clearTimeout(timer);
  }, [cloudinaryUrl, localPath]);

  // Retornamos ambos valores para que puedan usarse en el componente principal.
  return { src, loaded };
};

/**
 * 🖼️ Componente: GalleryItem
 * --------------------------------------------------
 * Representa una sola imagen dentro de la galería tipo “masonry”.
 * Se encarga de mostrar:
 *  - La imagen (Cloudinary o local)
 *  - El título descriptivo debajo
 *  - Una animación de entrada suave
 *  - Un efecto de zoom al pasar el cursor
 */
const GalleryItem = ({ img, index, onClick }) => {
  // Usamos el hook anterior para obtener la imagen adecuada (Cloudinary → Local).
  const { src, loaded } = useImageWithFallback(img.cloudinary, img.local);

  return (
    // `motion.div` es una versión animada del `div` normal.
    // Aquí aplicamos una animación de entrada progresiva.
    <motion.div
      className="relative overflow-hidden rounded-2xl break-inside-avoid shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
      // Estado inicial: ligeramente pequeño y transparente.
      initial={{ opacity: 0, scale: 0.9 }}
      // Estado final: visible y a tamaño normal.
      animate={{ opacity: 1, scale: 1 }}
      // Cada imagen entra con un pequeño retraso para crear un efecto “en cascada”.
      transition={{ delay: index * 0.15, duration: 0.5 }}
      // Al hacer clic, notificamos al componente padre (GalleryPage) cuál imagen se seleccionó.
      onClick={() => onClick({ ...img, src })}
    >
      {/* 🔄 Mientras la imagen se está cargando, mostramos un “skeleton loader”.
          Es un pequeño círculo pulsante que indica al usuario que el contenido viene en camino. */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-pulse h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      )}

      {/* 🖼️ Imagen principal
          - `src`: viene del hook (Cloudinary o local).
          - `object-cover`: mantiene la proporción de la imagen.
          - `hover:scale-105`: efecto de zoom suave al pasar el mouse.
          - `transition-transform`: asegura una animación fluida. */}
      <img
        src={src}
        alt={img.title}
        className="w-full rounded-2xl object-cover hover:scale-105 transition-transform duration-700"
        loading="lazy" // HTML5: carga diferida (solo se descarga cuando está visible en pantalla)
      />

      {/* 📋 Pie de foto
          Fondo semitransparente y texto centrado debajo de cada imagen. */}
      <div className="p-3 text-center bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm">
        <p className="text-sm text-gray-700 dark:text-gray-300">{img.title}</p>
      </div>
    </motion.div>
  );
};

// Exportamos el componente para poder usarlo en `GalleryPage.jsx`.
export default GalleryItem;
