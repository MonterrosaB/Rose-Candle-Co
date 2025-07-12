import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Componentes
import Nav from "./global/components/Nav.jsx"; 
import Footer from "./global/components/Footer.jsx"; 
import MarqueeBanner from "./global/components/MarqueeBanner.jsx"; 

// Páginas
import Home from "../src/pages/Home.jsx";
import AboutUs from "../src/pages/AboutUs/AboutUs.jsx";
import Faqs from "../src/pages/Faqs/Faqs.jsx";
import Products from "../src/pages/Products/Products.jsx";
import ProductDetail from "../src/pages/Products/ProductDetail.jsx";
import Profile from "../src/pages/Profile/Profile.jsx";
import Cart from "../src/pages/shoppingCard/ShoppingCard.jsx";
import LoginCustomer from "../src/pages/LoginCustomer/LoginCustomer.jsx";
import TermsAndConditions from "../src/pages/TermsAndConditions/TermsAndConditions.jsx"

// Auth
import { AuthProvider } from "./global/context/AuthContext.jsx";
import ProtectedRoutes from "../src/pages/LoginCustomer/ProtectedRoute.jsx";

// Layout con lógica para el banner y la navegación
function Layout() {
  const location = useLocation();
  const showMarquee = ["/", "/aboutUs", "/faqs", "/products"].includes(
    location.pathname
  );

  return (
    <div className="flex flex-col min-h-screen">
      {showMarquee && <MarqueeBanner />}
      <Nav topClass={showMarquee ? "top-10" : "top-0"} />
      <div className="pt-20"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginCustomer" element={<LoginCustomer />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/faqs" element={<Faqs />} />
         <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

import Public from "./router/Public/Public.jsx";

function App() {
  return <Public />;
}

export default App;
