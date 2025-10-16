import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import image1 from "../../../assets/image1.webp";
import image2 from "../../../assets/image2.webp";
import image3 from "../../../assets/image3.webp";
import image4 from "../../../assets/image4.webp";
import image5 from "../../../assets/image5.webp";
import image6 from "../../../assets/image6.webp";
import image7 from "../../../assets/image7.webp";
import image8 from "../../../assets/image8.webp";
import image9 from "../../../assets/image9.webp";

const BannerTwo = () => {
  const [offset, setOffset] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [lightPosition, setLightPosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef(null);
  const requestRef = useRef(null);
  const loadedImagesCount = useRef(0);
  const navigate = useNavigate();

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9
  ];

  // Responsive image dimensions
  const getImageDimensions = () => {
    if (typeof window === 'undefined') return { width: 280, height: 360 };

    const width = window.innerWidth;
    if (width < 640) { // mobile
      return { width: 200, height: 280 };
    } else if (width < 1024) { // tablet
      return { width: 240, height: 320 };
    } else { // desktop
      return { width: 280, height: 360 };
    }
  };

  const [imageDimensions, setImageDimensions] = useState(getImageDimensions());
  const imageWidth = imageDimensions.width;
  const imageHeight = imageDimensions.height;
  const constantGap = 20;

  // Calcular el ancho total de un ciclo completo (promedio)
  const avgScale = 0.75;
  const cycleWidth = images.length * (imageWidth * avgScale + constantGap);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setImageDimensions(getImageDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animación de luz difuminada con margen superior
  useEffect(() => {
    let time = 0;
    const animateLight = () => {
      time += 0.005;
      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      
      // Margen superior para evitar el menú (ajusta según la altura de tu menú)
      const topMargin = 260; // píxeles de margen superior
      const availableHeight = windowHeight - topMargin;
      
      // Movimiento en forma de onda suave con límite superior
      const x = (Math.sin(time) * 0.5 + 0.5) * windowWidth;
      const y = topMargin + (Math.cos(time * 0.7) * 0.3 + 0.4) * availableHeight;
      
      setLightPosition({ x, y });
      requestAnimationFrame(animateLight);
    };
    
    const lightAnimationId = requestAnimationFrame(animateLight);
    return () => cancelAnimationFrame(lightAnimationId);
  }, []);

  // Precargar imágenes
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src) => {
        const img = new Image();
        img.onload = () => {
          loadedImagesCount.current += 1;
          if (loadedImagesCount.current === images.length) {
            setImagesLoaded(true);
          }
        };
        img.src = src;
      });
    };
    preloadImages();
  }, []);

  // Animación continua infinita - solo inicia cuando las imágenes están cargadas
  useEffect(() => {
    if (!imagesLoaded) return;

    const animate = () => {
      setOffset((prev) => {
        const newOffset = prev + 0.8;
        if (newOffset >= cycleWidth) {
          return newOffset - cycleWidth;
        }
        return newOffset;
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [cycleWidth, imagesLoaded]);

  // Calcular escala basada en la distancia al centro
  const getScale = (position) => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 800;
    const distanceFromCenter = Math.abs(centerX - position);
    const maxDistance = centerX;
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
    return 0.5 + (normalizedDistance * 0.5);
  };

  // Calcular posiciones
  const calculatePositions = () => {
    const tripleImages = [...images, ...images, ...images];
    const positions = [];
    let currentX = 0;

    tripleImages.forEach((_, index) => {
      const scale = getScale(currentX - offset);
      positions.push(currentX);
      currentX += imageWidth * scale + constantGap;
    });

    return { positions };
  };

  const { positions } = calculatePositions();

  const handleNavigateToProducts = () => {
    navigate('/products');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-b from-[#F9F7F3] to-[#EDEAE4] overflow-hidden py-8 md:py-16">
      {/* Luz difuminada animada */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${lightPosition.x}px`,
          top: `${lightPosition.y}px`,
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, #DFCCAC 0%, #DFCCAC 30%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 1
        }}
      />

      {/* Texto superior */}
      <motion.div
        className="z-10 text-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-sm sm:text-base lg:text-lg font-medium font-poppins text-[#F9F7F3] mt-8 bg-[#1c1c1c] px-4 sm:px-5 py-1 rounded-full inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Rosé Candle Co.
        </motion.h2>
        <motion.p
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-4 sm:mt-6 text-[#1c1c1c] text-center px-2"
          style={{ fontFamily: 'Lora, serif', lineHeight: '1.05' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="italic font-medium">Transforma tus Espacios,</span>
          <br />
          <span className="font-bold">Enciende tus Sentidos</span>
        </motion.p>
        <motion.p
          className="mt-4 sm:mt-6 text-base sm:text-lg font-regular text-gray-500 max-w-xl mx-auto leading-relaxed sm:leading-[2.1rem] text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          No solo creamos productos,
          diseñamos experiencias que despiertan tus sentidos.
          Cada vela transforma tu espacio,
          acompañándote en tus momentos más auténticos.
        </motion.p>
      </motion.div>

      {/* Carrusel */}
      <motion.div
        className="relative mt-4 sm:mt-0 md:mt-8 w-full h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-sm sm:text-base">Cargando...</div>
          </div>
        )}
        <div className="absolute left-0 top-0 h-full" style={{ opacity: imagesLoaded ? 1 : 0 }}>
          {[...images, ...images, ...images].map((src, i) => {
            const position = positions[i] - offset;
            const scale = getScale(position);

            return (
              <div
                key={i}
                className="absolute rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl"
                style={{
                  width: `${imageWidth}px`,
                  height: `${imageHeight}px`,
                  transform: `translateX(${position}px) scale(${scale})`,
                  transformOrigin: 'left center',
                  willChange: 'transform'
                }}
              >
                <img
                  src={src}
                  alt={`Vela ${(i % images.length) + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Botón */}
      <motion.div
        className="mt-4 sm:mt-0 mb-8 z-10"
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
  );
};

export default BannerTwo;