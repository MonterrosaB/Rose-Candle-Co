import OrbitedCircle from "../../../global/components/OrbitedCircle.jsx";

const ValuesDesktop = () => {
  return (
    <div className="relative">
      {/* Círculo decorativo */}
      <div className="absolute -bottom-32 -left-32 scale-[2.5]">
        <OrbitedCircle size="large" />
      </div>

      {/* Títulos */}
      <div className="text-center mb-24">
        <h3
          className="text-3xl mb-0"
          style={{ fontFamily: "Lora", fontStyle: "italic" }}
        >
          Nuestros valores
        </h3>
        <h3 className="text-4xl font-bold" style={{ fontFamily: "Lora" }}>
          Nuestra esencia
        </h3>
      </div>

      {/* Primera fila */}
      <div className="grid grid-cols-3 gap-12 mb-16 max-w-4xl mx-auto">
        {[
          { title: "Bienestar y <br /> conexión" },
          { title: "Amor por la <br /> naturaleza" },
          { title: "Encender y <br /> compartir la luz" },
        ].map((item, i) => (
          <div key={i} className="relative group text-center p-6">
            {/* Luz difuminada al hover */}
            <div className="absolute inset-0 rounded-full bg-[#DFCCAC] opacity-0 blur-3xl scale-75 transition-all duration-700 group-hover:opacity-90 group-hover:scale-100"></div>

            {/* Texto con salto de línea */}
            <h4
              className="cursor-pointer relative text-lg font-medium text-gray-800 leading-snug"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
          </div>
        ))}
      </div>

      {/* Segunda fila */}
      <div className="flex justify-center gap-60">
        {[
          { title: "Autenticidad <br /> y dedicación" },
          { title: "Sostenibilidad" },
        ].map((item, i) => (
          <div key={i} className="relative group text-center p-6">
            <div className="absolute inset-0 rounded-full bg-[#DFCCAC] opacity-0 blur-3xl scale-75 transition-all duration-700 group-hover:opacity-90 group-hover:scale-100"></div>
            <h4
              className="cursor-pointer relative text-lg font-medium text-gray-800 leading-snug"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuesDesktop;
