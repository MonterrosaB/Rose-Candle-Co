import React, { useState, useEffect } from "react";
import {
  CiShop,
  CiShoppingTag,
  CiCreditCard1,
  CiDeliveryTruck,
} from "react-icons/ci";

import Header from "../../global/components/Header.jsx"; // encabezado
import GeneralQuestions from "./components/General.jsx"; // Componente de preguntas generales
import ProductsQuestions from "./components/Product.jsx"; // Componente de preguntas de productos
import OrdersQuestions from "./components/Order.jsx"; // Componente de preguntas de pedidos
import CandlesQuestions from "./components/Candle.jsx"; // Componente de preguntas de velas

import Star from "../../assets/star.svg?react"; // circulos del fondo
import GradientBg from "../../global/components/GradientBg.jsx"; // degradado

const Faqs = () => {
  const [activeTab, setActiveTab] = useState("general"); // Establecer por defecto preguntas generales

  /* Cambiar título de la página */
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
              Queremos que tu experiencia con nosotros sea lo más fluida <br />y
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
          className={`px-2 py-2 cursor-pointer focus:outline-none focus:border-b-2 focus:border-[#1c1c1c] ${
            activeTab === "general"
              ? "text-[#1c1c1c] border-b-2 border-[#1c1c1c]"
              : "text-gray-600 hover:text-[#1c1c1c]"
          }`}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          className={`px-2 py-2 cursor-pointer focus:outline-none focus:border-b-2 focus:border-[#1c1c1c] ${
            activeTab === "products"
              ? "text-[#1c1c1c] border-b-2 border-[#1c1c1c]"
              : "text-gray-600 hover:text-[#1c1c1c]"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Productos
        </button>
        <button
          className={`px-2 py-2 cursor-pointer focus:outline-none focus:border-b-2 focus:border-[#1c1c1c] ${
            activeTab === "order"
              ? "text-[#1c1c1c] border-b-2 border-[#1c1c1c]"
              : "text-gray-600 hover:text-[#1c1c1c]"
          }`}
          onClick={() => setActiveTab("order")}
        >
          Pedidos
        </button>
        <button
          className={`px-2 py-2 cursor-pointer focus:outline-none focus:border-b-2 focus:border-[#1c1c1c] ${
            activeTab === "candles"
              ? "text-[#1c1c1c] border-b-2 border-[#1c1c1c]"
              : "text-gray-600 hover:text-[#1c1c1c]"
          }`}
          onClick={() => setActiveTab("candles")}
        >
          Velas
        </button>
      </div>

      <div className="flex flex-col">
        {activeTab === "general" && (
          <div className="flex-grow">
            {/* Preguntas Generales */}
            <GeneralQuestions />
          </div>
        )}
        {activeTab === "products" && (
          <div className="flex-grow">
            {/* Preguntas Productos */}
            <ProductsQuestions />
          </div>
        )}
        {activeTab === "order" && (
          <div className="flex-grow">
            {/* Preguntas Pedidos */}
            <OrdersQuestions />
          </div>
        )}
        {activeTab === "candles" && (
          <div className="flex-grow">
            {/* Preguntas Velas */}
            <CandlesQuestions />
          </div>
        )}
      </div>
    </div>
  );
};

export default Faqs;
