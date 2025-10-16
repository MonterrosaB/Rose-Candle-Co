import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductSection1 from "../../../assets/ProductSection1.png";
import ProductSection2 from "../../../assets/ProductSection2.png";
import ProductSection3 from "../../../assets/ProductSection3.png";
import OrbitedCircle from "../../../global/components/OrbitedCircle.jsx";

const ProductSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleNavigateToProducts = () => {
    navigate("/products");
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let startX = 0;
    let scrollLeft = 0;

    const mouseDownHandler = (e) => {
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
      container.isDragging = true;
    };

    const mouseMoveHandler = (e) => {
      if (!container.isDragging) return;
      const x = e.pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
    };

    const mouseUpHandler = () => {
      container.isDragging = false;
      container.style.cursor = "grab";
    };

    container.addEventListener("mousedown", mouseDownHandler);
    container.addEventListener("mousemove", mouseMoveHandler);
    container.addEventListener("mouseup", mouseUpHandler);
    container.addEventListener("mouseleave", mouseUpHandler);

    container.style.scrollSnapType = "x mandatory";
    container.style.cursor = "grab";

    return () => {
      container.removeEventListener("mousedown", mouseDownHandler);
      container.removeEventListener("mousemove", mouseMoveHandler);
      container.removeEventListener("mouseup", mouseUpHandler);
      container.removeEventListener("mouseleave", mouseUpHandler);
    };
  }, []);

  return (
    <section
      style={{
        backgroundColor: "#F9F7F3",
        padding: "4rem 1.5rem",
        position: "relative",
        overflow: "hidden",
        minHeight: "600px",
      }}
    >
      <div className="absolute -bottom-32 -right-32 scale-[2.5]">
        <OrbitedCircle size="large" />
      </div>

      <div style={{ maxWidth: "1120px", margin: "0 auto", position: "relative", zIndex: 12 }}>
        {/* Texto superior */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Título */}
          <div className="text-left lg:pl-8">
            <h2
              style={{
                fontFamily: "'Lora', serif",
                color: "#2d2d2d",
                lineHeight: 1.3,
                fontSize: "2rem",
              }}
              className="text-2xl sm:text-3xl lg:text-4xl"
            >
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>Creado con amor,</span>
              <br />
              <span style={{ fontWeight: 600 }}>Creado con propósito</span>
            </h2>
          </div>

          <div className="pt-6 lg:pt-8 pl-0 lg:pl-18 text-center lg:text-left">
            <p className="text-gray-700 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
              En Rosé, cada obra es hecha a mano con ingredientes 100% naturales. Cuidamos cada detalle, desde la mezcla
              de fragancias hasta el vertido artesanal, para crear productos únicos que transmiten calma, calidez y
              propósito.
            </p>
          </div>
        </div>

        {/* Galería carrusel */}
        <div
          ref={scrollRef}
          className="mt-6 flex overflow-x-auto gap-6 px-2 sm:px-4 py-4 snap-x snap-mandatory"
        >
          {[ProductSection1, ProductSection2, ProductSection3].map((imgSrc, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[80%] sm:w-[60%] md:w-[45%] lg:w-auto snap-center bg-[#F2EBD9] p-4 rounded-xl shadow-md"
              style={{ scrollSnapAlign: "center" }}
            >
              <img
                src={ProductSection1}
                alt="Vela artesanal negra con etiqueta blanca"
                className="w-40 h-60 lg:w-44 lg:h-70 object-cover rounded"
              />
            </div>

            <div className="bg-[#d4b896] p-4 lg:p-6 rounded-lg shadow-sm flex-shrink-0">
              <img
                src={ProductSection2}
                alt="Vela con flores secas y plantas naturales"
                className="w-40 h-60 lg:w-44 lg:h-70 object-cover rounded"
              />
            </div>

            <div className="bg-[#d4b896] p-4 lg:p-6 rounded-lg shadow-sm flex-shrink-0">
              <img
                src={ProductSection3}
                alt="Velas encendidas sobre superficie blanca"
                className="w-40 h-60 lg:w-44 lg:h-70 object-cover rounded"
              />
            </div>
          </div>
        </div>

        {/* Botón centrado */}
        <motion.div
          className="mt-8 mb-8 z-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <button
            onClick={handleNavigateToProducts}
            className="cursor-pointer flex items-center justify-center bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Ver Productos
            <span className="ml-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
