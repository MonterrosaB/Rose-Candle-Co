import { useState, useEffect, useRef } from "react";
import Star from "../../../assets/Star.png";
import { useNavigate } from "react-router-dom";

import ProductHome1 from "../../../assets/ProductHome1.png";
import ProductHome2 from "../../../assets/ProductHome2.png";
import ProductHome3 from "../../../assets/ProductHome3.png";
import ProductHome4 from "../../../assets/ProductHome4.png";

const FeaturedProductsSection = () => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  const products = [
    { id: 1, image: ProductHome1, title: "FRESH LOVE", description: "Esencia de vainilla y canela", price: "$8.50" },
    { id: 2, image: ProductHome2, title: "FRESH LOVE", description: "Esencia de vainilla y canela", price: "$8.50" },
    { id: 3, image: ProductHome3, title: "FRESH LOVE", description: "Esencia de vainilla y canela", price: "$8.50" },
    { id: 4, image: ProductHome4, title: "FRESH LOVE", description: "Esencia de vainilla y canela", price: "$8.50" },
  ];

  // Scroll animación línea
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      let progress = 0;

      if (sectionTop <= windowHeight && sectionTop + sectionHeight >= 0) {
        const totalScrollableHeight = sectionHeight + windowHeight;
        const scrolled = windowHeight - sectionTop;
        progress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));
      } else if (sectionTop < 0) {
        progress = 1;
      }

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-[#F2EBD9] py-16">
      {/* Línea curva animada vertical */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M400 700 C100 500, 50 300, 400 200 C750 300, 700 500, 400 700 Z"
          fill="none"
          stroke="#DFCCAC"
          strokeWidth="30"
          strokeLinecap="round"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: 2000 * (1 - scrollProgress),
            transition: "stroke-dashoffset 0s",
          }}
        />
      </svg>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto text-center px-4 md:px-12 lg:px-20">
        <h2
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2"
          style={{ fontFamily: "Lora" }}
        >
          Lo más vendido
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-12">Productos populares</p>
      </div>

      {/* Productos: grid en desktop, carrusel en móviles */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
        {/* Carrusel móvil */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto lg:hidden pb-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex-shrink-0 w-72 scroll-snap-align-start"
            >
              <div className="aspect-[4/5]">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-gray-900 text-lg">{product.title}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <div className="flex gap-2">
                  <span className="border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700">8oz</span>
                  <span className="border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700">16oz</span>
                </div>
                <p className="font-bold text-gray-900 text-xl">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Grid desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[4/5]">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-gray-900 text-lg">{product.title}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <div className="flex gap-2">
                  <span className="border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700">8oz</span>
                  <span className="border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700">16oz</span>
                </div>
                <p className="font-bold text-gray-900 text-xl">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estrellas decorativas */}
      <div className="absolute top-8 left-8">
        <img src={Star} alt="decorative star" className="w-6 h-6 opacity-60" />
      </div>
      <div className="absolute bottom-8 right-1/3">
        <img src={Star} alt="decorative star" className="w-6 h-6 opacity-60" />
      </div>
    </div>
  );
};

export default FeaturedProductsSection;
