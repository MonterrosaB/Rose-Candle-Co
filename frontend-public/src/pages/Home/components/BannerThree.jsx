import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import bannerbackground3 from "../../../assets/image1.webp";

// Animaciones suaves y delicadas
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3, // cada línea aparece escalonada
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

// Variables de contenido
const textoPrincipal = "CADA FRAGANCIA \nES UN SUSPIRO \nDE ARMONÍA";
const textoSecundario =
  "En cada aroma, una historia. \nEn cada nota, un instante de paz. \nSumérgete en un universo sensorial único.";

const BannerThree = () => {
  const bannerRef = useRef(null);
  const isInView = useInView(bannerRef, { amount: 0.5, once: true }); // Solo cuando la sección entra en pantalla

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
          style={{ backgroundColor: "#A94048", opacity: 0.65 }} // opacidad
        />
      </motion.div>

      {/* Contenido */}
      <motion.div
        className="relative z-10 min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"} // Solo anima si el apartado está visible
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
