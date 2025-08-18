import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useProducts = (methods) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    unregister
  } = methods;

  // Api de productos
  const ApiProducts = "https://rose-candle-co.onrender.com/api/products";

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
  const [products, setProducts] = useState([]);

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

  // Guardar datos
  const createProduct = async (formData) => {
    setLoading(true);
    try {

      const response = await fetch(ApiProducts, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${errorText}`);
      }

      const data = await response.json();

      toast.success("Producto registrado correctamente");
      setSuccess("Producto registrado correctamente");
      setProducts(data);
      cleanData();
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      toast.error("Ocurrió un error al registrar el producto");
    } finally {
      setLoading(false);
    }
  };

  // Obtener datos
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(ApiProducts);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error al eliminar el producto");
    }
  };

  const handleUpdate = async (idProduct, formData) => {

    try {
      setLoading(true);

      const response = await fetch(`${ApiProducts}/${idProduct}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

      toast.success("Producto actualizado");
      setSuccess("Producto actualizado correctamente");
      //reset();
      fetchData();
    } catch (error) {
      setError(error.message);
      alert("Error al actualizar el producto");
      console.error("Error:", error);
    } finally {
      setLoading(false);
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
    products,
    setProducts,
    cleanData,
    fetchData,
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
