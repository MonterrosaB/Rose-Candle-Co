import Marquee from "react-fast-marquee";

export default function MarqueeBanner() {
  const promotionText = " ¡DISFRUTA NUESTRAS PROMOCIONES DE INVIERNO! "; // mensaje

  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-black text-white py-2">
      <Marquee
        gradient={false}
        speed={60}
        pauseOnHover={false} // que no se detenga
        direction="left"
        loop={0} // se repite
      >
        <span className="text-sm font-bold tracking-wide">
          <span>{promotionText}<span className="ml-2 mr-2">★</span></span>
          <span>{promotionText}<span className="ml-2 mr-2">★</span></span>
          <span>{promotionText}<span className="ml-2 mr-2">★</span></span>
          <span>{promotionText}<span className="ml-2 mr-2">★</span></span>
          <span>{promotionText}<span className="ml-2 mr-2">★</span></span>
          <span>{promotionText}<span className="ml-2 mr-2">★</span></span>
          <span>{promotionText}<span className="ml-2 mr-2">★</span></span>
        </span>
      </Marquee>
    </div>
  );
}