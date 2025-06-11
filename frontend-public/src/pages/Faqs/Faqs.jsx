// Se importan librerias
import React, { useEffect, useState } from "react";

import Star from '../../assets/star.svg?react'; // circulos del fondo
import GradientBg from '../../global/components/GradientBg.jsx' 

const Faqs = () => {
    return (
    <div className="relative overflow-hidden flex items-center justify-center h-screen bg-[#F0ECE6]">
        {/* Elementos del fondo*/ } 

        {/* Degradado superior*/ }
        <GradientBg />
        
        {/* Círculo superior derecho */}
        <div className="absolute -top-90 -right-50 w-[500px] h-[500px] rotate-[20deg] z-[10]">
            <Star />
        </div>

        {/* Círculo inferior izquierdo */}
        <div className="absolute -bottom-10 -left-60 w-[500px] h-[500px] rotate-[-5deg]">
            <Star />
        </div>

        <h1>Preguntas Frecuentes</h1>
    </div>
  );
};

export default Faqs;