import { User, Mail, Phone, MapPin, Home } from "lucide-react";
import { useState, useEffect } from "react";

const ShippingStep = ({ formData, handleInputChange, selectedAddress, setSelectedAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Obtener direcciones guardadas desde el backend
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://rose-candle-co.onrender.com/api/customers/addresses", {
          method: "GET",
          credentials: "include", // envía cookies httpOnly
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setAddresses(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressSelect = (value) => {
    setSelectedAddress(value);
    if (value !== "new") {
      const addressData = addresses.find((addr) => addr._id === value);
      if (addressData) {
        Object.entries(addressData).forEach(([key, val]) => {
          handleInputChange("shipping", key, val);
        });
      }
    } else {
      ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode", "country"].forEach((key) =>
        handleInputChange("shipping", key, "")
      );
    }
  };

  const isDisabled = selectedAddress !== "new";

  return (
    <div className="space-y-6">
      {/* Selector de direcciones guardadas */}
      <div>
        <label className="mb-2 font-medium text-gray-700 flex items-center gap-2">
          <Home className="h-5 w-5 text-gray-500" />
          Dirección guardada
        </label>
        {loading ? (
          <p className="text-gray-500">Cargando direcciones...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <select
            value={selectedAddress}
            onChange={(e) => handleAddressSelect(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
          >
            {addresses.map((addr) => (
              <option key={addr._id} value={addr._id}>
                {addr.label || `${addr.firstName} ${addr.lastName} - ${addr.state}`}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Formulario de envío */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Nombre"
            value={formData.firstName}
            disabled={isDisabled}
            onChange={(e) => handleInputChange("shipping", "firstName", e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
          />
        </div>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Apellido"
            value={formData.lastName}
            disabled={isDisabled}
            onChange={(e) => handleInputChange("shipping", "lastName", e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="phone"
          placeholder="Teléfono"
          value={formData.phone}
          disabled={isDisabled}
          onChange={(e) => handleInputChange("shipping", "phone", e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
        />
      </div>

      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Dirección completa"
          value={formData.address}
          disabled={isDisabled}
          onChange={(e) => handleInputChange("shipping", "address", e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Departamento"
          value={formData.state}
          disabled={isDisabled}
          onChange={(e) => handleInputChange("shipping", "state", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
        />
        <input
          type="text"
          placeholder="Municipio"
          value={formData.city}
          disabled={isDisabled}
          onChange={(e) => handleInputChange("shipping", "city", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
        />
        <input
          type="text"
          placeholder="Código Postal"
          value={formData.zipCode}
          disabled={isDisabled}
          onChange={(e) => handleInputChange("shipping", "zipCode", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
        />
      </div>
    </div>
  );
};

export default ShippingStep;
