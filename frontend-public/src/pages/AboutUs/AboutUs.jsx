import React, { useEffect } from "react";

import Historia from "./components/History.jsx";
import Productos from "./components/ProductSection.jsx";
import MisionVision from "./components/MissionAndVision";
import Valores from "./components/Values.jsx";
import Hero from "./components/Hero.jsx";

const AboutUs = () => {
  useEffect(() => {
    document.title = "Sobre Nosotros | Rosé Candle Co.";
  }, []);

  return (
    <div className="relative bg-[#F9F7F3] mt-15">

      <Hero />
      <Historia />
      <Productos />
      <MisionVision />
      <Valores />
    </div>
  );
};

export default AboutUs;