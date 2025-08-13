import { useEffect, useRef } from "react";
import ProductSection1 from "../../../assets/ProductSection1.png";
import ProductSection2 from "../../../assets/ProductSection2.png";
import ProductSection3 from "../../../assets/ProductSection3.png";

import { Link } from "react-router";

const ProductSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (container && window.innerWidth < 1024) {
      // Centra la segunda tarjeta visualmente
      const imageWidth = 160;
      const gap = 24;
      const totalCard = imageWidth + gap;
      const scrollTo = totalCard;
      container.scrollLeft = scrollTo - 20;
    }
  }, []);

  return (
    <section className="bg-[#f5f1e8] py-16 px-6 relative overflow-hidden min-h-[600px]">
      <div className="max-w-7xl mx-auto relative z-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 pl-0 lg:pl-12 text-center lg:text-left">
            <h2 className="text-4xl font-light mb-6 text-gray-800 leading-tight">
              Creado con amor,
              <br />
              <span className="font-semibold">Creado con propósito</span>
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

        <div
          className="mt-10 flex justify-center lg:justify-center overflow-x-auto lg:overflow-visible px-8 -mx-8 lg:px-0 lg:mx-0"
          ref={scrollRef}
        >
          <div className="flex gap-6 lg:gap-[30px] items-center">
            <div className="bg-[#d4b896] p-4 lg:p-6 rounded-lg shadow-sm flex-shrink-0">
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

        <div className="mt-14 flex justify-center lg:justify-start pl-0 lg:pl-12">
          <Link
            to="/products"
            className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            VER PRODUCTOS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
