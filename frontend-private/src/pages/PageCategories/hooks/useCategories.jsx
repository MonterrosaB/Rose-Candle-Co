import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ApiCategories = "https://rose-candle-co.onrender.com/api/productCategories";

const useCategories = (methods) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [categories, setCategories] = useState([]);

  // Función para obtener todas las categorías desde la API
  const getCategories = async () => {
    try {
      const res = await fetch(ApiCategories);
      if (!res.ok) throw new Error("Error al obtener categorías");
      const data = await res.json();

      // Formatear los datos recibidos para el estado local
      const formatted = data.map((s) => ({
        _id: s._id,
        name: s.name,
        label: s.name,
      }));

      setCategories(formatted);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar categorías");
    }
  };

  // Crear una nueva categoría mediante la API
  const createCategory = async (newCategory) => {
    try {
      const res = await fetch(ApiCategories, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      if (!res.ok) throw new Error("Error al crear categoría");
      toast.success("Categoría creada");
      await getCategories(); // Refrescar la lista después de crear
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear categoría");
    }
  };

  // Actualizar una categoría existente por ID
  const updateCategory = async (id, updatedCategory) => {
    try {
      const res = await fetch(`${ApiCategories}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategory),
      });
      if (!res.ok) throw new Error("Error al actualizar categoría");
      toast.success("Categoría actualizada");
      await getCategories(); // Refrescar la lista después de actualizar
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar categoría");
    }
  };

  // Eliminar una categoría por ID
  const deleteCategory = async (id) => {
    try {
      const res = await fetch(`${ApiCategories}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error al eliminar: ${errorText}`);
      }

      toast.success("Categoría eliminada correctamente");
      // Actualiza el estado local eliminando la categoría borrada
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error("Error eliminando:", error);
      toast.error("No se pudo eliminar categoría");
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
  };
};

export default useCategories;
