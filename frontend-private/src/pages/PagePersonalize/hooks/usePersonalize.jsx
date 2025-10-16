// hooks/useSettings.js
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";

const useSettings = () => {
  const { API } = useAuth();
  const ApiSettings = API + "/settings";

  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);

  // GET - Obtener configuración
  const getSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch(ApiSettings, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al obtener configuración");
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar la configuración");
    } finally {
      setLoading(false);
    }
  };

  // PATCH - Actualizar Marquee
  const updateMarquee = async (name) => {
    try {
      const res = await fetch(`${ApiSettings}/marquee`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al actualizar marquee");

      toast.success("Marquee actualizado exitosamente");
      getSettings();
    } catch (error) {
      console.error("Error en updateMarquee:", error.message);
      toast.error(error.message || "No se pudo actualizar marquee");
      throw error;
    }
  };

  // PATCH - Actualizar Colección de Temporada
const updateSeasonalCollection = async (data) => {
  try {
    const formData = new FormData();
    formData.append("idCollection", data.idCollection);
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("availableUntil", data.availableUntil || "");
    formData.append("isConstant", data.isConstant || false);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const res = await fetch(`${ApiSettings}/seasonal-collection`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });

    const responseData = await res.json();
    if (!res.ok) throw new Error(responseData.message || "Error al actualizar colección de temporada");

    toast.success("Colección de temporada actualizada");
    getSettings();
  } catch (error) {
    console.error("Error en updateSeasonalCollection:", error.message);
    toast.error(error.message || "No se pudo actualizar la colección");
    throw error;
  }
};

  // PATCH - Actualizar Inspiración
  const updateInspiration = async (data) => {
    try {
      const res = await fetch(`${ApiSettings}/inspiration`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || "Error al actualizar inspiración");

      toast.success("Inspiración actualizada exitosamente");
      getSettings();
    } catch (error) {
      console.error("Error en updateInspiration:", error.message);
      toast.error(error.message || "No se pudo actualizar inspiración");
      throw error;
    }
  };

  // PATCH - Actualizar Productos Recomendados
  const updateRecommendedProducts = async (data) => {
    try {
      const res = await fetch(`${ApiSettings}/recommended-products`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || "Error al actualizar productos recomendados");

      toast.success("Productos recomendados actualizados");
      getSettings();
    } catch (error) {
      console.error("Error en updateRecommendedProducts:", error.message);
      toast.error(error.message || "No se pudo actualizar productos");
      throw error;
    }
  };

  // GET - Obtener solo productos recomendados
  const getRecommendedProducts = async () => {
    try {
      const res = await fetch(`${ApiSettings}/recommended-products/list`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al obtener productos recomendados");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar productos recomendados");
      throw error;
    }
  };

  // DELETE - Eliminar un producto de recomendados
  const removeRecommendedProduct = async (productId) => {
    try {
      const res = await fetch(`${ApiSettings}/recommended-products/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al eliminar producto");

      toast.success("Producto eliminado de recomendados");
      getSettings();
    } catch (error) {
      console.error("Error en removeRecommendedProduct:", error.message);
      toast.error(error.message || "No se pudo eliminar producto");
      throw error;
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  return {
    settings,
    loading,
    getSettings,
    updateMarquee,
    updateSeasonalCollection,
    updateInspiration,
    updateRecommendedProducts,
    getRecommendedProducts,
    removeRecommendedProduct,
  };
};

export default useSettings;