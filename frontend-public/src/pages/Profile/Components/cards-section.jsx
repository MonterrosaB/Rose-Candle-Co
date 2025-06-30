

import { useState } from "react"
import { CreditCard, Plus, Edit, Trash2, Shield } from "lucide-react"

const Button = ({ children, className = "", onClick, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
)

export default function CardsSection() {
  const [cards] = useState([
    {
      id: 1,
      type: "visa",
      lastFour: "4532",
      expiryDate: "12/25",
      holderName: "Emilio Monterrosa",
      isDefault: true,
    },
    {
      id: 2,
      type: "mastercard",
      lastFour: "8901",
      expiryDate: "08/26",
      holderName: "Emilio Monterrosa",
      isDefault: false,
    },
  ])

  const getCardColor = (type) => {
    switch (type) {
      case "visa":
        return "from-blue-500 to-blue-700"
      case "mastercard":
        return "from-red-500 to-red-700"
      default:
        return "from-gray-500 to-gray-700"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Tarjetas de Crédito
          </h1>
          <p className="text-gray-600">Gestiona tus métodos de pago</p>
        </div>
        <Button className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Tarjeta
        </Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="relative group">
            <div
              className={`bg-gradient-to-br ${getCardColor(card.type)} rounded-2xl p-6 text-white shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl`}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-8 h-8" />
                  <span className="text-lg font-semibold uppercase">{card.type}</span>
                </div>
                {card.isDefault && (
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    Principal
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="text-2xl font-mono tracking-wider">•••• •••• •••• {card.lastFour}</div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-80">TITULAR</p>
                    <p className="font-semibold">{card.holderName}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">VENCE</p>
                    <p className="font-semibold">{card.expiryDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300">
                <Edit className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-red-500/80 transition-all duration-300">
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje de seguridad */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Tus datos están seguros</h3>
            <p className="text-gray-600">
              Utilizamos encriptación de nivel bancario para proteger tu información financiera.
            </p>
          </div>
        </div>
      </div>

      {/* Estado vacío (por si no hay tarjetas) */}
      {cards.length === 0 && (
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-rose-100">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center shadow-2xl mb-6">
            <CreditCard className="w-12 h-12 text-rose-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">No tienes tarjetas guardadas</h3>
          <p className="text-gray-600 mb-8">Agrega una tarjeta para realizar compras más rápido</p>
          <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Primera Tarjeta
          </Button>
        </div>
      )}
    </div>
  )
}
