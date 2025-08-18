import { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

// Componentes
import Nav from "../../global/components/Nav.jsx";
import Footer from "../../global/components/Footer.jsx";
import MarqueeBanner from "../../global/components/MarqueeBanner.jsx";

// Páginas
import Home from "../../pages/Home/Home.jsx";
import AboutUs from "../../pages/AboutUs/AboutUs.jsx";
import Faqs from "../../pages/Faqs/Faqs.jsx";
import Products from "../../pages/Products/Products.jsx";
import ProductDetail from "../../pages/Products/ProductDetail.jsx";
import Profile from "../../pages/Profile/Profile.jsx";
import Cart from "../../pages/ShoppingCart/ShoppingCart.jsx";
import LoginCustomer from "../../pages/LoginCustomer/LoginCustomer.jsx";
import RegisterCustomer from "../../pages/RegisterCustomer/Register.jsx";
import TermsAndConditions from "../../pages/TermsAndConditions/TermsAndConditions.jsx";
import PasswordRecovery from "../../pages/RecoveryPassword/logic/PageRecoveryPassword.jsx";
import Page404 from "./Page404.jsx";

// Auth
import { useAuth } from "../hooks/useAuth.js";
import ProtectedRoutes from "../../pages/LoginCustomer/ProtectedRoute.jsx";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Donde mostrar el marquee
  const showMarquee = [
    "/profile",
    "/loginCustomer",
    "/recoveryPassword",
    "/profile",
    "/register",
  ].includes(location.pathname);

  // Aqui no aparece el footer y el nav
  const noNavFooterRoutes = [
    "/loginCustomer",
    "/recoveryPassword",
    "/profile",
    "/register",
  ];
  const hideNavFooter = noNavFooterRoutes.includes(location.pathname);

  // Redirigir automáticamente si el usuario ya está logueado y entra a login o register
  useEffect(() => {
    const blockedWhenAuth = ["/loginCustomer", "/register"];
    if (isAuthenticated && blockedWhenAuth.includes(location.pathname)) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <div className="flex flex-col">
      {!showMarquee && <MarqueeBanner />}

      {!hideNavFooter && <Nav />}

      <div className=" min-h-dvh">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/loginCustomer" element={<LoginCustomer />} />
          <Route path="/register" element={<RegisterCustomer />} />
          <Route path="/recoveryPassword" element={<PasswordRecovery />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
      {!hideNavFooter && <Footer />}
    </div>
  );
}

export default Navigation;
