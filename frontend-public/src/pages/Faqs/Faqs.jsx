import React, { useState, useEffect } from "react";
import Header from "../../global/components/Header.jsx";
import GeneralQuestions from "./components/General.jsx";
import ProductsQuestions from "./components/Product.jsx";
import OrdersQuestions from "./components/Order.jsx";
import CandlesQuestions from "./components/Candle.jsx";

const Faqs = () => {
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    document.title = "Preguntas frecuentes | Rosé Candle Co.";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F9F7F3] mx-4 sm:mx-8 mt-30">
      <Header
        title={
          <div className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            <span className="font-normal">Preguntas </span>
            <span className="font-bold">frecuentes</span>
          </div>
        }
        subtitle={
          <p className="text-sm sm:text-base md:text-lg text-center leading-relaxed text-[#1c1c1c] mt-4">
            En <span className="font-bold">Rosé Candle Co.</span> queremos que tu experiencia con nosotros sea lo más fluida y agradable posible. Aquí encontrarás respuestas a las preguntas más comunes. Si tienes alguna duda adicional, no dudes en contactarnos.
          </p>
        }
      />

      {/* Navegación */}
      <div className="flex flex-wrap justify-center gap-6 mt-12 font-[lora] font-bold text-[#1c1c1c] text-base sm:text-lg">
        {[
          { id: "general", label: "General" },
          { id: "products", label: "Productos" },
          { id: "order", label: "Pedidos" },
          { id: "candles", label: "Velas" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-2 py-2 focus:outline-none transition-all duration-300 ${activeTab === tab.id
              ? "text-[#1c1c1c] border-b-2 border-[#1c1c1c]"
              : "text-gray-600 hover:text-[#1c1c1c]"
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col mt-10">
        {activeTab === "general" && <GeneralQuestions />}
        {activeTab === "products" && <ProductsQuestions />}
        {activeTab === "order" && <OrdersQuestions />}
        {activeTab === "candles" && <CandlesQuestions />}
      </div>
    </div>
  );
};

export default Faqs;
