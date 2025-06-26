import OrbitedCircle from "../../../global/components/OrbitedCircle.jsx";

const ValuesDesktop = () => {
  return (
    <div className="relative px-12 py-20">
      <div className="absolute -bottom-40 -left-40 scale-[3]">
        <OrbitedCircle size="large" />
      </div>

      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold mb-3">Nuestros valores,</h3>
        <h3 className="text-5xl font-bold">Nuestra esencia</h3>
      </div>

      <div className="grid grid-cols-3 gap-20 mb-20 max-w-5xl mx-auto">
        <div className="text-left">
          <h4 className="text-xl font-semibold text-gray-800">
            Bienestar y <br /> conexión
          </h4>
        </div>
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-800">
            Amor por la <br /> naturaleza
          </h4>
        </div>
        <div className="text-right">
          <h4 className="text-xl font-semibold text-gray-800">
            Encender y <br /> compartir la luz
          </h4>
        </div>
      </div>

      <div className="flex justify-center gap-24">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-800">
            Autenticidad <br /> y dedicación
          </h4>
        </div>
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-800">Sostenibilidad</h4>
        </div>
      </div>
    </div>
  );
};

export default ValuesDesktop;
