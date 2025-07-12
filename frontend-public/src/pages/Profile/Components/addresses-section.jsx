import { useState } from "react";
import { MapPin, Plus, Edit, Trash2, Home, Building } from "lucide-react";
import { useAuth } from "../../../global/hooks/useAuth.js";

// Custom Button component
const Button = ({ children, className = "", onClick, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

export default function AddressesSection() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState(
    user?.addresses || [
      {
        id: "1",
        type: "casa",
        title: "Casa Principal",
        address: "Colonia Centro, Calle 12, #34, Ciudad",
        isDefault: true,
      },
      {
        id: "2",
        type: "trabajo",
        title: "Oficina",
        address: "Edificio Empresarial, Torre B, Piso 3",
        isDefault: false,
      },
    ]
  );

  console.log("Direcciones:", addresses);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Direcciones
          </h1>
          <p className="text-gray-600">Gestiona tus direcciones de envío</p>
        </div>
        <Button className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Dirección
        </Button>
      </div>

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-3 rounded-xl ${
                    address.type === "casa" || address.type === "home"
                      ? "bg-blue-100"
                      : "bg-purple-100"
                  } shadow-lg`}
                >
                  {address.type === "casa" || address.type === "home" ? (
                    <Home className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Building className="w-6 h-6 text-purple-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {address.title} {address.type}
                  </h3>
                  {address.isDefault && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Predeterminada
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-300">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <p className="text-gray-600 leading-relaxed">{address.address}</p>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-rose-100">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center shadow-2xl mb-6">
            <MapPin className="w-12 h-12 text-rose-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            No tienes direcciones guardadas
          </h3>
          <p className="text-gray-600 mb-8">
            Agrega una dirección para facilitar tus compras futuras
          </p>
          <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Primera Dirección
          </Button>
        </div>
      )}
    </div>
  );
}
