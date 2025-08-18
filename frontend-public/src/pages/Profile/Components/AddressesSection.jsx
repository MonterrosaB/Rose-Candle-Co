import { useEffect, useState } from "react";
import { MapPin, Plus, Edit, Trash2, Home, Building } from "lucide-react";
import { useProfile } from "../hooks/useProfile";

const Button = ({
  children,
  className = "",
  onClick,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2";

  const variants = {
    primary:
      "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500",
    secondary:
      "bg-gray-300 text-gray-800 hover:bg-gray-400 focus-visible:ring-gray-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    gradient:
      "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-lg hover:shadow-xl transform hover:scale-105",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

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
        firstName: editingAddress.firstName || "",
        lastName: editingAddress.lastName || "",
        state: editingAddress.state || "",
        city: editingAddress.city || "",
        zipCode: editingAddress.zipCode || "",
        phone: editingAddress.phone || "",
        address: editingAddress.address || "",
        type: editingAddress.type || "casa",
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
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Direcciones
          </h1>
          <p className="text-gray-600">Gestiona tus direcciones de envío</p>
        </div>
        <Button
          variant="gradient"
          onClick={() => {
            setEditingAddress(null);
            reset({
              firstName: "",
              lastName: "",
              state: "",
              city: "",
              zipCode: "",
              phone: "",
              address: "",
              type: "casa",
            });
            setIsAdding(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Dirección
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="bg-white/80 rounded-2xl p-6 shadow-xl border border-rose-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {address.firstName} {address.lastName}
                  </h3>
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
              <div>
                <p className="text-gray-600">{address.address}</p>
                <p className="text-gray-600">{address.state}, {address.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Si no hay direcciones */}
      {
        addresses.length === 0 && (
          <div className="bg-white/60 p-12 text-center rounded-3xl shadow-xl">
            {/* ...contenido igual... */}
          </div>
        )
      }

      {/* Formulario para agregar o editar */}
      {
        isAdding && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-10 bg-white rounded-xl shadow-md  mt-6 space-y-4"
          >
            <h3 className="text-xl font-bold text-gray-800">
              {editingAddress ? "Editar Dirección" : "Agregar Dirección"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div>
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Nombre"
                  {...register("firstName", {
                    required: "Campo requerido",
                    pattern: {
                      value: /^[a-zA-Z\u00C0-\u017F\s]+$/,
                      message: "Solo letras y espacios",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>

              {/* Apellido */}
              <div>
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Apellido"
                  {...register("lastName", {
                    required: "Campo requerido",
                    pattern: {
                      value: /^[a-zA-Z\u00C0-\u017F\s]+$/,
                      message: "Solo letras y espacios",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}
              </div>

              {/* Estado */}
              <div>
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Estado"
                  {...register("state", {
                    required: "Campo requerido",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo letras y espacios",
                    },
                  })}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>

              {/* Ciudad */}
              <div>
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Ciudad"
                  {...register("city", {
                    required: "Campo requerido",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo letras y espacios",
                    },
                  })}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>

              {/* Código Postal */}
              <div>
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Código Postal"
                  {...register("zipCode", {
                    required: "Campo requerido",
                    pattern: {
                      value: /^[a-zA-Z0-9\-]+$/,
                      message: "Formato inválido (solo letras, números o guiones)",
                    },
                  })}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Teléfono (####-####)"
                  {...register("phone", {
                    required: "Campo requerido",
                    pattern: {
                      value: /^\d{4}-\d{4}$/,
                      message: "Formato inválido (####-####)",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* Dirección completa */}
              <div className="md:col-span-2">
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Dirección completa"
                  {...register("address", { required: "Campo requerido" })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address.message}</p>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="flex space-x-3">
              <Button type="submit" variant="primary">
                {editingAddress ? "Actualizar Dirección" : "Guardar Dirección"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsAdding(false);
                  setEditingAddress(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        )
      }
    </div >
  );
}
