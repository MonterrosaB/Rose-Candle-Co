import { useEffect, useState } from "react";
import useFetchProduct from "./useFetchProducts.jsx";
import { useParams } from "react-router-dom";

const useDetailProduct = () => {
  const { id } = useParams();
  const { getProductById } = useFetchProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  return { product, loading };
};

export default useDetailProduct;
