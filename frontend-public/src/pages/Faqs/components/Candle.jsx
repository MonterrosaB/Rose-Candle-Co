import React from "react";
import Question from "./Question";
import { BsCursor } from "react-icons/bs";
import { AiOutlineProduct } from "react-icons/ai";
import { RiCandleLine } from "react-icons/ri";

const Candle = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-32 xl:px-64 mt-10">
      <Question
        Icon={BsCursor}
        question="¿Cómo puedo elegir mi candela?"
        answer="Elegir la vela perfecta para ti es una experiencia única. Contamos con un catálogo de colecciones que puedes consultar en nuestro sitio web y redes sociales. Algunas de nuestras velas más populares incluyen aromas como Lavanda, Love Spell, Spark, Treasure, Tranquility, Ocean Breeze, Gingerbread Cookie, y Into the Woods. Cada vela está cuidadosamente elaborada con cera de soja 100% natural y fragancias exclusivas. Te recomendamos que elijas según el ambiente que deseas crear: si buscas relajación, aromas como Lavanda y Tranquility son ideales; para crear una atmósfera acogedora y cálida, te sugerimos Gingerbread Cookie o Treasure. Visita nuestra página para obtener más detalles sobre cada aroma y encontrar el que más te guste."
      />
      <Question
        Icon={AiOutlineProduct}
        question="¿Qué tipos de presentaciones de Velas disponen?"
        answer="En Rosé Candle Co. ofrecemos dos tamaños de velas: 9 onzas y 4 onzas. Ambas opciones están disponibles en una variedad de aromas, ideales tanto para uso personal como para regalar. Además, de manera temporal, contamos con velas de figuras que están disponibles en colecciones especiales como San Valentín, Día de la Madre, Colección Hygge y Navidad. Estas velas de figura son perfectas para ocasiones especiales y ofrecen un toque único y decorativo a cualquier espacio. Ya sea que elijas un tamaño grande o pequeño, nuestras velas están hechas con cera de soja de alta calidad, lo que garantiza una combustión limpia y duradera."
      />
      <Question
        Icon={RiCandleLine}
        question="¿Cómo puedo evitar que mi vela forme un túnel?"
        answer="Para evitar que tu vela forme un túnel, es esencial darle un uso adecuado desde el primer encendido. Te recomendamos que dejes la vela encendida entre 2 y 3 horas o hasta que la cera derretida alcance los bordes del recipiente. Esto permitirá que la cera se derrita de manera uniforme. Con las velas de cera de soja, es normal que un poco de cera quede adherida a las paredes del vaso durante las primeras veces de uso, pero con el tiempo, conforme la vela se consume, esta cera se derretirá y se eliminará de los bordes. Siguiendo estos consejos, te aseguramos una experiencia de quema limpia y uniforme durante toda la vida útil de la vela."
      />
    </div>
  );
};

export default Candle;