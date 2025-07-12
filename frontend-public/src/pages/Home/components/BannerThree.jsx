import bannerbackground3 from "../../../assets/bannerbackground3.png"


const BannerThree = () => {


  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerbackground3})`
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-wide">
            CADA FRAGANCIA
            <br />
            ES UN SUSPIRO
            <br />
            DE PAZ
          </h1>

          <div className="max-w-md mx-auto">
            <p className="text-white/90 text-sm md:text-base leading-relaxed font-light">
              Cada producto que ofrecemos
              <br />
              combina aroma, calidad y armonía
              <br />
              para crear momentos únicos
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerThree;