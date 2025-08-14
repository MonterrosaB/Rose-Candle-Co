import { useEffect, useState } from "react";
import { MapPin, Plus, Edit, Trash2, Home, Building } from "lucide-react";
import { useProfile } from "../hooks/useProfile";

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
  const {
    addresses,
    isAdding,
    setIsAdding,
    addAddress,
    deleteAddress,
    updateAddress,
    register,
    handleSubmit,
    errors,
    reset, // destructuramos reset para cargar datos al editar
  } = useProfile();

  // Estado para la dirección que vamos a editar
  const [editingAddress, setEditingAddress] = useState(null);

  // Cuando cambia editingAddress, llenamos el formulario con reset
  useEffect(() => {
    if (editingAddress) {
      reset({
        address: editingAddress.address,
        type: editingAddress.type,
      });
      setIsAdding(true);
    } else {
      reset();
    }
  }, [editingAddress, reset, setIsAdding]);

  // Función que manejará el submit para agregar o actualizar
  const onSubmit = (data) => {
    if (editingAddress) {
      updateAddress(editingAddress._id, data);
      setEditingAddress(null);
    } else {
      addAddress(data);
    }
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      {/* ...titulo y botón agregar (igual que antes)... */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="bg-white/80 rounded-2xl p-6 shadow-xl border border-rose-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-3 rounded-xl ${
                    address.type === "casa" ? "bg-blue-100" : "bg-purple-100"
                  }`}
                >
                  {address.type === "casa" ? (
                    <Home className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Building className="w-6 h-6 text-purple-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {address.type === "casa" ? "Casa" : "Trabajo"}
                  </h3>
                  {address.isDefault && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Predeterminada
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 text-gray-400 hover:text-rose-600"
                  onClick={() => setEditingAddress(address)} // setea dirección a editar
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-red-600"
                  onClick={() => deleteAddress(address._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <p className="text-gray-600">{address.address}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Si no hay direcciones */}
      {addresses.length === 0 && (
        <div className="bg-white/60 p-12 text-center rounded-3xl shadow-xl">
          {/* ...contenido igual... */}
        </div>
      )}

      {/* Formulario para agregar o editar */}
      {isAdding && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-white rounded-xl shadow-md border mt-6 space-y-4"
        >
          <h3 className="text-xl font-bold text-gray-800">
            {editingAddress ? "Editar Dirección" : "Agregar Dirección"}
          </h3>

          <div className="space-y-3">
            <input
              className="w-full p-2 border rounded"
              placeholder="Dirección completa"
              {...register("address", { required: "Campo requerido" })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}

            <select
              className="w-full p-2 border rounded"
              {...register("type", { required: true })}
            >
              <option value="casa">Casa</option>
              <option value="trabajo">Trabajo</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <Button type="submit" className="bg-rose-600 text-white">
              {editingAddress ? "Actualizar Dirección" : "Guardar Dirección"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingAddress(null);
              }}
              className="bg-gray-300"
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
