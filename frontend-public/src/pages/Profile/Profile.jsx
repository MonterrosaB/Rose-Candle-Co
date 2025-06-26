import { useState } from "react"
import Sidebar from "./Components/sidebar"
import OrdersSection from "./Components/orders-section"
import ProfileSection from "./Components/profile-section"
import AddressesSection from "./Components/addresses-section"
import CardsSection from "./Components/cards-section"
import AuthSection from "./Components/auth-section"

export default function Profile() {
  const [activeSection, setActiveSection] = useState("pedidos")

  const renderActiveSection = () => {
    switch (activeSection) {
      case "perfil":
        return <ProfileSection />
      case "direcciones":
        return <AddressesSection />
      case "tarjetas":
        return <CardsSection />
      case "autenticacion":
        return <AuthSection />
      case "pedidos":
      default:
        return <OrdersSection />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-gray-100 pt-20">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Contenido principal */}
        <main className="flex-1 lg:ml-80">
          <div className="p-4 lg:p-8">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  )
}
