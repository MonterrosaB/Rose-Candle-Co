import OrbitedCircle from "../../../global/components/OrbitedCircle.jsx";

const valores = [
  "Bienestar y conexión",
  "Amor por la naturaleza",
  "Encender y compartir la luz",
  "Autenticidad y dedicación",
  "Sostenibilidad",
];

const ValuesMobile = () => {
  return (
    <div className="relative max-w-xs mx-auto p-4 overflow-visible">
      {/* Título siempre en dos líneas */}
      <div className="text-center mb-16">
        <h3
          className="text-3xl font-italic mb-0"
          style={{ fontFamily: "Lora", fontStyle: "italic" }}
        >
          Nuestros Valores
        </h3>
        <h3
          className="text-3xl font-semibold"
          style={{ fontFamily: "Lora" }}
        >
          Nuestra Esencia
        </h3>
      </div>

      <div className="relative min-h-[480px] flex flex-col gap-6 overflow-visible">
        {/* Orbita decorativa parcial en la esquina superior izquierda */}
        <div
          className="absolute -top-12 -left-12 pointer-events-none"
          style={{
            zIndex: 0,
            width: "120px",
            height: "120px",
            overflow: "hidden",
          }}
        >
          <OrbitedCircle size="medium" />
        </div>

        {/* Valores */}
        {valores.map((valor, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md rounded-xl px-4 py-6 relative z-10 text-center text-base font-medium text-gray-800"
          >
            {valor}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuesMobile;
