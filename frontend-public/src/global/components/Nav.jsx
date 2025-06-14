import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FaRegUser } from "react-icons/fa"; // icono de cuenta
import { MdOutlineShoppingCart } from "react-icons/md"; // icono de carrito
import Logo from "../../assets/Logotipo.svg"; // logo

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#F9F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-20 relative">
          {/* Menú */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-700 font-medium"
                  : "text-[#c1c1c1] hover:text-gray-700 font-medium"
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-700 font-medium"
                  : "text-[#c1c1c1] hover:text-gray-700 font-medium"
              }
            >
              Nosotros
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-700 font-medium"
                  : "text-[#c1c1c1] hover:text-gray-700 font-medium"
              }
            >
              Productos
            </NavLink>

            <NavLink
              to="/faqs"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-700 font-medium"
                  : "text-[#c1c1c1] hover:text-gray-700 font-medium"
              }
            >
              FAQs
            </NavLink>
          </div>

          {/* Íconos */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-gray-700 hover:text-black text-xl">
              <FaRegUser />
            </a>
            <a href="/cart" className="text-gray-700 hover:text-black text-xl">
              <MdOutlineShoppingCart />
            </a>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src={Logo} alt="Logo" className="h-12" />
          </div>

          {/* Botón hamburguesa */}
          <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-gray-600"></span>
                <span className="block w-6 h-0.5 bg-gray-600"></span>
                <span className="block w-6 h-0.5 bg-gray-600"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-2 mt-2 text-center">
            <a href="/" className="text-gray-700 hover:text-black font-medium">
              Inicio
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-black font-medium"
            >
              Nosotros
            </a>
            <a
              href="/products"
              className="text-gray-700 hover:text-black font-medium"
            >
              Productos
            </a>
            <a
              href="/faqs"
              className="text-gray-700 hover:text-black font-medium"
            >
              FAQs
            </a>
            <div className="flex justify-center space-x-4 pt-2">
              <a
                href="/login"
                className="text-gray-700 hover:text-black text-xl"
              >
                <FaRegUser />
              </a>
              <a
                href="/cart"
                className="text-gray-700 hover:text-black text-xl"
              >
                <MdOutlineShoppingCart />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;