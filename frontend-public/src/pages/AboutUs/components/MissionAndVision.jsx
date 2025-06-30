import Mission from "../../../assets/Mission.jpg";
import VisionLeft from "../../../assets/VisionLeft.png";
import VisionRight from "../../../assets/VisionRight.png";

const MissionAndVision = () => {
  return (
    <>
      <section className="bg-[#e8dcc0] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="flex items-center justify-center p-12 lg:p-16">
            <div className="space-y-8 max-w-lg">
              <h3 className="text-4xl font-light text-gray-800">Misión</h3>
              <div className="space-y-6 text-gray-700">
                <p className="text-base leading-relaxed">
                  Crear productos aromáticos sostenibles que no solo iluminen luz y tranquilidad a cada espacio, sino
                  que también inspiren a las personas a encontrar su propia luz interior y conectar con su esencia más
                  profunda.
                </p>
                <p className="text-base leading-relaxed">
                  A través de velas hechas con amor y respeto por la naturaleza, buscamos transmitir momentos de paz y
                  serenidad, creando experiencias sensoriales que eleven el alma y despierten la conciencia hacia
                  adentro.
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[600px]">
            <img
              src={Mission}
              alt="Velas aromáticas con pétalos rosados"
              className="w-full object-cover rounded-2xl"
              style={{ maxHeight: '600px' }}
            />
            <div className="absolute bottom-12 right-12 w-12 h-12 bg-pink-200 rounded-full opacity-70"></div>
            <div className="absolute bottom-6 right-6 w-8 h-8 bg-pink-300 rounded-full opacity-50"></div>
            <div className="absolute bottom-16 right-24 w-6 h-6 bg-pink-400 rounded-full opacity-60"></div>
            <div className="absolute top-12 left-12 w-10 h-10 bg-pink-200 rounded-full opacity-50"></div>
            <div className="absolute top-8 left-6 w-6 h-6 bg-pink-300 rounded-full opacity-40"></div>
          </div>
        </div>
      </section>

      <section className="bg-[#d4c4a0] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          <div className="relative h-full min-h-[600px] -ml-12 hidden lg:block">
            <img
              src={VisionLeft}
              alt="Vela con plantas aromáticas verdes"
              className="w-full object-cover h-[600px]"
            />
            <div className="absolute top-12 left-8 w-16 h-16 bg-green-200 rounded-full opacity-40"></div>
            <div className="absolute top-6 left-16 w-8 h-8 bg-green-300 rounded-full opacity-50"></div>
            <div className="absolute bottom-12 left-6 w-10 h-10 bg-green-200 rounded-full opacity-60"></div>
          </div>

          <div className="flex items-center justify-center p-12 lg:p-16">
            <div className="space-y-8 max-w-lg text-center">
              <h3 className="text-4xl font-light text-gray-800">Visión</h3>
              <div className="space-y-6 text-gray-700">
                <p className="text-base leading-relaxed">
                  Ser una marca referente en el mundo de los productos aromáticos conscientes, reconocida por su
                  dedicación al bienestar integral de las personas y el cuidado del medio ambiente.
                </p>
                <p className="text-base leading-relaxed">
                  Aspiramos a crear una comunidad global de seres conscientes que valoren la belleza, la tranquilidad y
                  el crecimiento personal a través de nuestros productos, contribuyendo a construir una conciencia más
                  consciente, presente y armonizada con el entorno.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-[600px] -mr-12">
            <div className="relative h-[400px] -mr-12">
              <img
                src={VisionRight}
                alt="Productos aromáticos y cosméticos"
                className="w-full object-cover h-[600px]"
              />
            </div>
            <div className="absolute top-16 right-8 w-12 h-12 bg-amber-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-20 right-12 w-8 h-8 bg-amber-300 rounded-full opacity-40"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MissionAndVision;
