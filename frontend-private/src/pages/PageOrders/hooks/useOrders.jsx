import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";


//
const useOrders = (methods) => {
  // Inicializamos react-hook-form internamente
  const { register, handleSubmit, reset, formState: { errors } } = methods;

  const [products, setProducts] = useState([]);

  // Obtener productos desde el backend
  const getProductsForOrders = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/products");
      if (!res.ok) throw new Error("Error al obtener los productos");
      const data = await res.json();
      setProducts(data);
      console.log("Productos obtenidos:", data);
    } catch (error) {
      console.error("Error en getProductsForOrders:", error);
      alert("No se pudieron obtener los productos");
    }
  };

  // Crear orden en MongoDB
  const createOrder = async (orderData) => {
    try {
      const res = await fetch("http://localhost:4000/api/salesOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error al crear orden:", errorData);
        alert(errorData.message || "Error al crear orden");
        return null;
      }

      const data = await res.json();
      console.log("Orden creada:", data);
      alert("Orden creada con éxito");
      reset(); // limpiar formulario
      return data; // devolvemos la orden creada
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de conexión con el servidor");
      return null;
    }
  };

  useEffect(() => {
    getProductsForOrders();
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    createOrder,
    products,
  };
};

export default useOrders;
