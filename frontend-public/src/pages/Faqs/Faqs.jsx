// Se importan librerias
import React, { useState, useEffect } from "react";
import { CiShop } from "react-icons/ci";

import Header from "../../global/components/Header.jsx"; // encabezado
import Question from "./components/Question.jsx"; // preguntas

import Star from "../../assets/star.svg?react"; // circulos del fondo
import GradientBg from "../../global/components/GradientBg.jsx";

const Faqs = () => {
  /* Cambiar titulo de la pagina */
  useEffect(() => {
    document.title = "Preguntas frecuentes | Rosé Candle Co.";
  }, []);

  return (
    <div className="relative overflow-hidden h-screen bg-[#F9F7F3] mx-12 mt-16">
      {/* Elementos del fondo */}

      {/* Estrellas de fondo */}

      {/* Encabezado */}
      <Header
        title={
          <>
            <span className="font-normal">Preguntas </span>
            <span className="font-bold">frecuentes</span>
          </>
        }
        subtitle={
          <>
            <span className="font-normal">En </span>
            <span className="font-bold">Rosé Candle Co., </span>
            <span className="font-normal">
              queremos que tu experiencia con nosotros sea lo más fluida <br />y
              agradable posible. Aquí encontrarás respuestas a las preguntas más
              comunes. <br />
              Si tienes alguna duda adicional, no dudes en contactarnos.
            </span>
          </>
        }
      />

      {/* Preguntas Generales */}
      <div className="px-80 mt-20">
        <Question
          Icon={CiShop}
          question="¿Tienen tienda física en la que los pueda encontrar?"
          answer="Por el momento solo contamos con tienda en línea, pero próximamente esperamos tener un punto físico."
        />
      </div>
    </div>
  );
};

export default Faqs;
