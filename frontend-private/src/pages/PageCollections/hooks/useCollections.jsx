import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";




const useCollections = (methods) => {

  const { API } = useAuth();

  const ApiCollections = API + "/collections"; // Ajustar endpoint  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [collections, setCollections] = useState([]);

  // Obtener todas las colecciones desde la API
  const getCollections = async () => {
    try {
      const res = await fetch(ApiCollections, {
        credentials: "include"
      });
      if (!res.ok) throw new Error("Error al obtener colecciones");
      const data = await res.json();
      setCollections(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar colecciones");
    }
  };

  // Crear una nueva colección
  const createCollection = async (newCollection) => {
    try {
      const res = await fetch(ApiCollections, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCollection),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Error al crear colección");
      toast.success("Colección agregada");
      getCollections(); // Actualizar lista tras creación
    } catch (error) {
      console.error(error);
      toast.error("No se pudo agregar colección");
    }
  };

  // Actualizar colección existente por ID
  const updateCollection = async (id, updatedCollection) => {
    try {
      const res = await fetch(`${ApiCollections}/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCollection),
      });
      if (!res.ok) throw new Error("Error al actualizar colección");
      toast.success("Colección actualizada");
      getCollections(); // Actualizar lista tras actualización
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar colección");
    }
  };

  // Eliminar colección por ID
  const softDeleteCollection = async (id) => {
    try {
      const res = await fetch(`${ApiCollections}/softdelete/${id}`, {
        method: "PATCH",
        credentials: "include"
      });
      if (!res.ok) throw new Error("Error al eliminar colección");
      toast.success("Colección eliminada");
      getCollections(); // Actualizar lista tras eliminación
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar colección");
    }
  };

  // Eliminar colección por ID
  const hardDeleteCollection = async (id) => {
    try {
      const res = await fetch(`${ApiCollections}/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!res.ok) throw new Error("Error al eliminar colección");
      toast.success("Colección eliminada");
      getCollections(); // Actualizar lista tras eliminación
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar colección");
    }
  };

  // Restaurar colección por ID
  const restoreCollection = async (id) => {
    try {
      const res = await fetch(`${ApiCollections}/restore/${id}`, {
        method: "PATCH",
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error("Error al restaurar la colección");
      }
      toast.success("Colección restaurada exitosamente");
      getCollections(); // Actualizar lista tras eliminación
    } catch (error) {
      console.error("Restore error:", error);
      toast.error("No se pudo restaurar la colección");
    }
  };

  // Cargar colecciones al montar el hook
  useEffect(() => {
    getCollections();
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    reset,
    collections,
    getCollections,
    createCollection,
    updateCollection,
    softDeleteCollection,
    hardDeleteCollection,
    restoreCollection
  };
};

export default useCollections;
