import bannerbackground2 from "../../../assets/bannerbackground2.png";

const BannerTwo = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{
          backgroundImage: `url('${bannerbackground2}')`
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 via-rose-400/30 to-pink-600/50" />

      {/* Content Container */}
      <div className="relative h-full flex items-center justify-end px-6 md:px-12 lg:px-16">
        <div className="text-right text-white max-w-md">
          {/* Discover Badge */}
          <div className="inline-block mb-4">
            <span className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              Descubre
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight drop-shadow-lg">
            Mother's Day
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl mb-8 opacity-90 font-light drop-shadow-md">
            Colección de temporada
          </p>

          {/* CTA Button */}
          <button className="bg-black/70 hover:bg-black/90 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-lg">
            VER MÁS
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerTwo;
