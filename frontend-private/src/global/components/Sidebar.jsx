import React, { useState } from "react";
import Isotipo from "../../assets/Isotipo.svg";
import { Link } from "react-router-dom";
import { LogOut, Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../global/hooks/useAuth.js";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const links = [
    { to: "/", label: "Home" },
    { to: "/stock", label: "Stock" },
    { to: "/reports", label: "Reports" },
    { to: "/employees", label: "Employees" },
    { to: "/order", label: "Order" },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
  };

  const renderLinks = () => (
    <ul className="space-y-2 px-4">
      {links.map(({ to, label }) => (
        <li key={to}>
          <Link
            to={to}
            onClick={() => setIsSidebarOpen(false)}
            className="block py-2 px-3 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Botón hamburguesa - visible solo en móviles/tablets */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 w-12 h-12 bg-white shadow-lg z-50 flex lg:hidden items-center justify-center rounded-md"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Sidebar fijo para escritorio */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-60 h-screen bg-white shadow-xl z-50 flex-col justify-between">
        <div>
          <div className="flex items-center justify-center py-6">
            <img src={Isotipo} alt="Isotipo Rosé Candle Co." className="w-16 h-16" />
          </div>
          <nav className="text-base text-[#333] font-medium">{renderLinks()}</nav>
        </div>
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

      {/* Sidebar móvil con overlay y animación */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Sidebar deslizable */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 w-60 h-screen bg-white shadow-xl z-50 flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex items-center justify-center py-6">
                  <img src={Isotipo} alt="Isotipo Rosé Candle Co." className="w-16 h-16" />
                </div>
                <nav className="text-base text-[#333] font-medium">{renderLinks()}</nav>
              </div>
              <div className="text-base text-[#333] px-4 py-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300 cursor-pointer"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
