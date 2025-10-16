import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth.js"; // auth para el id del usuario logueado


export const useUserInformation = () => {
  const { user, API } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    surnames: "",
    phone: "",
    email: "",
  });

  const ApiCustomers = API + "/customers"; // api para el cliente


  // Obtener perfil desde backend
  const fetchProfile = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`${ApiCustomers}/${user.id}`);
      if (!res.ok) throw new Error("Error al cargar perfil");

      const data = await res.json();
      setProfile({
        name: data.name || "",
        surnames: data.surnames || "",
        phone: data.phone || "",
        email: data.email || "",
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar el perfil"); // alerta fija del frontend
    }
  };

  // Guardar cambios en backend
  const updateProfile = async () => {
    try {
      const res = await fetch(`${ApiCustomers}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar perfil");
      }

      await res.json();

      toast.success("Perfil actualizado correctamente"); // alerta fija del frontend

    } catch (error) {
      console.error(error);
      toast.error("No se pudieron guardar los cambios"); // alerta fija del frontend
      throw error;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    setProfile,
    loading,
    updateProfile,
  };
};
