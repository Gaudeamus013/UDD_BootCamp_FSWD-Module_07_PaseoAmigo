// Importamos las herramientas necesarias desde Framer Motion.
// - motion: permite convertir cualquier elemento HTML en uno animable.
// - AnimatePresence: gestiona animaciones de entrada y salida al montar/desmontar componentes.
// - useMotionValue y useTransform: manejan valores animados en tiempo real (para efectos tipo parallax o giroscopio).
// - animate: sirve para mover valores de forma controlada (con física realista).
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

// Importamos los íconos que usaremos para los botones (cerrar, siguiente, anterior, modo fullscreen).
import {
  X,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2,
} from "lucide-react";

// React nos da los hooks useState y useEffect para manejar estados y efectos secundarios.
import { useEffect, useState } from "react";

/**
 * 🧩 Componente principal: GalleryModal
 * Este modal se encarga de mostrar las imágenes ampliadas de la galería.
 * Incluye animaciones de zoom, efectos 3D, modo fullscreen, y soporte giroscópico en móviles.
 */
const GalleryModal = ({
  isOpen,         // true cuando el modal está visible
  image,          // imagen actualmente seleccionada (objeto con src, title, etc.)
  onClose,        // función para cerrar el modal
  onNext,         // función para pasar a la siguiente imagen
  onPrev,         // función para volver a la anterior
  currentIndex,   // índice actual dentro del array de imágenes
  totalImages,    // número total de imágenes
}) => {
  // Estados internos del componente
  const [loaded, setLoaded] = useState(false); // indica si la imagen terminó de cargar
  const [direction, setDirection] = useState(0); // guarda la dirección de navegación (izquierda/derecha)
  const [isMobile, setIsMobile] = useState(false); // detecta si el dispositivo es móvil
  const [fullscreenMode, setFullscreenMode] = useState(false); // activa o desactiva el modo fullscreen

  // 🧠 Detecta el tamaño de la ventana para saber si es móvil o escritorio
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Si es móvil, activamos automáticamente el modo fullscreen
  useEffect(() => {
    if (isMobile) setFullscreenMode(true);
  }, [isMobile]);

  // 🌌 Creamos valores de movimiento para generar efecto de profundidad (parallax o giroscopio)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Estos valores determinan cómo se moverán fondo e imagen según x e y
  const bgX = useTransform(x, [-150, 150], [fullscreenMode ? 0 : 15, fullscreenMode ? 0 : -15]);
  const bgY = useTransform(y, [-150, 150], [fullscreenMode ? 0 : 15, fullscreenMode ? 0 : -15]);
  const imgX = useTransform(x, [-150, 150], [fullscreenMode ? 0 : -10, fullscreenMode ? 0 : 10]);
  const imgY = useTransform(y, [-150, 150], [fullscreenMode ? 0 : -10, fullscreenMode ? 0 : 10]);

  // Variables auxiliares para medir velocidad del ratón (parallax dinámico)
  let lastX = 0;
  let lastY = 0;
  let lastTime = Date.now();

  // 🎮 Efecto Parallax (solo escritorio)
  const handleMouseMove = (e) => {
    if (fullscreenMode || isMobile) return; // desactivamos en móviles o modo fullscreen

    const { innerWidth, innerHeight } = window;
    const offsetX = e.clientX - innerWidth / 2;
    const offsetY = e.clientY - innerHeight / 2;

    const now = Date.now();
    const dt = now - lastTime || 16;
    const vx = (offsetX - lastX) / dt;
    const vy = (offsetY - lastY) / dt;

    lastX = offsetX;
    lastY = offsetY;
    lastTime = now;

    // Ajustamos la intensidad del movimiento en función de la velocidad del cursor
    const intensity = Math.min(1 + Math.abs(vx * 2) + Math.abs(vy * 2), 4);

    // Movemos los valores x e y usando una animación tipo "spring" (resorte físico)
    animate(x, offsetX / (10 / intensity), { type: "spring", stiffness: 80, damping: 15 });
    animate(y, offsetY / (10 / intensity), { type: "spring", stiffness: 80, damping: 15 });
  };

  // 🧭 Efecto Giroscópico (solo móviles)
  useEffect(() => {
    if (!fullscreenMode || !isMobile) return;

    // Esta función recibe los ángulos de inclinación del dispositivo
    const handleOrientation = (event) => {
      const { beta, gamma } = event; // beta: adelante/atrás | gamma: izquierda/derecha
      if (beta == null || gamma == null) return;

      const maxTilt = 30; // rango máximo de sensibilidad
      const normX = Math.max(-maxTilt, Math.min(maxTilt, gamma));
      const normY = Math.max(-maxTilt, Math.min(maxTilt, beta - 90));

      const mappedX = (normX / maxTilt) * 10; // desplazamiento máximo de ±10px
      const mappedY = (normY / maxTilt) * 10;

      // Movemos los valores x/y suavemente según la inclinación del teléfono
      animate(x, mappedX, { type: "spring", stiffness: 50, damping: 10 });
      animate(y, mappedY, { type: "spring", stiffness: 50, damping: 10 });
    };

    // Solicitamos permiso para usar el sensor en iOS (requerido desde iOS 13)
    const enableGyro = async () => {
      try {
        if (
          typeof DeviceOrientationEvent !== "undefined" &&
          typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } else {
          // En Android no hace falta pedir permiso
          window.addEventListener("deviceorientation", handleOrientation);
        }
      } catch {
        console.warn("⚠️ El giroscopio no está disponible o fue denegado.");
      }
    };

    enableGyro();

    // Limpiamos los listeners al cerrar
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      animate(x, 0);
      animate(y, 0);
    };
  }, [fullscreenMode, isMobile]);

  // Bloqueamos el scroll del fondo cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // 🎹 Control por teclado (flechas y escape)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") smoothClose();
      if (e.key === "ArrowRight") {
        setDirection(1);
        onNext();
      }
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        onPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onNext, onPrev]);

  if (!isOpen || !image) return null; // si el modal está cerrado o no hay imagen, no renderizamos nada

  // ✨ Animación base del modal al cerrarse (suaviza la salida)
  const smoothClose = () => {
    const overlay = document.getElementById("gallery-overlay");
    if (!overlay) return onClose();

    overlay.animate(
      [
        { opacity: 1, backdropFilter: "blur(8px)" },
        { opacity: 0, backdropFilter: "blur(0px)" },
      ],
      { duration: 500, easing: "ease-in-out" }
    );

    animate(x, 0);
    animate(y, 0);
    setTimeout(() => onClose(), 480);
  };

  // 🔲 Alterna el modo fullscreen manualmente (desktop)
  const toggleFullscreen = () => setFullscreenMode((prev) => !prev);

  return (
    <AnimatePresence>
      {isOpen && (
        // 🌑 Capa de fondo del modal (overlay)
        <motion.div
          id="gallery-overlay"
          key="overlay"
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${
            fullscreenMode ? "bg-black" : ""
          }`}
          style={{
            translateX: bgX,
            translateY: bgY,
          }}
          // Estado inicial (comienza opaco y con blur fuerte)
          initial={{
            opacity: 0,
            backdropFilter: fullscreenMode ? "none" : "blur(20px)",
            backgroundColor: fullscreenMode
              ? "rgba(0,0,0,0)"
              : "rgba(0,0,0,0)",
            scale: 0.95,
          }}
          // Estado animado (se va aclarando y estabilizando)
          animate={{
            opacity: 1,
            backdropFilter: fullscreenMode ? "none" : "blur(8px)",
            backgroundColor: fullscreenMode
              ? "rgba(0,0,0,1)"
              : "rgba(0,0,0,0.7)",
            scale: 1,
            transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] },
          }}
          // Al salir, desaparece lentamente con blur reducido
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
            backgroundColor: "rgba(0,0,0,0)",
            scale: 0.95,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          onClick={smoothClose}
          onMouseMove={handleMouseMove}
        >
          {/* Contenedor de la imagen y los controles */}
          <motion.div
            layoutId={`image-${image.id}`}
            className={`relative ${
              fullscreenMode ? "h-full w-full" : "max-w-6xl w-[92%]"
            } cursor-auto`}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: 1,
              scale: [0.92, 1.04, 1],
              transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
            }}
            exit={{
              opacity: 0,
              scale: [1, 0.96, 0.9],
              transition: { duration: 0.6, ease: [0.37, 0, 0.63, 1] },
            }}
          >
            {/* Imagen ampliada con efecto de materialización */}
            <div
              className={`relative flex justify-center items-center ${
                fullscreenMode ? "h-full w-full" : "min-h-[60vh] max-h-[80vh]"
              } overflow-hidden`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={image.src}
                  src={image.src || image.cloudinary || image.local}
                  alt={image.title}
                  onError={(e) => (e.target.src = image.local)}
                  onLoad={() => setLoaded(true)}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  // Definimos el nuevo efecto "materialización desde el fondo"
                  variants={{
                    enter: {
                      opacity: 0,
                      scale: 0.9,
                      filter: "blur(8px)",
                    },
                    center: {
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      scale: 0.9,
                      filter: "blur(8px)",
                      transition: { duration: 0.4, ease: "easeInOut" },
                    },
                  }}
                  transition={{
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                  }}
                  style={{
                    translateX: imgX,
                    translateY: imgY,
                  }}
                  className={`object-contain select-none ${
                    fullscreenMode
                      ? "w-full h-full"
                      : "w-full max-h-[80vh] rounded-2xl"
                  } shadow-2xl transition-opacity duration-300 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </AnimatePresence>
            </div>

            {/* Contadores y títulos solo visibles fuera del modo fullscreen */}
            {!fullscreenMode && (
              <>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1 rounded-full backdrop-blur-sm">
                  {image.title}
                </div>
                <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  {currentIndex + 1} / {totalImages}
                </div>
              </>
            )}

            {/* Botón para alternar modo inmersivo */}
            <button
              onClick={toggleFullscreen}
              className={`absolute ${
                fullscreenMode ? "top-5 right-16" : "top-4 right-16"
              } p-2 bg-white/80 dark:bg-gray-800/70 rounded-full hover:scale-110 transition-transform backdrop-blur-md shadow-md`}
              aria-label="Modo inmersivo"
            >
              {fullscreenMode ? (
                <Minimize2 className="w-5 h-5 text-gray-800 dark:text-white" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-800 dark:text-white" />
              )}
            </button>

            {/* Botones de navegación e interacción */}
            <button
              onClick={smoothClose}
              className={`absolute ${
                fullscreenMode ? "top-5 right-5" : "top-4 right-4"
              } p-2 bg-white/80 dark:bg-gray-800/70 rounded-full hover:scale-110 transition-transform backdrop-blur-md shadow-md`}
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-gray-800 dark:text-white" />
            </button>

            <button
              onClick={() => {
                setDirection(-1);
                onPrev();
              }}
              className={`absolute top-1/2 left-3 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-gray-800/70 backdrop-blur-md hover:scale-110 transition-transform shadow-md ${
                fullscreenMode ? "opacity-60" : ""
              }`}
              aria-label="Anterior"
            >
              <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
            </button>

            <button
              onClick={() => {
                setDirection(1);
                onNext();
              }}
              className={`absolute top-1/2 right-3 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-gray-800/70 backdrop-blur-md hover:scale-110 transition-transform shadow-md ${
                fullscreenMode ? "opacity-60" : ""
              }`}
              aria-label="Siguiente"
            >
              <ArrowRight className="w-5 h-5 text-gray-800 dark:text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;
