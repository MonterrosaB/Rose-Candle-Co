import { FiPhone } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import Logo from "../../assets/Logotipo.svg";

const Footer = () => {
  return (
    <div className="bg-[#1C1C1C] text-[#F9F7F3] py-10 px-6 sm:px-12 font-[Poppins]">
      <div className="flex flex-col md:flex-row justify-between flex-wrap gap-10">
        {/* Contacto y redes sociales */}
        <div className="flex flex-col items-start gap-4 w-full md:w-auto">
          {/* Logo */}
          <img src={Logo} alt="Logo" className="h-30 filter invert" />

          {/* Teléfono */}
          <div className="flex items-center gap-2 mt-5">
            <FiPhone className="text-lg" />
            <p>7478-7978</p>
          </div>

          {/* Correo */}
          <div className="flex items-center gap-2">
            <MdMailOutline className="text-lg" />
            <p>rosecandle.co@gmail.com</p>
          </div>

          {/* Redes sociales */}
          <div className="flex gap-3 mt-3">
            <a
              href="https://www.instagram.com/rosecandleco.sv/?igsh=dDN0ZzBjN3Uxando#"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#F9F7F3] rounded-full p-2 transition duration-300 hover:bg-[#F9F7F3]" // Circulo alrededor
            >
              <FaInstagram className="text-xl text-[#F9F7F3] hover:text-[#1C1C1C] transition duration-300" />
            </a>
            <a
              href="https://www.facebook.com/share/18oEHos2hv/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#F9F7F3] rounded-full p-2 transition duration-300 hover:bg-[#F9F7F3]"
            >
              <FaFacebook className="text-xl text-[#F9F7F3] hover:text-[#1C1C1C] transition duration-300" />
            </a>
            <a
              href="https://www.tiktok.com/@rosecandlecosv?_t=ZM-8x8AL8VOWsq&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#F9F7F3] rounded-full p-2 transition duration-300 hover:bg-[#F9F7F3]"
            >
              <FaTiktok className="text-xl text-[#F9F7F3] hover:text-[#1C1C1C] transition duration-300" />
            </a>
          </div>
        </div>

        {/* Índice del sitio */}
        <div className="flex flex-col items-start gap-7 w-full sm:w-auto">
          <p className="text-lg text-[#B7B5B3]">Rosé Candle Co.</p>
          <a
            href="/"
            className="hover:text-[#B7B5B3] mt-5 transition duration-300"
          >
            Inicio
          </a>
          <a
            href="/about"
            className="hover:text-[#B7B5B3] transition duration-300"
          >
            Nosotros
          </a>
          <a
            href="/products"
            className="hover:text-[#B7B5B3] transition duration-300"
          >
            Productos
          </a>
          <a
            href="/faqs"
            className="hover:text-[#B7B5B3] transition duration-300"
          >
            FAQs
          </a>
        </div>

        {/* Información legal */}
        <div className="flex flex-col items-start gap-7 w-full sm:w-auto">
          <p className="text-lg text-[#B7B5B3]">Información Legal</p>
          <a
            href="/termsAndConditions"
            className="hover:text-[#B7B5B3] mt-5 transition duration-300"
          >
            Aviso Legal
          </a>
          <a href="/termsAndConditions#PolíticadeCookies" className="hover:text-[#B7B5B3] transition duration-300">
            Aviso y Política de Cookies
          </a>
          <a href="/termsAndConditions#TerminosCondiciones" className="hover:text-[#B7B5B3] transition duration-300">
            Términos y Condiciones de uso
          </a>
          <a href="/termsAndConditions#PoliticadePrivacidad" className="hover:text-[#B7B5B3] transition duration-300">
            Política de privacidad
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
