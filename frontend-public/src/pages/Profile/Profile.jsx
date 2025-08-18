import { useState, useEffect } from "react";
import Sidebar from "./Components/sidebar";
import OrdersSection from "./Components/OrdersSection";
import ProfileSection from "./Components/ProfileSection";
import AddressesSection from "./Components/AddressesSection";
import CardsSection from "./Components/CardsSection";
import AuthSection from "./Components/PasswordSection";

export default function Profile() {
  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = "Mi Perfil | Rosé Candle Co.";
  }, []);

  const [activeSection, setActiveSection] = useState("pedidos");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "perfil":
        return <ProfileSection />;
      case "direcciones":
        return <AddressesSection />;
      case "autenticacion":
        return <AuthSection />;
      case "pedidos":
      default:
        return <OrdersSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-gray-100 pt-20">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Contenido principal */}
        <main className="flex-1 lg:ml-80">
          <div className="p-4 lg:p-8">{renderActiveSection()}</div>
        </main>
      </div>
    </div>
  );
}
