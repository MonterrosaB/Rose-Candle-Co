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
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Nuestros valores,</h3>
        <h3 className="text-3xl font-bold">Nuestra esencia</h3>
      </div>

      <div className="relative min-h-[480px] flex flex-col gap-6 overflow-visible">

        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            zIndex: 0,
            transform: "translate(-40%, -148%) scale(1.5)",
            transformOrigin: "top left",
          }}
        >
          <OrbitedCircle size="medium" />
        </div>

        {/* Cards */}
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
