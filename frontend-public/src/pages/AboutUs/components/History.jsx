import { useEffect, useRef, useState } from "react";
import PersonasDeFondoHistory from "../../../assets/bgAbout.webp";
import ElisHistory from "../../../assets/Eli.svg";

const History = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
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
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${PersonasDeFondoHistory})`,
      }}
    >
      <div className="absolute inset-0 bg-black/5 z-0"></div>

      {/* SVG decorativo solo desktop */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 object-cover hidden lg:block"
        viewBox="0 0 1944 804"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-200 350 C500 250, 700 450, 900 550 S1500 750, 2200 650"
          fill="none"
          stroke="#A78A5E"
          strokeWidth="70"
          strokeLinecap="round"
          style={{
            strokeDasharray: 2800,
            strokeDashoffset: 2800 * (1 - scrollProgress),
            transition: "stroke-dashoffset 0s",
          }}
        />
      </svg>

      {/* Versión móvil */}
      <div className="block lg:hidden relative min-h-[60vh] flex flex-col justify-end items-center">
        <img
          src={ElisHistory}
          alt="Eli"
          className="absolute bottom-0 w-[85%] max-w-[320px] object-contain opacity-90"
        />

        <div className="z-20 mb-4 flex gap-3">
          <button
            onClick={() => setActiveSection("quien")}
            className={`px-3 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${activeSection === "quien"
                ? "bg-[#A78A5E] text-white border-[#A78A5E]"
                : "bg-white/70 border-[#A78A5E] text-[#1c1c1c]"
              }`}
          >
            ¿Quién está detrás?
          </button>
          <button
            onClick={() => setActiveSection("historia")}
            className={`px-3 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${activeSection === "historia"
                ? "bg-[#A78A5E] text-white border-[#A78A5E]"
                : "bg-white/70 border-[#A78A5E] text-[#1c1c1c]"
              }`}
          >
            Historia
          </button>
        </div>

        {activeSection && (
          <div className="z-30 w-[90%] max-w-[300px] bg-[#F2EBD9] px-3 py-4 text-[#1c1c1c] text-sm sm:text-base leading-relaxed transition-all duration-500 rounded-lg">
            {activeSection === "quien" && (
              <>
                <h3 className="text-lg font-bold mb-1">¿Quién está detrás?</h3>
                <p>
                  Mi nombre es Elizabeth, y me gusta que me digan Eli. Rosé Candle Co. nació de una mezcla entre pasión
                  por los aromas, interés por el diseño sostenible y el deseo de emprender con propósito. Cada producto
                  que creo es parte de mi historia y mi compromiso con una forma de vida más consciente y armoniosa.
                </p>
              </>
            )}
            {activeSection === "historia" && (
              <>
                <h3 className="text-lg font-bold mb-1 text-right">Historia</h3>
                <div className="space-y-2 text-right text-sm sm:text-base">
                  <p>
                    Rosé nació en un momento difícil, cuando la ansiedad y la incertidumbre parecían apagarlo todo.
                    Descubrir el mundo de las velas de cera de soja encendió en mí una chispa que no sabía que
                    necesitaba. Crear con mis manos se volvió sanador, una forma de volver a encontrar la luz.
                  </p>
                  <p>
                    El nombre honra mi historia y a las mujeres fuertes de mi familia, todas llamadas Rosa. Hoy, cada
                    vela que hacemos en Rosé es un recordatorio de que, incluso en los días más oscuros, siempre hay una
                    luz esperando encenderse.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Versión escritorio */}
      <div className="hidden lg:block relative z-20 py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end relative">
            {/* QUIÉN ESTÁ DETRÁS */}
            <div className="relative z-20 lg:col-span-1 pb-0">
              <div className="w-[90%] max-w-sm lg:max-w-[320px] ml-0 lg:-ml-16">
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#1c1c1c" }}>
                  ¿Quién está detrás?
                </h3>
                <p className="leading-relaxed text-base" style={{ color: "#1c1c1c" }}>
                  Mi nombre es Elizabeth, y me gusta que me digan Eli. Rosé Candle Co. nació de una mezcla entre pasión
                  por los aromas, interés por el diseño sostenible y el deseo de emprender con propósito. Cada producto
                  que creo es parte de mi historia y mi compromiso con una forma de vida más consciente y armoniosa.
                </p>
              </div>
            </div>

            {/* IMAGEN */}
            <div className="relative z-10 lg:col-span-1 flex justify-center">
              <img
                src={ElisHistory}
                alt="Persona"
                className="w-auto object-contain drop-shadow-2xl scale-[1.5] lg:scale-[1.7]"
              />
            </div>

            {/* HISTORIA */}
            <div className="relative z-20 lg:col-span-1 flex justify-end pb-36 -mt-2 lg:-mt-2 pl-20 ml-20">
              <div className="w-[90%] max-w-sm lg:max-w-[320px] mr-32 lg:-mr-32">
                <h3 className="text-2xl font-bold mb-4 text-right" style={{ color: "#1c1c1c" }}>
                  Historia
                </h3>
                <div className="space-y-4 leading-relaxed text-base text-right" style={{ color: "#1c1c1c" }}>
                  <p>
                    Rosé nació en un momento difícil, cuando la ansiedad y la incertidumbre parecían apagarlo todo.
                    Descubrir el mundo de las velas de cera de soja encendió en mí una chispa que no sabía que
                    necesitaba. Crear con mis manos se volvió sanador, una forma de volver a encontrar la luz.
                  </p>
                  <p>
                    El nombre honra mi historia y a las mujeres fuertes de mi familia, todas llamadas Rosa. Hoy, cada
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
