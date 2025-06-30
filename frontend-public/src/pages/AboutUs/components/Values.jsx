import { useEffect, useState } from "react";
import ValuesDesktop from "../components/ValuesDesktop";
import ValuesMobile from "../components/ValuesMobile";

const Values = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta si está en móvil al montar el componente
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Primera detección
    window.addEventListener("resize", handleResize); // Escucha cambios

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative bg-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {isMobile ? <ValuesMobile /> : <ValuesDesktop />}
    </section>
  );
};

export default Values;
