import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ApiRawMaterialCategories = "http://localhost:4000/api/rawmaterialcategories"; // Cambia a tu ruta real

const useRawMaterialCategories = (methods) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await fetch(ApiRawMaterialCategories);
      if (!res.ok) throw new Error("Error al obtener categorías");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar categorías");
    }
  };

  const createCategory = async (newCategory) => {
    try {
      const res = await fetch(ApiRawMaterialCategories, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      if (!res.ok) throw new Error("Error al crear categoría");
      toast.success("Categoría agregada");
      getCategories();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo agregar categoría");
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    try {
      const res = await fetch(`${ApiRawMaterialCategories}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategory),
      });
      if (!res.ok) throw new Error("Error al actualizar categoría");
      toast.success("Categoría actualizada");
      getCategories();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar categoría");
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await fetch(`${ApiRawMaterialCategories}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar categoría");
      toast.success("Categoría eliminada");
      getCategories();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar categoría");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    reset,
    categories,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useRawMaterialCategories;
