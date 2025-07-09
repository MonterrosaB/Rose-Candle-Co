import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Nav from "./global/components/Nav.jsx"; // Menú de navegación
import Footer from "./global/components/Footer.jsx"; // Footer
import MarqueeBanner from "./global/components/MarqueeBanner.jsx"; // Banner superior

// Páginas
import Home from "../src/pages/Home.jsx";
import AboutUs from "../src/pages/AboutUs/AboutUs.jsx";
import Faqs from "../src/pages/Faqs/Faqs.jsx";
import Products from "../src/pages/Products/Products.jsx";
import ProductDetail from "../src/pages/Products/ProductDetail.jsx";
import Profile from "../src/pages/Profile/Profile.jsx";
import Cart from "../src/pages/shoppingCard/ShoppingCard.jsx";
import LoginCustomer from "../src/pages/LoginCustomer/LoginCustomer.jsx";

import { AuthProvider } from "./global/context/AuthContext.jsx";
// Layout con lógica para el banner y la navegación
function Layout() {
  const location = useLocation();
  const showMarquee = ["/", "/aboutUs", "/faqs", "/products"].includes(
    location.pathname
  );

  return (
    <>
      {showMarquee && <MarqueeBanner />}
      <Nav topClass={showMarquee ? "top-10" : "top-0"} />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginCustomer" element={<LoginCustomer />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

// Envolvemos el Layout en el Router
function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;
