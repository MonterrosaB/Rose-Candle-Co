import { useEffect } from "react";
import BannerTwo from "./components/BannerTwo.jsx";
import BannerThree from "./components/BannerThree.jsx";
import FeaturedProductsSection from "./components/FeaturedProductsSection.jsx";
import ValuesSection from "./components/ValuesSection.jsx";
import TestimonialSection from "./components/TestimonialSection.jsx";
import Promotion from "./components/Promotion.jsx";
import MarqueeBanner from "../../global/components/MarqueeBanner.jsx"

const Home = () => {
    useEffect(() => {
        document.title = "Inicio | Rosé Candle Co.";
      }, []);
    return (
        <div className="relative bg-[#F9F7F3] ">
            <BannerTwo />
            <Promotion />
            <BannerThree />
            <MarqueeBanner />
            <FeaturedProductsSection />
            <ValuesSection />
            <TestimonialSection />
        </div>
    );
};

export default Home;
