import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";



const useRawMaterialCategories = (methods) => {

  const { API } = useAuth();

  const ApiRawMaterialCategories = API + "/rawmaterialcategories";


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [categories, setCategories] = useState([]);

  // Obtener todas las categorías de materias primas
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

  // Crear nueva categoría
  const createCategory = async (newCategory) => {
    try {
      const res = await fetch(ApiRawMaterialCategories, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newCategory),
      });
      if (!res.ok) throw new Error("Error al crear categoría");
      toast.success("Categoría agregada");
      getCategories(); // Actualizar lista tras creación
    } catch (error) {
      console.error(error);
      toast.error("No se pudo agregar categoría");
    }
  };

  // Actualizar categoría por ID
  const updateCategory = async (id, updatedCategory) => {
    try {
      const res = await fetch(`${ApiRawMaterialCategories}/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategory),
      });
      if (!res.ok) throw new Error("Error al actualizar categoría");
      toast.success("Categoría actualizada");
      getCategories(); // Actualizar lista tras actualización
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar categoría");
    }
  };

  // Eliminar categoría por ID
  const deleteCategory = async (id) => {
    try {
      const res = await fetch(`${ApiRawMaterialCategories}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al eliminar categoría");
      toast.success("Categoría eliminada");
      getCategories(); // Actualizar lista tras eliminación
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar categoría");
    }
  };

  // Eliminar categoría por ID
  const softDeleteCategory = async (id) => {
    try {
      const res = await fetch(`${ApiRawMaterialCategories}/softdelete/${id}`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al eliminar categoría");
      toast.success("Categoría eliminada");
      getCategories(); // Actualizar lista tras eliminación
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar categoría");
    }
  };

  // Restaurar colección por ID
  const restoreCategory = async (id) => {
    try {
      const res = await fetch(`${ApiRawMaterialCategories}/restore/${id}`, {
        method: "PATCH",
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error("Error al restaurar la categoría");
      }
      toast.success("Categoría restaurada exitosamente");
      getCategories(); // Actualizar lista tras eliminación
    } catch (error) {
      console.error("Restore error:", error);
      toast.error("No se pudo restaurar la categoría");
    }
  };

  // Cargar categorías al montar el hook
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
    softDeleteCategory,
    restoreCategory
  };
};

export default useRawMaterialCategories;