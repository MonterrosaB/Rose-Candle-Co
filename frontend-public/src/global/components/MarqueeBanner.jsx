import Marquee from "react-fast-marquee"

export default function MarqueeBanner() {
  const promotionText = "NUESTRAS PROMOCIONES DE INVIERNO!"

  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-black text-white py-2">
      <Marquee
        gradient={false}
        speed={60}
        pauseOnHover={true}
      >
        <span className="text-sm font-bold tracking-wide mx-4">
          {promotionText} ★ {promotionText} ★ {promotionText} ★ {promotionText} ★ {promotionText} ★
        </span>
      </Marquee>
    </div>
  )
}
