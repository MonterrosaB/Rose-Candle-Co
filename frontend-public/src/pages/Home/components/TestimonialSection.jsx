import comillas from "../../../assets/Comillas.svg";
import Testimonial from "../../../assets/Testimonial.svg";

import { useState, useEffect } from "react";

const TestimonialSection = () => {
  const [currentOpinion, setCurrentOpinion] = useState(0);

  const opinions = [
    {
      id: 1,
      text:
        "La compra fue súper sencilla, el sitio web es claro y me permitió elegir la esencia que más me gustaba sin complicaciones.",
      highlight:
        "Lo que más me sorprendió fue el empaque: venía muy bien cuidado y con tanto detalle, que sentí que estaba abriendo un regalo. Desde el primer momento, la vela llenó mi sala de un aroma suave y relajante.",
      conclusion: "Se nota que es un producto hecho con dedicación.",
      author: "Rodrigo Monterrosa",
      image: Testimonial,
    },
    {
      id: 2,
      text:
        "Increíble calidad y atención al detalle. El aroma perdura por horas y crea un ambiente perfecto para relajarse.",
      highlight:
        "El packaging es simplemente hermoso, cada elemento está pensado para crear una experiencia única. La vela arde de manera uniforme y el aroma es consistente.",
      conclusion: "Definitivamente volveré a comprar.",
      author: "María González",
      image: Testimonial,
    },
    {
      id: 3,
      text:
        "Excelente servicio al cliente y producto de primera calidad. La entrega fue rápida y todo llegó en perfecto estado.",
      highlight:
        "Me encanta cómo la fragancia se distribuye por toda la habitación sin ser abrumadora. La duración es excepcional y el diseño es elegante.",
      conclusion: "Superó todas mis expectativas.",
      author: "Carlos Mendoza",
      image: Testimonial,
    },
    {
      id: 4,
      text:
        "Una experiencia de compra fantástica desde el inicio. La página web es intuitiva y el proceso de pago muy seguro.",
      highlight:
        "La vela llegó perfectamente empacada con detalles que demuestran el cuidado puesto en cada pedido. El aroma es sofisticado y duradero.",
      conclusion: "Un producto que realmente vale la pena.",
      author: "Ana Sofía Ruiz",
      image: Testimonial,
    },
    {
      id: 5,
      text:
        "Quedé impresionada con la calidad del producto. Es evidente que hay mucho amor y dedicación en cada vela.",
      highlight:
        "El aroma es delicioso y natural, nada artificial. La presentación es impecable y el tiempo de combustión es excelente.",
      conclusion: "Se ha convertido en mi marca favorita.",
      author: "Isabella Torres",
      image: Testimonial,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOpinion((prev) => (prev + 1) % opinions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [opinions.length]);

  const nextOpinion = () => {
    setCurrentOpinion((prev) => (prev + 1) % opinions.length);
  };

  // Manejo seguro para current
  const current = opinions[currentOpinion] || {
    image: "/placeholder.svg",
    text: "",
    highlight: "",
    conclusion: "",
    author: "",
  };

  return (
    <div className="bg-[#F2EBD9] min-h-screen flex items-center justify-center p-4">
      <div className="max-w-7xl w-full flex flex-col md:flex-row h-auto md:h-screen">
        {/* Imagen de la vela */}
        <div className="w-full md:w-1/2 h-64 md:h-full">
          <img
            src={current.image || "/placeholder.svg"}
            alt="Producto"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Contenido de la opinión */}
        <div className="w-full md:w-1/2 flex flex-col justify-end px-6 md:px-20 py-10 md:pb-24 relative">
          {/* Comillas decorativas SVG */}
          <div className="hidden md:block absolute -top-8 left-16">
            <img src={comillas} alt="Comillas decorativas" />
          </div>

          {/* Texto de la opinión */}
          <div className="relative z-10 space-y-6 max-w-md md:max-w-none mx-auto md:mx-0 mt-4 md:mt-8">
            <p className="text-[#2c2c2c] text-base leading-relaxed font-normal">
              {current.text}
            </p>

            <p className="text-[#2c2c2c] text-base leading-relaxed font-normal">
              {current.highlight}
            </p>

            <p className="text-[#2c2c2c] text-base leading-relaxed font-normal">
              {current.conclusion}
            </p>


            <div className="flex items-center justify-between pt-6 mt-8">
              <h3 className="text-[#2c2c2c] text-lg font-bold underline decoration-2 underline-offset-4">
                {current.author}
              </h3>
              <button
                onClick={nextOpinion}
                className="hover:bg-gray-200 p-2 rounded-full transition-colors duration-200"
                aria-label="Siguiente opinión"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2c2c2c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
