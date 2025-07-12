import React, { useState, useEffect } from "react";
import Isotipo from "../../assets/Isotipo.svg";
import { Link } from "react-router-dom";
import { LogOut, Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../global/hooks/useAuth.js";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      // Cierra el sidebar móvil si la pantalla se agranda
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Botón hamburguesa - visible en móviles y tablets */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-[60] lg:hidden bg-white p-2 rounded-md shadow-md"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Sidebar fijo: visible solo en escritorio grande */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-60 h-screen bg-white shadow-xl z-50 flex-col justify-between">
        <div>
          <div className="flex items-center justify-center py-6">
            <img src={Isotipo} alt="Isotipo Rosé Candle Co." className="w-16 h-16" />
          </div>
          <nav className="text-base text-[#333] font-medium">
            <ul className="space-y-2 px-4">
              {[
                { to: "/", label: "Home" },
                { to: "/stock", label: "Stock" },
                { to: "/reports", label: "Reports" },
                { to: "/employees", label: "Employees" },
                { to: "/order", label: "Order" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="block py-2 px-3 rounded-md hover:bg-[#A3A380]/20 transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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

      {/* Sidebar móvil/tablet con overlay y animación */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Fondo oscuro para overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Menú deslizable animado */}
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
                <nav className="text-base text-[#333] font-medium">
                  <ul className="space-y-2 px-4">
                    {[
                      { to: "/", label: "Home" },
                      { to: "/stock", label: "Stock" },
                      { to: "/reports", label: "Reports" },
                      { to: "/employees", label: "Employees" },
                      { to: "/order", label: "Order" },
                    ].map(({ to, label }) => (
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
                </nav>
              </div>
              <div className="text-base text-[#333] px-4 py-4">
                <button
                  onClick={() => {
                    logout();
                    setIsSidebarOpen(false);
                  }}
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
