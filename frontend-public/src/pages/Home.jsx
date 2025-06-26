

import BannerOne from "./HomeComponents/BannerOne.jsx";
import BannerTwo from "./HomeComponents/BannerTwo.jsx";
import BannerThree from "./HomeComponents/BannerThree.jsx";
import FeaturedProductsSection from "./HomeComponents/FeaturedProductsSection.jsx";
import ValuesSection from "./HomeComponents/ValuesSection.jsx";
import TestimonialSection from "./HomeComponents/TestimonialSection.jsx";

import MarqueeBanner from "../global/components/MarqueeBanner.jsx"

const Home = () => {
    

    return (
        <div className="relative bg-[#F9F7F3] ">
            
           
            <BannerTwo /> 
            <BannerThree />
            <MarqueeBanner/>
            <FeaturedProductsSection />
            <ValuesSection />
            <TestimonialSection />
        </div>
    );
};

export default Home;
