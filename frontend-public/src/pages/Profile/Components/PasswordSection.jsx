import { useUpdatePassword } from "../hooks/usePassword.jsx"; // Hook actualizado
import { Key } from "lucide-react";

// Componentes reutilizables
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Label from "./Label.jsx";

export default function PasswordSection() {
  // Usar hook personalizado para manejar actualización de contraseña
  const { register, handleSubmit, errors, loading, success, updatePassword } = useUpdatePassword();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Autenticación
        </h1>
        <p className="text-gray-600">Gestiona la seguridad de tu cuenta</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100">
        {/* Header con icono */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Key className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Cambiar Contraseña
          </h2>
        </div>

        {/* Formulario de cambio de contraseña */}
        <form className="space-y-4" onSubmit={handleSubmit(updatePassword)}>
          {/* Contraseña actual */}
          <div>
            <Label htmlFor="currentPassword">Contraseña Actual</Label>
            <Input
              id="currentPassword"
              type="password"
              {...register("currentPassword", { required: "La contraseña actual es obligatoria" })}
              className="mt-1 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
            />
            {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
          </div>

          {/* Nueva contraseña y confirmación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword", { required: "La nueva contraseña es obligatoria" })}
                className="mt-1 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
              />
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", { required: "Debes confirmar la nueva contraseña" })}
                className="mt-1 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Botón para actualizar contraseña */}
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {loading ? "Actualizando..." : "Actualizar Contraseña"}
          </Button>

          {/* Mensaje de éxito */}
          {success && <p className="text-green-500">Contraseña actualizada correctamente</p>}
        </form>
      </div>
    </div>
  );
}
