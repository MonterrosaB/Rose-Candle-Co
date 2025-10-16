import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import bannerbackground3 from "../../../assets/image1.webp";
import { useAuth } from "../../../global/hooks/useAuth";

// Animaciones suaves y delicadas
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeUpSubtle = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const fadeRightSubtle = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

// Valores por defecto
const DEFAULT_TEXT_PRINCIPAL = "CADA FRAGANCIA \nES UN SUSPIRO \nDE ARMONÍA";
const DEFAULT_TEXT_SECUNDARIO =
  "En cada aroma, una historia. \nEn cada nota, un instante de paz. \nSumérgete en un universo sensorial único.";

const BannerThree = () => {
  const { API } = useAuth();
  const ApiSettings = API + "/settings";
  const bannerRef = useRef(null);
  const isInView = useInView(bannerRef, { amount: 0.5, once: true });

  const [textoPrincipal, setTextoPrincipal] = useState(DEFAULT_TEXT_PRINCIPAL);
  const [textoSecundario, setTextoSecundario] = useState(DEFAULT_TEXT_SECUNDARIO);

  useEffect(() => {
    const fetchInspirationText = async () => {
      try {
        const res = await fetch(`${ApiSettings}`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.inspiration?.phrase) {
            setTextoPrincipal(data.inspiration.phrase);
          }
          if (data.inspiration?.description) {
            setTextoSecundario(data.inspiration.description);
          }
        }
      } catch (error) {
        console.error("Error al cargar textos de inspiración:", error);
        // Mantiene los valores por defecto si hay error
      }
    };

    fetchInspirationText();
  }, []);

  return (
    <div ref={bannerRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo con imagen + transparencia */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bannerbackground3})` }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#A94048", opacity: 0.65 }}
        />
      </motion.div>

      {/* Contenido */}
      <motion.div
        className="relative z-10 min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {/* Texto principal centrado */}
        <div className="flex flex-col justify-center items-center min-h-screen px-4 py-8 text-center">
          {textoPrincipal.split("\n").map((line, i) => (
            <motion.h1
              key={i}
              variants={fadeUpSubtle}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight tracking-wide drop-shadow-lg"
              style={{ fontFamily: "Lora" }}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        {/* Texto secundario anclado abajo */}
        <div className="absolute bottom-32 w-full px-4 text-center">
          {textoSecundario.split("\n").map((line, i) => (
            <motion.p
              key={i}
              variants={fadeRightSubtle}
              className="max-w-xl mx-auto text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md italic"
              style={{ fontFamily: "Poppins" }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BannerThree;