import { useEffect, useState } from "react";

const useFetchProduct = () => {

  const ApiProducts = "https://rose-candle-co.onrender.com/api/products";
  //https://rose-candle-co.onrender.com

  const [products, setProducts] = useState([]);

  const getProducts = async () => {

    try {
      const response = await fetch(ApiProducts + "/available")

      if (!response.ok) {
        throw new Error("Error fetching Products");
      }

      const data = await response.json();
      setProducts(data)
    } catch (error) {
      console.error("Error fetching Products", error);
      toast.error("Error fetching Products");
    }
  }


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

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    getProducts,
    getProductById
  }
};

export default useFetchProduct;