import React, { useState } from "react";
import Isotipo from "../../assets/Isotipo.svg";
import { Link } from "react-router-dom";
import { LogOut, Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../global/hooks/useAuth.js";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const isAdmin = user?.isAdmin;

  const links = [
    { to: "/", label: "Home", adminOnly: false },
    { to: "/stock", label: "Stock", adminOnly: false },
    { to: "/reports", label: "Reports", adminOnly: true },
    { to: "/employees", label: "Employees", adminOnly: true },
    { to: "/order", label: "Order", adminOnly: false },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
  };

  const renderLinks = () => (
    <ul className="space-y-2 px-4">
      {links.map(({ to, label, adminOnly }) => {
        if (adminOnly && !isAdmin) return null; // Oculta links de admin para usuarios normales
        return (
          <li key={to}>
            <Link
              to={to}
              onClick={() => setIsSidebarOpen(false)}
              className="block py-2 px-3 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 w-12 h-12 bg-white shadow-lg z-50 flex lg:hidden items-center justify-center rounded-md"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Sidebar fijo */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-60 h-screen bg-white shadow-xl z-50 flex-col justify-between">
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
      </aside>

      {/* Sidebar móvil */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
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
