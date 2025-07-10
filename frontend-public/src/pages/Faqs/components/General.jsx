// Componente para las preguntas frecuentes generales
import React from "react";
import Question from "./Question"; // componente de preguntas

import { AiOutlineShop } from 'react-icons/ai';
import { IoPricetagOutline } from 'react-icons/io5';
import { FaRegCreditCard } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';

const General = () => {
  return (
    <div>
      <div className="px-80 mt-20">
        <Question
          Icon={AiOutlineShop}
          question="¿Tienen tienda física en la que los pueda encontrar?"
          answer="Actualmente no contamos con una tienda física. Operamos exclusivamente a través de nuestra tienda en línea, 
                donde puedes realizar tus pedidos de manera segura y cómoda desde cualquier lugar. Estamos trabajando para abrir 
                nuestro primer punto de venta físico en el futuro, y lo anunciaremos a través de nuestras redes sociales y 
                sitio web cuando esté disponible."
        />
      </div>
      <div className="px-80 mt-20">
        <Question
          Icon={IoPricetagOutline}
          question="¿Dónde puedo ver su catálogo?"
          answer="Nuestro catálogo completo está disponible en nuestro sitio web y redes sociales. Allí podrás conocer nuestras 
                colecciones, descripciones detalladas de cada aroma, presentaciones disponibles y productos especiales por temporada. 
                También publicamos contenido útil como consejos de uso, lanzamientos y promociones exclusivas."
        />
      </div>
      <div className="px-80 mt-20">
        <Question
          Icon={FaRegCreditCard}
          question="¿Qué formas de pago aceptan?"
          answer="Ofrecemos un pago en línea seguro: Puedes pagar directamente desde nuestra tienda en línea utilizando métodos
                digitales como tarjeta de débito, crédito o transferencias a través de plataformas confiables. Nuestra pasarela de 
                pago está protegida para garantizar la seguridad de tu información."
        />
      </div>
      <div className="px-80 mt-20">
        <Question
          Icon={TbTruckDelivery}
          question="¿Realizan envíos?"
          answer="Sí, hacemos envíos a todo el país mediante una empresa de mensajería confiable. El servicio entrega directamente 
                en la dirección que nos proporciones al realizar tu compra. El costo del envío varía dependiendo de la zona y se 
                confirma al momento de completar el pedido. Ofrecemos entregas seguras y seguimiento de cada pedido hasta su destino."
        />
      </div>
    </div>
  );
};

export default General;