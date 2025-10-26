// Importamos los hooks de React para manejar estado y efectos secundarios.
import { useEffect, useState } from "react";

// Importamos herramientas de animación de Framer Motion.
// - motion: permite animar elementos HTML fácilmente.
// - AnimatePresence: gestiona animaciones de entrada/salida al montar o desmontar componentes.
import { motion, AnimatePresence } from "framer-motion";

// Importamos el ícono de flecha hacia arriba desde Lucide React.
// Este ícono se usará en el botón flotante “Volver arriba”.
import { ArrowUp } from "lucide-react";

// Importamos nuestros componentes personalizados:
// - GalleryItem: muestra cada imagen en formato “masonry”.
// - GalleryModal: muestra la imagen seleccionada en pantalla completa.
import GalleryItem from "../components/gallery/GalleryItem";
import GalleryModal from "../components/gallery/GalleryModal";

/**
 * 🧩 Componente principal: GalleryPage
 * ------------------------------------------------------------
 * Esta página muestra la galería completa de imágenes de Paseo Amigo.
 * Incluye:
 *  - Carga progresiva de imágenes desde Cloudinary (con fallback local).
 *  - Un diseño tipo “masonry” (Pinterest-style).
 *  - Modal animado con fullscreen y navegación.
 *  - Botón flotante “Volver arriba” con animación reactiva al scroll.
 */
const GalleryPage = () => {
  /**
   * 📸 Lista de imágenes de la galería
   * Cada objeto contiene:
   *  - id: identificador único.
   *  - title: título descriptivo.
   *  - cloudinary: URL principal (versión en la nube).
   *  - local: copia de respaldo almacenada en /assets/img/.
   */
  const galleryImages = [
    { id: 1, title: "Paseo en Avenida Tobalaba", cloudinary: "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761403924/paseoamigo/Gallery_photo_01.jpg", local: "/assets/img/Gallery_photo_01.jpg" },
    { id: 2, title: "Paseo en Parque Forestal", cloudinary: "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761403923/paseoamigo/Gallery_photo_02.jpg", local: "/assets/img/Gallery_photo_02.jpg" },
    { id: 3, title: "Paseo en Avenida Tobalaba", cloudinary: "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761403923/paseoamigo/Gallery_photo_03.jpg", local: "/assets/img/Gallery_photo_03.jpg" },
    { id: 4, title: "Perros Nocturno en Avenida Apoquindo", cloudinary: "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761403923/paseoamigo/Gallery_photo_04.jpg", local: "/assets/img/Gallery_photo_04.jpg" },
    { id: 5, title: "Salida recreativa en Providencia", cloudinary: "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761403924/paseoamigo/Gallery_photo_05.jpg", local: "/assets/img/Gallery_photo_05.jpg" },
    { id: 6, title: "Paseo nocturno en Ñuñoa", cloudinary: "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761403923/paseoamigo/Gallery_photo_06.jpg", local: "/assets/img/Gallery_photo_06.jpg" },
    { id: 7, title: "Paseo en Barrio Lastarria", cloudinary: "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761403924/paseoamigo/Gallery_Photo_07.jpg", local: "/assets/img/Gallery_Photo_07.jpg" },
    { id: 8, title: "Perros Boulevard Parque Arauco", cloudinary: "https://res.cloudinary.com/dmnxyqxcz/image/upload/v1761403924/paseoamigo/Gallery_photo_08.jpg", local: "/assets/img/Gallery_photo_08.jpg" },
  ];

  // 🧠 Estados de control principales
  const [allLoaded, setAllLoaded] = useState(false);        // indica si todas las imágenes se precargaron
  const [showScrollTop, setShowScrollTop] = useState(false); // muestra/oculta el botón flotante
  const [selectedIndex, setSelectedIndex] = useState(null);  // guarda qué imagen está seleccionada
  const [direction, setDirection] = useState(0);             // dirección de navegación (izquierda/derecha)

  /**
   * 🖱️ Manejador de scroll
   * Cada vez que el usuario se desplaza por la página, detectamos su posición
   * para decidir cuándo mostrar el botón “Volver arriba”.
   */
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * ⬆️ Función: scrollToTop
   * Desplaza suavemente la vista hacia la parte superior de la página.
   */
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /**
   * 🔄 Precarga de imágenes
   * Antes de mostrar la galería, cargamos todas las imágenes de Cloudinary.
   * Si alguna falla, igualmente avanzamos al estado “listo”.
   */
  useEffect(() => {
    const preload = async () => {
      await Promise.all(
        galleryImages.map(
          (img) =>
            new Promise((resolve) => {
              const i = new Image();
              i.src = img.cloudinary;
              i.onload = resolve;
              i.onerror = resolve;
            })
        )
      );
      setAllLoaded(true); // Marcamos la galería como cargada
    };
    preload();
  }, []);

  /**
   * ⏩ Avanzar a la siguiente imagen
   * Si llegamos al final del array, vuelve al inicio.
   */
  const handleNext = () => {
    setDirection(1);
    setSelectedIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  /**
   * ⏪ Retroceder a la imagen anterior
   * Si estamos en la primera, vuelve al final.
   */
  const handlePrev = () => {
    setDirection(-1);
    setSelectedIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  // Si hay una imagen seleccionada, la obtenemos para pasarla al modal.
  const selectedImage =
    selectedIndex !== null ? galleryImages[selectedIndex] : null;

  /**
   * ⌛ Vista temporal de carga
   * Mientras se precargan las imágenes, mostramos un spinner animado.
   */
  if (!allLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Cargando galería...</p>
      </div>
    );
  }

  return (
    // 🌈 Sección principal de la galería
    <section className="relative min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* 🔖 Encabezado fijo (sticky) con efecto blur */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          {/* motion.h2: el título aparece con una animación de entrada vertical */}
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Galería Paseo Amigo
          </motion.h2>
        </div>
      </header>

      {/* 🧱 Contenedor principal de la galería tipo “masonry” */}
      <div className="container mx-auto px-4 pt-8 pb-20">
        {/* Usamos columnas adaptables: 1 en móvil, 2 en tablet, 3 en escritorio */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((img, index) => (
            <GalleryItem
              key={img.id}        // clave única para React
              img={img}           // datos de la imagen
              index={index}       // posición (para el efecto de retardo)
              onClick={() => {    // qué pasa al hacer clic: abrimos el modal
                setSelectedIndex(index);
                setDirection(0);
              }}
            />
          ))}
        </div>
      </div>

      {/* 🪟 Modal que muestra la imagen seleccionada en pantalla completa */}
      <GalleryModal
        isOpen={selectedIndex !== null}             // se abre si hay imagen seleccionada
        image={selectedImage}                       // datos de la imagen actual
        direction={direction}                       // dirección de navegación (para animación)
        currentIndex={selectedIndex ?? 0}           // índice actual
        totalImages={galleryImages.length}          // total de imágenes
        onClose={() => setSelectedIndex(null)}      // cierra el modal
        onNext={handleNext}                         // pasa a la siguiente
        onPrev={handlePrev}                         // vuelve a la anterior
      />

      {/* ⬆️ Botón flotante “Volver arriba” (solo aparece si se hizo scroll) */}
      <AnimatePresence>
        {showScrollTop && selectedIndex === null && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-300 dark:border-gray-600 shadow-lg hover:scale-110 transition-transform duration-300"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-5 h-5 text-gray-800 dark:text-gray-100" />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
};

// Exportamos la página para poder incluirla en las rutas del sitio.
export default GalleryPage;
