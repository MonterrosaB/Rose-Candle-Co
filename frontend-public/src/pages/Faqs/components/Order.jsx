import React from "react";
import Question from "./Question";
import { MdOutlineCalendarToday } from "react-icons/md";
import { BiParty } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const Order = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-32 xl:px-64 mt-10">
      <Question
        Icon={MdOutlineCalendarToday}
        question="¿Con cuántos días de anticipación debo realizar mi pedido?"
        answer="Te recomendamos realizar tu pedido con al menos 3 a 5 días de anticipación, dependiendo de la cantidad de artículos que desees adquirir. Si estás planificando una compra grande, especialmente para eventos o fechas especiales, es mejor dar más tiempo para asegurar que podamos procesar tu pedido correctamente y asegurarnos de que tengas todo listo a tiempo."
      />
      <Question
        Icon={BiParty}
        question="¿Puedo solicitar un pedido grande para algún evento?"
        answer="¡Claro! Estamos encantados de poder ayudarte con pedidos grandes para eventos especiales. Para pedidos de este tipo, necesitamos un mínimo de 10 días de anticipación para asegurarnos de poder cumplir con tus expectativas. A partir de 12 unidades, podemos ofrecerte un descuento especial por volumen, ya que trabajamos con precios mayoristas. Además, realizamos cotizaciones personalizadas según tus necesidades específicas, lo que nos permite ajustar los productos y precios a lo que más te convenga para tu evento."
      />
      <Question
        Icon={RiMoneyDollarCircleLine}
        question="¿Solicitan algún tipo de anticipo?"
        answer="Sí, solicitamos un anticipo para pedidos mayores a $25.00 y para aquellos pedidos personalizados, de manera que podamos asegurar la disponibilidad de los productos y garantizar que se cumplan los tiempos de entrega. El anticipo se aplica al total del pedido y es una práctica estándar para garantizar que se tomen las medidas necesarias para la preparación de tu compra. El saldo restante se puede abonar antes o al momento de la entrega, según lo acordado."
      />
    </div>
  );
};

export default Order;