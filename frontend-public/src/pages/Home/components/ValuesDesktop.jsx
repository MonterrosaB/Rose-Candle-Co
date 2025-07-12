import OrbitedCircle from "../../../global/components/OrbitedCircle.jsx";

const ValuesDesktop = () => {
  return (
    <div className="relative">

      <div className="absolute -bottom-32 -left-32 scale-[2.5]">
        <OrbitedCircle size="large" />
      </div>

      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-2">Nuestros valores,</h3>
        <h3 className="text-4xl font-bold">Nuestra esencia</h3>
      </div>

      <div className="grid grid-cols-3 gap-12 mb-16 max-w-4xl mx-auto">
        <div className="text-left">
          <h4 className="text-lg font-medium text-gray-800">
            Bienestar y <br /> conexión
          </h4>
        </div>
        <div className="text-center">
          <h4 className="text-lg font-medium text-gray-800">
            Amor por la <br /> naturaleza
          </h4>
        </div>
        <div className="text-right">
          <h4 className="text-lg font-medium text-gray-800">
            Encender y <br /> compartir la luz
          </h4>
        </div>
      </div>

      <div className="flex justify-center gap-16">
        <div className="text-center">
          <h4 className="text-lg font-medium text-gray-800">
            Autenticidad <br /> y dedicación
          </h4>
        </div>
        <div className="text-center">
          <h4 className="text-lg font-medium text-gray-800">Sostenibilidad</h4>
        </div>
      </div>
    </div>
  );
};

export default ValuesDesktop;
