import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";


const useProducts = (methods) => {
  const { API } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    unregister,
  } = methods;

  // Api de productos
  const ApiProducts = API + "/products";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [components, setComponents] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [availability, setAvailability] = useState("");
  const [useForm, setUseForm] = useState([]);
  const [currentPrice, setCurrentPrice] = useState("");
  const [idProductCategory, setIdProductCategory] = useState("");
  const [errorProduct, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const cleanData = () => {
    setName("");
    setDescription("");
    setImages([]);
    setComponents([]);
    setRecipe([]);
    setAvailability("");
    setUseForm([]);
    setCurrentPrice("");
    setIdProductCategory("");
    setId("");
  };

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

  const createProduct = async (formData) => {
    return toast.promise(
      (async () => {
        const response = await fetch(ApiProducts, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error del servidor: ${errorText}`);
        }

        const data = await response.json();

        cleanData();
        productsQuery.refetch();

        return data; // importante: para que toast.promise sepa que terminó bien
      })(),
      {
        loading: "Guardando producto...",
        success: "Producto registrado correctamente 🎉",
        error: "Ocurrió un error al registrar el producto 😥",
      }
    );
  };

  const handleUpdate = async (idProduct, formData) => {
    return toast.promise(
      (async () => {
        const response = await fetch(`${ApiProducts}/${idProduct}`, {
          method: "PUT",
          body: formData,
          credentials: "include"
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error del servidor: ${errorText}`);
        }

        const data = await response.json();

        cleanData();
        productsQuery.refetch();

        return data; // importante: para que toast.promise sepa que terminó bien
      })(),
      {
        loading: "Actualizando producto...",
        success: "Producto actualizado correctamente",
        error: "Ocurrió un error al actualizar el producto",
      }
    );
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${ApiProducts}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const result = await response.json();
      console.log("Deleted:", result);
      toast.success("Producto eliminado");
      productsQuery.refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error al eliminar el producto");
    }
  };

  return {
    activeTab,
    setActiveTab,
    id,
    setId,
    name,
    setName,
    description,
    setDescription,
    images,
    setImages,
    components,
    setComponents,
    recipe,
    setRecipe,
    availability,
    setAvailability,
    useForm,
    setUseForm,
    currentPrice,
    setCurrentPrice,
    idProductCategory,
    setIdProductCategory,
    errorProduct,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    products: productsQuery.data || [],
    cleanData,
    productsQuery,
    deleteProduct,
    handleUpdate,
    // RHF
    register,
    unregister,
    reset,
    errors,
    control,
    handleSubmit,
    createProduct,
  };
};

// Exporto
export default useProducts;
