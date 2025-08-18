import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../global/context/AuthContext";
import toast from "react-hot-toast";

export const useUpdatePassword = () => {
  const { user, API } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Configuración de react-hook-form con valores por defecto
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const updatePassword = async (data) => {
    if (!user?.id) {
      toast.error("Usuario no autenticado.");
      return;
    }

    // Validar que nueva contraseña y confirmación coincidan
    if (data.newPassword !== data.confirmPassword) {
      toast.error("La nueva contraseña y la confirmación no coinciden");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      // Llamada al backend para actualizar la contraseña
      const response = await fetch(`${API}/customers/${user.id}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Si hay un error, lo muestra en toast
        throw new Error(result.message || "Error al actualizar la contraseña");
      }

      toast.success("Contraseña actualizada correctamente");
      setSuccess(true);
      reset(); // Limpiar formulario
    } catch (err) {
      console.error("Error al actualizar contraseña:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    watch,
    loading,
    success,
    updatePassword,
  };
};
