import NuestraLuzInterior from "../../../assets/AboutUs.webp";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative w-full h-[100vh] overflow-hidden"
      style={{
        backgroundImage: `url(${NuestraLuzInterior})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Capa de opacidad ligera */}
      <div className="absolute inset-0 bg-[#F9F7F3]/20"></div>

      {/* Contenido principal */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 z-10 px-2 sm:px-2 text-center
                   top-2 sm:top-2 md:top-2 lg:top-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1c1c1c] leading-tight"
          style={{ fontFamily: "'Lora', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span style={{ fontWeight: 600 }}>Nuestra</span>
          <br />
          <span
            className="whitespace-nowrap"
            style={{ fontStyle: "italic", fontWeight: 400 }}
          >
            Luz Interior
          </span>
        </motion.h1>

        <motion.p
          className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {/* Texto corto SOLO en teléfonos */}
          <span className="block sm:hidden">
            En Rosé Candle Co., creemos en el poder del aroma y la luz para transformar espacios y emociones.
          </span>

          {/* Texto completo en tablets y computadoras */}
          <span className="hidden sm:block">
            En Rosé Candle Co., creemos en el poder del aroma y la luz para transformar espacios y emociones.
            Creamos velas y productos aromáticos ecológicos que invitan a la calma, la conexión y el equilibrio interior.
          </span>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
