import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../global/context/AuthContext";
import toast from "react-hot-toast";

export const useProfile = () => {
  const { user, API } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      type: "casa",
    },
  });

  // Función para cargar direcciones del backend
  const fetchAddresses = async () => {
    if (!user?.id) return;
    try {
      const response = await fetch(`${API}/customers/${user.id}/addresses`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error al obtener direcciones");
      const data = await response.json();
      setAddresses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  // Función para agregar
  const addAddress = async (data) => {
    if (!user?.id) {
      alert("Usuario no autenticado.");
      return;
    }

    const payload = {
      ...data,
      id: Date.now().toString(),
      isDefault: false,
    };

    try {
      const response = await fetch(`${API}/customers/${user.id}/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al guardar la dirección");
      }

      await fetchAddresses(); // Actualizamos lista completa
      toast.success("Dirección agregada exitosamente");
      reset();
      setIsAdding(false);
    } catch (err) {
      console.error("Error al agregar dirección:", err);
      alert(err.message);
    }
  };

  // Función para eliminar
  const deleteAddress = async (addressId) => {
    try {
      const response = await fetch(
        `${API}/customers/${user.id}/addresses/${addressId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Error al eliminar la dirección");

      toast.success("Dirección eliminada exitosamente");
      await fetchAddresses(); // Actualizamos lista completa
    } catch (err) {
      console.error("Error al eliminar dirección:", err);
      alert(err.message);
    }
  };

  // Función para actualizar, recibe id y datos
  const updateAddress = async (addressId, data) => {
    if (!user?.id) {
      alert("Usuario no autenticado.");
      return;
    }

    try {
      const response = await fetch(
        `${API}/customers/${user.id}/addresses/${addressId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar la dirección");
      }

      toast.success("Dirección actualizada exitosamente");
      await fetchAddresses(); // Actualizamos lista completa
      reset();
      setIsAdding(false);
    } catch (err) {
      console.error("Error al editar dirección:", err);
      toast.error("Error al editar dirección");
      alert(err.message);
    }
  };

  return {
    addresses,
    isAdding,
    setIsAdding,
    addAddress,
    deleteAddress,
    updateAddress,
    register,
    handleSubmit,
    errors,
    reset,
  };
};
