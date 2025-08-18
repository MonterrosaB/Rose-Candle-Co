import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Edit,
  Save,
  X,
} from "lucide-react";
import { useUserInformation } from "../hooks/useUserInformation";

// Componentes reutilizables: Button, Input y Label
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
      "bg-green-500 text-white hover:bg-green-600 focus-visible:ring-gray-400",
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

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background 
      file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({ children, className = "", htmlFor, ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    htmlFor={htmlFor}
    {...props}
  >
    {children}
  </label>
);

export default function ProfileSection() {
  // Hook personalizado para manejar el estado del perfil y la actualización
  const { profile, setProfile, updateProfile, loading } = useUserInformation();

  // Estados locales para controlar edición y envío
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  // Guardar cambios en el backend
  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await updateProfile();
      setIsEditing(false); // Salir del modo edición
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mostrar mensaje mientras se carga la información
  if (loading) {
    return <p className="text-center">Cargando perfil...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Título de la sección */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Perfil
        </h1>
        <p className="text-gray-600">Gestiona tu información personal</p>
      </div>

      {/* Tarjeta del perfil */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-rose-100">
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
          
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-2xl">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Información del perfil */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Información Personal
              </h2>

              {/* Botón Editar / Guardar */}
              <Button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                type="button"
                variant={isEditing ? "secondary" : "primary"}
                disabled={isSubmitting}
              >
                {isEditing ? (
                  <Save className="w-4 h-4 mr-2" />
                ) : (
                  <Edit className="w-4 h-4 mr-2" />
                )}
                {isEditing ? "Guardar" : "Editar"}
              </Button>
            </div>

            {/* Campos del formulario */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nombre
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-10 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
                  />
                </div>
              </div>

              {/* Apellidos */}
              <div className="space-y-2">
                <Label htmlFor="surnames" className="text-sm font-medium text-gray-700">
                  Apellidos
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="surnames"
                    value={profile.surnames}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-10 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Teléfono
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-10 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-10 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Botones Guardar / Cancelar (solo en edición) */}
            {isEditing && (
              <div className="mt-6 flex space-x-4">
                <Button
                  onClick={handleSave}
                  type="button"
                  variant="secondary"
                  disabled={isSubmitting}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  type="button"
                  variant="danger"
                  disabled={isSubmitting}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
