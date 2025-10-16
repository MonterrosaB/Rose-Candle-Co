import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";

const useBestSellers = () => {
  const { API } = useAuth();
  const ApiProducts = API + "/products";

  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET - Obtener productos más vendidos
  const getBestSellers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ApiProducts}/bestSellers`, {
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Error al obtener productos más vendidos");
      
      const data = await res.json();
      
      // Limitar a máximo 4 productos para el home
      setBestSellers(data.slice(0, 4));
      return data;
    } catch (error) {
      console.error("Error al cargar productos más vendidos:", error);
      toast.error("No se pudo cargar los productos más vendidos");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBestSellers();
  }, []);

  return {
    bestSellers,
    loading,
    getBestSellers,
  };
};

export default useBestSellers;