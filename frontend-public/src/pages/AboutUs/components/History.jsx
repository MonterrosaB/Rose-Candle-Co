import { useEffect, useRef, useState } from "react";
import PersonasDeFondoHistory from "../../../assets/PersonasDeFondoHistory.png";
import ElisHistory from "../../../assets/Eli.svg";

const History = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

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
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${PersonasDeFondoHistory})` }}
    >
      <div className="absolute inset-0 bg-black/5 z-0"></div>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 object-cover"
        viewBox="0 0 1944 804"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M36 200 C500 100, 700 300, 900 400 S1500 600, 1900 500"
          fill="none"
          stroke="#A78A5E"
          strokeWidth="70"
          strokeLinecap="round"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: 2000 * (1 - scrollProgress),
            transition: "stroke-dashoffset 0s",
          }}
        />
      </svg>

      <div className="relative z-20 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center py-10 relative">
            <div className="relative z-20 lg:col-span-1">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg w-[90%] max-w-sm lg:max-w-md mx-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-4">¿Quién está detrás?</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Mi nombre es Elizabeth, y me gusta que me digan Eli. Rosé Candle Co. nació de una mezcla entre pasión
                  por los aromas, interés por el diseño sostenible y el deseo de emprender con propósito. Cada producto
                  que creo es parte de mi historia y mi compromiso con una forma de vida más consciente y armoniosa.
                </p>
              </div>
            </div>

            <div className="relative z-10 lg:col-span-1 flex justify-center -mb-10 lg:-mb-32">
              <img
                src={ElisHistory}
                alt="Persona"
                className="h-[90vh] w-auto object-contain drop-shadow-2xl scale-[1.3] lg:h-[130vh] lg:scale-[1.55]"
              />
            </div>

            <div className="relative z-20 lg:col-span-1 flex justify-end">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg w-[90%] max-w-sm lg:max-w-md mx-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Historia</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                  <p>
                    Rosé nació en un momento difícil, cuando la ansiedad y la incertidumbre parecían apagarlo todo.
                    Descubrir el mundo de las velas de cera de soja encendió en mí una chispa que no sabía que
                    necesitaba. Crear con mis manos se volvió sanador, una forma de volver a encontrar la luz.
                  </p>
                  <p>
                    El nombre honra mi historia y las mujeres fuertes de mi familia, todas llamadas Rosa. Hoy, cada
                    vela que hacemos en Rosé es un recordatorio de que, incluso en los días más oscuros, siempre hay una
                    luz esperando encenderse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
