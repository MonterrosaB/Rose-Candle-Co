import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ApiCollections = "http://localhost:4000/api/collections"; // Ajusta tu endpoint

const useCollections = (methods) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch(ApiCollections);
      if (!res.ok) throw new Error("Error al obtener colecciones");
      const data = await res.json();
      setCollections(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar colecciones");
    }
  };

  const createCollection = async (newCollection) => {
    try {
      const res = await fetch(ApiCollections, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCollection),
      });
      if (!res.ok) throw new Error("Error al crear colección");
      toast.success("Colección agregada");
      getCollections();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo agregar colección");
    }
  };

  const updateCollection = async (id, updatedCollection) => {
    try {
      const res = await fetch(`${ApiCollections}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCollection),
      });
      if (!res.ok) throw new Error("Error al actualizar colección");
      toast.success("Colección actualizada");
      getCollections();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar colección");
    }
  };

  const deleteCollection = async (id) => {
    try {
      const res = await fetch(`${ApiCollections}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar colección");
      toast.success("Colección eliminada");
      getCollections();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar colección");
    }
  };

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
    deleteCollection,
  };
};

export default useCollections;
