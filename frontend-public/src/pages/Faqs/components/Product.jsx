import React from "react";
import Question from "./Question";
import { AiOutlineFire, AiOutlineCar, AiOutlineProduct } from "react-icons/ai";
import { IoRoseOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";

const Products = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-32 xl:px-64 mt-10">
      <Question
        Icon={AiOutlineFire}
        question="¿Qué debo hacer para que mi vela se consuma correctamente y no forme túneles?"
        answer="Para asegurar una quema uniforme de tu vela, te recomendamos encenderla durante un mínimo de 2 a 3 horas en su primer uso, o hasta que la superficie completa de la cera se haya derretido por igual. Esto evitará que se forme un túnel, lo cual ocurre cuando la cera se derrite solo en el centro, desperdiciando producto. Con nuestras velas de cera de soja es normal que algo de cera quede temporalmente en los bordes del recipiente, pero esta se derretirá con el uso continuo."
      />
      <Question
        Icon={IoRoseOutline}
        question="¿Qué tipos de aromas tienen disponibles en sus productos?"
        answer="En Rosé Candle Co ofrecemos una variedad cuidadosamente seleccionada de aromas diseñados para adaptarse a distintos gustos y ocasiones. Nuestros aromas se dividen en cuatro categorías principales: cítricos, amaderados, dulces y florales. Cada categoría incluye fragancias únicas y envolventes que transforman cualquier espacio en una experiencia sensorial agradable. Además, constantemente estamos explorando nuevas combinaciones para nuestras colecciones de temporada."
      />
      <Question
        Icon={AiOutlineCar}
        question="¿Qué otros productos ofrecen además de velas?"
        answer="En Rosé Candle Co también ofrecemos una gama de productos complementarios para aromatizar tus espacios de manera práctica y elegante. Entre ellos encontrarás: Wax Melts, difusores para carro y Wax Sachets."
      />
      <Question
        Icon={BsPeople}
        question="¿Cómo puedo elegir la vela que mejor se adapte a mí?"
        answer="Contamos con un catálogo en línea en el que puedes conocer nuestras colecciones y aromas disponibles. También puedes visitar nuestras redes sociales para ver recomendaciones, reseñas y lanzamientos especiales. Algunas de nuestras velas más populares incluyen: Lavanda, Love Spell, Spark, Treasure, Tranquility, Ocean Breeze, GingerBread Cookie e Into the Woods. Te invitamos a descubrir cuál se adapta mejor a tu estilo o al ambiente que deseas crear."
      />
      <Question
        Icon={AiOutlineProduct}
        question="¿Qué tipos de velas tienen disponibles?"
        answer="Actualmente contamos con velas artesanales en presentaciones de 9 onzas y 4 onzas, ideales tanto para uso personal como para regalar. Además, de forma temporal, lanzamos velas de figuras especiales dentro de nuestras colecciones temáticas como San Valentín, Día de la Madre, Colección Hygge y Navidad. Cada vela está hecha a mano con cera de soja 100% natural y fragancias de alta calidad, lo que garantiza una combustión limpia y duradera."
      />
    </div>
  );
};

export default Products;
