import NuestraLuzInterior from "../../../assets/NuestraLuzInterior.jpg";

const Hero = () => {
  return (
    <section className="relative w-full h-[120vh] overflow-hidden flex justify-center items-center">
      
      <img
        src={NuestraLuzInterior}
        alt="Nuestra Luz Interior"
        className="w-[1600px] h-[1200px] object-cover mt-[350px]"
      />

      
      <div className="absolute inset-0 bg-white/10"></div>

     
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start text-center px-4 pt-[60px]">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-800 mb-6 leading-tight">
          Nuestra <br />
          <span className="font-normal">luz interior</span>
        </h1>

        <p className="text-gray-700 text-sm leading-relaxed max-w-lg mx-auto px-2">
          En <span className="font-medium">Rose Candle Co.</span>, creemos en el poder del aroma y la luz para transformar espacios y emociones. Creamos velas y productos aromáticos ecológicos que invitan a la calma, la conexión y el equilibrio interior.
        </p>
      </div>
    </section>
  );
};

export default Hero;
