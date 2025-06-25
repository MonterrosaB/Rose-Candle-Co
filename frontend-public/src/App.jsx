import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./global/components/Nav.jsx" // Menu
import Footer from "./global/components/Footer.jsx" // Footer

import Home from "./pages/Home.jsx"
import Faqs from "../src/pages/Faqs/Faqs.jsx" // Pagina de preguntas frecuentes
import AboutUs from "../src/pages/AboutUs/AboutUs.jsx" // Pagina Sobre Nosotros 


function App() {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path="/faqs" element={<Faqs />} />
        <Route path= "/About" element={<AboutUs/>}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
