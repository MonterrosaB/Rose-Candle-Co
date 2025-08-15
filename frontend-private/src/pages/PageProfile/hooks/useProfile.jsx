import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ApiEmployees = "http://localhost:4000/api/employees"; // API de empleados

export const useProfile = (userId) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // Obtener info del perfil
  const getProfile = async () => {
    try {
      const res = await fetch(`${ApiEmployees}/${userId}`);
      if (!res.ok) throw new Error("Error al cargar perfil");
      const data = await res.json();
      reset(data); // Rellena el formulario
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar la información del perfil");
    }
  };

  // Editar perfil
  const updateProfile = async (data) => {
    try {
      const res = await fetch(`${ApiEmployees}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al actualizar perfil");

      const result = await res.json();
      toast.success("Perfil actualizado correctamente");
      reset(result.employee); // Actualiza valores del form
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar los cambios");
    }
  };

  // Cargar al inicio
  useEffect(() => {
    if (userId) {
      console.log("Cargando perfil para userId:", userId);
      getProfile();
    }
  }, [userId]);

  return {
    register,
    handleSubmit,
    updateProfile,
    isSubmitting,
  };
};
