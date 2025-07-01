import React, { useState } from "react";
import Isotipo from "../../assets/Isotipo.svg";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../../global/hooks/useAuth.js"; // para cerrar sesión

const Sidebar = () => {
  const [openDropdown, setOpenDropDown] = useState(false);
  const { logout } = useAuth(); // funcion del logout

  return (
    <aside className="fixed top-0 left-0 w-60 h-screen bg-white shadow-xl z-50 transition-transform -translate-x-full sm:translate-x-0 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center py-6">
          <motion.img
            src={Isotipo}
            alt="Isotipo Rosé Candle Co."
            className="w-16 h-16"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Navegación */}
        <nav className="text-base text-[#333] font-medium">
          <ul className="space-y-2 px-4">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
              >
                Home
              </Link>
            </li>

            <li className="relative">
              <button
                onClick={() => setOpenDropDown(!openDropdown)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
              >
                <span>Stock</span>
                <ChevronDown size={18} />
              </button>

              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link
                to="/reports"
                className="block py-2 px-3 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
              >
                Reports
              </Link>
            </li>

            <li>
              <Link
                to="/employees"
                className="block py-2 px-3 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
              >
                Employees
              </Link>
            </li>

            <li>
              <Link
                to="/order"
                className="block py-2 px-3 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
              >
                Order
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout */}
      <div className="text-base text-[#333] px-4 py-4">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300 cursor-pointer"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;