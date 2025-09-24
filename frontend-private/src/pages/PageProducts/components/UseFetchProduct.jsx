import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../global/hooks/useAuth";

const useFetchProduct = () => {

  const { API } = useAuth();


  const ApiProducts = API + "/products";

  const fetcher = async (url, transform) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error fetching data");
    const data = await res.json();
    return transform ? transform(data) : data;
  };

  // Obtener datos
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => fetcher(ApiProducts),
    onError: () => toast.error("Error al obtener los productos"),
  });

  console.log(productsQuery.data);



  const getProductById = async (id) => {
    try {
      const response = await fetch(`${ApiProducts}/${id}`);
      if (!response.ok) {
        console.log("Failed to fetch Products");
        throw new Error("Failed to fetch Products");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Products:", error);
      console.log("Failed to fetch Products");
      return null;
    }
  };

  return {
    products: productsQuery.data ?? [], // 👈 aseguramos array vacío 
    getProducts: productsQuery,
    getProductById
  }
};

export default useFetchProduct;