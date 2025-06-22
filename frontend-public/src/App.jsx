import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./global/components/Nav.jsx"; // Menu
import Footer from "./global/components/Footer.jsx"; // Footer
import Faqs from "../src/pages/Faqs/Faqs.jsx"; // Pagina de preguntas frecuentes
import Products from "../src/pages/Products/Products.jsx";
import ProductDetail from "../src/pages/Products/ProductDetail.jsx";
import Cart from "../src/pages/shoppingCard/ShoppingCard.jsx"

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
