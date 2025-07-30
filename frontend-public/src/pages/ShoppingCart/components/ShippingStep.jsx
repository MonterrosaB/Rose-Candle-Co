import { User, Mail, Phone, MapPin } from "lucide-react"

const ShippingStep = ({ formData, handleInputChange }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative">
        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={(e) => handleInputChange("shipping", "firstName", e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
        />
      </div>
      <div className="relative">
        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={(e) => handleInputChange("shipping", "lastName", e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
        />
      </div>
    </div>

    <div className="relative">
      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={(e) => handleInputChange("shipping", "email", e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      />
    </div>

    <div className="relative">
      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <input
        type="tel"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={(e) => handleInputChange("shipping", "phone", e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      />
    </div>

    <div className="relative">
      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Dirección completa"
        value={formData.address}
        onChange={(e) => handleInputChange("shipping", "address", e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Ciudad"
        value={formData.city}
        onChange={(e) => handleInputChange("shipping", "city", e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      />
      <input
        type="text"
        placeholder="Código Postal"
        value={formData.zipCode}
        onChange={(e) => handleInputChange("shipping", "zipCode", e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      />
      <select
        value={formData.country}
        onChange={(e) => handleInputChange("shipping", "country", e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
      >
        <option value="México">México</option>
        <option value="Estados Unidos">Estados Unidos</option>
        <option value="Canadá">Canadá</option>
      </select>
    </div>
  </div>
)

export default ShippingStep
