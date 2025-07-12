import { useState, useEffect, useRef } from "react";
import FeaturedProductsSectionBackground from "../../../assets/FeaturedProductsSectionBackground.png";
import Star from "../../../assets/Star.png";

import ProductHome1 from "../../../assets/ProductHome1.png"
import ProductHome2 from "../../../assets/ProductHome2.png"
import ProductHome3 from "../../../assets/ProductHome3.png"
import ProductHome4 from "../../../assets/ProductHome4.png"

const FeaturedProductsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const sectionRef = useRef(null);

  // Scroll animación
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

  // Responsive cards
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else if (width < 1280) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
      setCurrentIndex(0); // Reset al cambiar tamaño
    };

    window.addEventListener("resize", updateCardsPerView);
    updateCardsPerView();

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const products = [
    { id: 1, image: ProductHome1, title: "FRESH LOVE", description: "Esencia de vainilla y canela", price: "$8.50" },
    { id: 2, image: ProductHome2, title: "FRESH LOVE", description: "Esencia de vainilla y canela", price: "$8.50" },
    { id: 3, image: ProductHome3, title: "FRESH LOVE", description: "Esencia de vainilla y canela", price: "$8.50" },
    { id: 4, image: ProductHome4, title: "FRESH LOVE", description: "Esencia de vainilla y canela", price: "$8.50" },
    { id: 5, image: ProductHome1, title: "FRESH LOVE", description: "Esencia de vainilla y canela", price: "$8.50" },
    { id: 6, image: ProductHome2, title: "FRESH LOVE", description: "Esencia de vainilla y canela", price: "$8.50" },
  ];

  const totalCards = products.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);
  const step = cardsPerView === 1 ? 1 : cardsPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + step, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - step, 0));
  };

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-[#f5f1eb]">
      {/* Línea curva animada */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1944 804" preserveAspectRatio="xMidYMid slice">
        <path
          d="M36 200 C500 100, 700 300, 900 400 S1500 600, 1900 500"
          fill="none"
          stroke="#DFCCAC"
          strokeWidth="70"
          strokeLinecap="round"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: 2000 * (1 - scrollProgress),
            transition: "stroke-dashoffset 0s",
          }}
        />
      </svg>

      {/* Header responsive */}
      <div
        className="py-6 px-4 bg-cover bg-center bg-no-repeat relative z-10"
        style={{ backgroundImage: `url(${FeaturedProductsSectionBackground})` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 px-4 md:px-12 lg:px-20">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Lo más vendido</h2>
            <p className="text-sm text-gray-600 mt-1 sm:ml-4">Productos populares</p>
          </div>
          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors self-start sm:self-auto">
            VER PRODUCTOS
          </button>
        </div>
      </div>

      {/* Productos */}
      <div className="py-12 px-4 relative z-10">
        <div className="absolute top-8 left-8">
          <img src={Star} alt="decorative star" className="w-6 h-6 opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between gap-4">
            {/* Botón izquierda */}
            <button onClick={prevSlide} disabled={currentIndex === 0} className="p-2 hover:opacity-70 transition-opacity disabled:opacity-30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Carrusel */}
            <div className="overflow-hidden flex-1">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  width: `${(100 / cardsPerView) * totalCards}%`,
                  transform: `translateX(-${(100 / totalCards) * currentIndex}%)`,
                }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / totalCards}%` }}
                  >
                    <div className="aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-3 mt-4">
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

            {/* Botón derecha */}
            <button onClick={nextSlide} disabled={currentIndex >= maxIndex} className="p-2 hover:opacity-70 transition-opacity disabled:opacity-30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 right-1/3">
          <img src={Star} alt="decorative star" className="w-6 h-6 opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsSection;
