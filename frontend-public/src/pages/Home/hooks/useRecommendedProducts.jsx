import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";

const useRecommendedProducts = () => {
  const { API } = useAuth();
  const ApiSettings = API + "/settings";

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET - Obtener productos recomendados con detalles completos
  const getRecommendedProductsWithDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ApiSettings}/recommended-products/list`, {
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Error al obtener productos recomendados");
      
      const data = await res.json();
      
      // Filtrar productos que estén disponibles y tengan datos completos
      const validProducts = data.recommendedProducts?.products
        ?.filter(item => item.idProduct && !item.idProduct.deleted && item.idProduct.availability)
        .map(item => item.idProduct) || [];
      
      setRecommendedProducts(validProducts);
      return validProducts;
    } catch (error) {
      console.error("Error al cargar productos recomendados:", error);
      toast.error("No se pudo cargar productos recomendados");
      return [];
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getRecommendedProductsWithDetails();
  }, []);

  return {
    recommendedProducts,
    loading,
    getRecommendedProductsWithDetails,
  };
};

export default useRecommendedProducts;