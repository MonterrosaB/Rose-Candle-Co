import { Import } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

//
const useOrders = (methods) => {
  // Inicializamos react-hook-form internamente
  const { register, handleSubmit, reset, formState: { errors }, setValue, control, watch } = methods;

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState(() => {
    if (initialData?.products) {
      return initialData.products.reduce((acc, p) => {
        acc[p.idProduct] = p.quantity;
        return acc;
      }, {});
    }
    return {};
  });
  // Obtener productos desde el backend
  const getProductsForOrders = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/products/productsOrders");
      if (!res.ok) throw new Error("Error al obtener los productos");
      const data = await res.json();
      setProducts(data);
      console.log("Productos obtenidos:", data);
    } catch (error) {
      console.error("Error en getProductsForOrders:", error);
      alert("No se pudieron obtener los productos");
    }
  };

  // Crear orden en 
  const createSalesOrderPrivate = async (orderData) => {
    try {
      const res = await fetch("http://localhost:4000/api/salesOrder/createSalesOrder", {
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
      return data; // retorna la orden creada
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de conexión con el servidor");
      return null;
    }
  };
  //PUT
  const updateOrder = async (id, orderData) => {
    try {
      const res = await fetch(`http://localhost:4000/api/salesOrder/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Error al actualizar la orden");

      const data = await res.json();
      alert("Orden actualizada con éxito");
      reset();
      setEditingOrderId(null);
      return data;
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar la orden");
    }
  };

  useEffect(() => {
    getProductsForOrders();
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    control,
    watch,
    createSalesOrderPrivate,
    products,
    quantities,
    setQuantities,
  };
};


export default useOrders;
