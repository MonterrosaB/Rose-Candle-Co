import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import img from "../../../assets/image3.webp";
import { AnimatedLine } from "./AnimatedLine.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../global/hooks/useAuth.js";

// Datos por defecto
const DEFAULT_COLLECTION = {
  name: "Father's Day",
  availableDate: "Disponible hasta el 31 de junio de 2025.",
  image: img,
  description:
    "Descubre una colección inspirada en la elegancia y el estilo masculino, perfecta para regalar en el Día del Padre. El regalo ideal para demostrar tu aprecio y cariño.",
  isConstant: false,
};

const Promotion = () => {
  const { API } = useAuth();
  const ApiSettings = API + "/settings";
  const navigate = useNavigate();
  const [collection, setCollection] = useState(DEFAULT_COLLECTION);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const transition = { duration: 1, ease: "easeOut" };

  // Fetch seasonal collection
  useEffect(() => {
    const fetchSeasonalCollection = async () => {
      try {
        const res = await fetch(`${ApiSettings}`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();

          if (data.seasonalCollection) {
            const sc = data.seasonalCollection;

            let availableDate = DEFAULT_COLLECTION.availableDate;

            if (sc.isConstant) {
              availableDate = "Colección permanente";
            } else if (sc.availableUntil) {
              // Extraer la fecha del string "Disponible hasta el 31 de diciembre de 2025"
              const dateString = sc.availableUntil.replace('Disponible hasta el ', '');
              const months = {
                'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3,
                'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7,
                'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
              };

              const parts = dateString.match(/(\d+)\s+de\s+(\w+)\s+de\s+(\d+)/);
              if (parts) {
                const day = parseInt(parts[1], 10);
                const month = months[parts[2].toLowerCase()];
                const year = parseInt(parts[3], 10);
                const date = new Date(year, month, day);

                if (!isNaN(date)) {
                  // Devolver la misma cadena en español
                  availableDate = `Disponible hasta el ${date.toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}`;
                }
              }
            }

            setCollection({
              name: sc.name || DEFAULT_COLLECTION.name,
              availableDate: availableDate,
              image: sc.image || DEFAULT_COLLECTION.image,
              description: sc.description || DEFAULT_COLLECTION.description,
              isConstant: sc.isConstant || false,
            });
          }
        }
      } catch (error) {
        console.error("Error al cargar colección de temporada:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonalCollection();
  }, []);

  return (
    <section
      data-animated-section
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 flex justify-center items-center bg-[#DFCCAC] overflow-hidden min-h-screen md:min-h-auto"
    >
      <div className="absolute inset-0 z-0">
        <AnimatedLine />
      </div>
      <div
        ref={ref}
        className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-14 max-w-6xl w-full relative z-10"
      >
        <motion.div
          className="flex-1 text-center md:text-left order-2 md:order-1"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transition}
        >
          <h2
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold mb-3 sm:mb-4 text-[#1c1c1c] leading-[0.9]"
            style={{ fontFamily: "Lora, serif" }}
          >
            Colección de<br />
            <span className="italic font-normal">temporada</span>
          </h2>
          <p className="mt-6 sm:mt-8 md:mt-16 text-base sm:text-lg text-[#333] font-light max-w-xl mx-auto md:mx-0">
            {collection.description}
          </p>
        </motion.div>
        <motion.div
          className="w-full sm:w-72 md:w-80 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl bg-[#F2EBD9] flex flex-col border border-gray-200 transition-transform duration-300 order-1 md:order-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...transition, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="relative w-full h-48 sm:h-64 md:h-80 border-t-4 sm:border-t-6 md:border-t-8 border-x-4 sm:border-x-6 md:border-x-8 border-[#F2EBD9] overflow-hidden rounded-t-2xl sm:rounded-t-[2rem]">
            {loading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            ) : (
              <motion.img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-500"
                whileHover={{ scale: 1.08 }}
              />
            )}
            <div className="absolute top-0 left-0 w-full h-20 sm:h-24 md:h-32 bg-gradient-to-b from-black/60 via-black/30 to-transparent rounded-t-2xl sm:rounded-t-[2rem]" />
            <div className="absolute top-3 sm:top-4 md:top-6 left-0 w-full text-center text-white px-3 sm:px-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold drop-shadow-md">
                {collection.name}
              </h3>
            </div>
          </div>
          <div className="bg-[#F2EBD9] p-3 sm:p-4 md:p-5 flex flex-col items-center text-center rounded-b-2xl sm:rounded-b-[2rem]">
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              {collection.availableDate}
            </p>
            <motion.button
              className="cursor-pointer px-4 sm:px-6 py-2 border border-[#1C1C1C] text-[#1c1c1c] rounded-full font-medium shadow-sm text-sm sm:text-base"
              whileHover={{
                backgroundColor: "#1C1C1C",
                color: "#ffffff",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
            >
              Explorar Colección
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Promotion;