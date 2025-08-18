import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../global/context/AuthContext"; // se obtiene el id del usuario logueado

const ApiEmployees = "https://rose-candle-co.onrender.com/api/employees"; // api de empleados

export const useProfile = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      surnames: "",
      phone: "",
      email: "",
      dui: "",
      user: "",
      password: "",
    },
  });

  // Obtener info del perfil
  const getProfile = async () => {
    if (!user?.id) return; // Usamos user.id
    try {
      const res = await fetch(`${ApiEmployees}/${user.id}`);
      if (!res.ok) throw new Error("Error al cargar perfil");
      const data = await res.json();

      reset({
        name: data.name || "",
        surnames: data.surnames || "",
        phone: data.phone || "",
        email: data.email || "",
        dui: data.dui || "",
        user: data.user || "",
        password: "**********",
      });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar la información del perfil");
    }
  };

  // Actualizar perfil
  const updateProfile = async (data) => {
    if (!user?.id) return;
    try {
      const sendData = { ...data };
      if (sendData.password === "**********") delete sendData.password;

      const res = await fetch(`${ApiEmployees}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      if (!res.ok) throw new Error("Error al actualizar perfil");

      const result = await res.json();
      toast.success("Perfil actualizado correctamente");

      reset({
        ...result.employee,
        password: "**********",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar los cambios");
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]); // Ejecuta cuando user cambia

  return {
    register,
    handleSubmit,
    updateProfile,
    isSubmitting,
    reset,
  };
};
