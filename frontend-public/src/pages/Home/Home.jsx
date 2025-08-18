

import BannerOne from "./components/BannerOne.jsx";
import BannerTwo from "./components/BannerTwo.jsx";
import BannerThree from "./components/BannerThree.jsx";
import FeaturedProductsSection from "./components/FeaturedProductsSection.jsx";
import ValuesSection from "./components/ValuesSection.jsx";
import TestimonialSection from "./components/TestimonialSection.jsx";

import MarqueeBanner from "../../global/components/MarqueeBanner.jsx"

const Home = () => {


    return (
        <div className="relative bg-[#F9F7F3] ">


            <BannerTwo />
            <BannerThree />
            <MarqueeBanner />
            <FeaturedProductsSection />
            <ValuesSection />
        </div>
    );
};

export default Home;
