import { useState } from "react";
import { FiPhone } from "react-icons/fi"; // telefono
import { MdMailOutline } from "react-icons/md"; // correo
import { FaInstagram } from "react-icons/fa"; // instagram
import { FaFacebook } from "react-icons/fa"; // facebook
import { FaTiktok } from "react-icons/fa"; // tiktok
import Logo from "../../assets/Logotipo.svg"; // logo
 
const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <div className="relative bg-[#1C1C1C] h-70">
        {/* Contenedor a la izquierda */}
        <div>
            {/* Logo */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4">
                <img src={Logo} alt="Logo" className="h-20" style={{ filter: 'invert(1)' }} />
            </div>
            {/* Telefono */}
            <div>
                <FiPhone />
                <p>7478-7978</p>
            </div>
            {/* Correo */}
            <div>
                <MdMailOutline />
                <p>rosecandle.co@gmail.com</p>
            </div>
        </div>

        {/* Indice del sitio */}
        <div>
            <p>Rosé Candle Co.</p>
            <a href="/" className="text-gray-700 hover:text-black font-medium">Inicio</a>
            <a href="/about" className="text-gray-700 hover:text-black font-medium">Nosotros</a>
            <a href="/products" className="text-gray-700 hover:text-black font-medium">Productos</a>
            <a href="/faqs" className="text-gray-700 hover:text-black font-medium">FAQs</a>
        </div>

        {/* Informacion legal */}
        <div>
            <p>Información Legal</p>
            <a href="/" className="text-gray-700 hover:text-black font-medium">Inicio</a>
            <a href="/about" className="text-gray-700 hover:text-black font-medium">Nosotros</a>
            <a href="/products" className="text-gray-700 hover:text-black font-medium">Productos</a>
            <a href="/faqs" className="text-gray-700 hover:text-black font-medium">FAQs</a>
        </div>

        {/* Contenedor a la derecha */}
        <div>
            <p>Novedades</p>
            
        </div>
        
    </div>
  );
};
 
export default Footer;