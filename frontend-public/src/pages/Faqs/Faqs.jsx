import React, { useState, useEffect } from "react";
import {
  CiShop,
  CiShoppingTag,
  CiCreditCard1,
  CiDeliveryTruck,
} from "react-icons/ci";

import Header from "../../global/components/Header.jsx"; // encabezado
import Question from "./components/Question.jsx"; // preguntas

import Star from "../../assets/star.svg?react"; // circulos del fondo
import GradientBg from "../../global/components/GradientBg.jsx";

const Faqs = () => {
  const [activeTab, setActiveTab] = useState("general");  // Establecer por defecto preguntas generales

  /* Cambiar titulo de la pagina */
  useEffect(() => {
    document.title = "Preguntas frecuentes | Rosé Candle Co.";
  }, []);

  return (
    <div className="relative h-screen bg-[#F9F7F3] mx-12 mt-36">
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

      {/* Navegación entre preguntas */}
      <div className="flex flex-row items-center justify-center gap-12 -mb-4 mt-16 w-full font-[lora] font-bold text-[#1c1c1c] text-lg">
        <button
          className="px-2 py-2 text-gray-600 hover:text-gray-700 focus:outline-none focus:border-b-2 focus:border-[#1c1c1c] focus:text-[#1c1c1c]"
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          className="px-2 py-2 text-gray-600 hover:text-gray-700 focus:outline-none focus:border-b-2 focus:border-[#1c1c1c] focus:text-[#1c1c1c]"
          onClick={() => {
            setActiveTab("products");
          }}
        >
          Productos
        </button>
        <button
          className="px-2 py-2 text-gray-600 hover:text-gray-700 focus:outline-none focus:border-b-2 focus:border-[#1c1c1c] focus:text-[#1c1c1c]"
          onClick={() => setActiveTab("order")}
        >
          Pedidos
        </button>
        <button
          className="px-2 py-2 text-gray-600 hover:text-gray-700 focus:outline-none focus:border-b-2 focus:border-[#1c1c1c] focus:text-[#1c1c1c]"
          onClick={() => setActiveTab("candles")}
        >
          Velas
        </button>
      </div>

      <div>
        {activeTab === "general" && (
          <div>
            {/* Preguntas Generales */}
            <div className="px-80 mt-20">
              <Question
                Icon={CiShop}
                question="¿Tienen tienda física en la que los pueda encontrar?"
                answer="Actualmente, no contamos con una tienda física. Operamos exclusivamente a través de nuestra tienda en línea, 
                donde puedes realizar tus pedidos de manera segura y cómoda desde cualquier lugar. Estamos trabajando para abrir 
                nuestro primer punto de venta físico en el futuro, y lo anunciaremos a través de nuestras redes sociales y 
                sitio web cuando esté disponible."
              />
            </div>
            <div className="px-80 mt-20">
              <Question
                Icon={CiShoppingTag}
                question="¿Dónde puedo ver su catálogo?"
                answer="Nuestro catálogo completo está disponible en nuestro sitio web y redes sociales. Allí podrás conocer nuestras 
                colecciones, descripciones detalladas de cada aroma, presentaciones disponibles y productos especiales por temporada. 
                También publicamos contenido útil como consejos de uso, lanzamientos y promociones exclusivas."
              />
            </div>
            <div className="px-80 mt-20">
              <Question
                Icon={CiCreditCard1}
                question="¿Qué formas de pago aceptan?"
                answer="Ofrecemos un pago en línea seguro: Puedes pagar directamente desde nuestra tienda en línea utilizando métodos
                digitales como tarjeta de débito, crédito o transferencias a través de plataformas confiables. Nuestra pasarela de 
                pago está protegida para garantizar la seguridad de tu información."
              />
            </div>
            <div className="px-80 mt-20">
              <Question
                Icon={CiDeliveryTruck}
                question="¿Realizan envíos?"
                answer="Sí, hacemos envíos a todo el país mediante una empresa de mensajería confiable. El servicio entrega directamente 
                en la dirección que nos proporciones al realizar tu compra. El costo del envío varía dependiendo de la zona y se 
                confirma al momento de completar el pedido. Ofrecemos entregas seguras y seguimiento de cada pedido hasta su destino."
              />
            </div>
          </div>
        )}
        {activeTab === "products" && (
          <div>
            {/* Preguntas Productos */}
            <div className="px-80 mt-20">
              <Question
                Icon={CiShop}
                question="¿Tienen tienda física en la que los pueda encontrar?"
                answer="Actualmente, no contamos con una tienda física. Operamos exclusivamente a través de nuestra tienda en línea, 
                donde puedes realizar tus pedidos de manera segura y cómoda desde cualquier lugar. Estamos trabajando para abrir 
                nuestro primer punto de venta físico en el futuro, y lo anunciaremos a través de nuestras redes sociales y 
                sitio web cuando esté disponible."
              />
            </div>
            <div className="px-80 mt-20">
              <Question
                Icon={CiShoppingTag}
                question="¿Dónde puedo ver su catálogo?"
                answer="Nuestro catálogo completo está disponible en nuestro sitio web y redes sociales. Allí podrás conocer nuestras 
                colecciones, descripciones detalladas de cada aroma, presentaciones disponibles y productos especiales por temporada. 
                También publicamos contenido útil como consejos de uso, lanzamientos y promociones exclusivas."
              />
            </div>
            <div className="px-80 mt-20">
              <Question
                Icon={CiCreditCard1}
                question="¿Qué formas de pago aceptan?"
                answer="Ofrecemos un pago en línea seguro: Puedes pagar directamente desde nuestra tienda en línea utilizando métodos
                digitales como tarjeta de débito, crédito o transferencias a través de plataformas confiables. Nuestra pasarela de 
                pago está protegida para garantizar la seguridad de tu información."
              />
            </div>
            <div className="px-80 mt-20">
              <Question
                Icon={CiDeliveryTruck}
                question="¿Realizan envíos?"
                answer="Sí, hacemos envíos a todo el país mediante una empresa de mensajería confiable. El servicio entrega directamente 
                en la dirección que nos proporciones al realizar tu compra. El costo del envío varía dependiendo de la zona y se 
                confirma al momento de completar el pedido. Ofrecemos entregas seguras y seguimiento de cada pedido hasta su destino."
              />
            </div>
          </div>
        )}
        {/* Agregar lógica para las demás pestañas */}
      </div>
    </div>
  );
};

export default Faqs;