import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Marquee from "react-fast-marquee";

export default function MarqueeBanner() {
  const { API } = useAuth();
  const ApiSettings = API + "/settings";

  const [promotionText, setPromotionText] = useState("¡DISFRUTA NUESTRAS PROMOCIONES DE TEMPORADA!");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarqueeText = async () => {
      try {
        const res = await fetch(`${ApiSettings}`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.marquee?.name) {
            setPromotionText(data.marquee.name);
          }
        }
      } catch (error) {
        console.error("Error al cargar el texto del marquee:", error);
        // Mantiene el texto por defecto si hay error
      } finally {
        setLoading(false);
      }
    };

    fetchMarqueeText();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-black text-white py-2">
      <Marquee
        gradient={false}
        speed={60}
        pauseOnHover={false}
        direction="left"
        loop={0}
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