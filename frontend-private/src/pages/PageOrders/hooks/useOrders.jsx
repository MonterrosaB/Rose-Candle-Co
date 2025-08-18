import { Import } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

//
const useOrders = (methods) => {
  // Inicializamos react-hook-form internamente
  const { register, handleSubmit, formState: { errors }, setValue, control, watch, reset } = methods;

  const [products, setProducts] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  // Obtener productos desde el backend
  const getProductsForOrders = async () => {
    try {
      const res = await fetch("https://rose-candle-co.onrender.com/api/products/productsOrders");
      if (!res.ok) throw new Error("Error al obtener los productos");
      const data = await res.json();
      setProducts(data);
      console.log("Productos obtenidos:", data);
    } catch (error) {
      console.error("Error en getProductsForOrders:", error);
      alert("No se pudieron obtener los productos");
    }
  };

  const getSalesOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("https://rose-candle-co.onrender.com/api/salesOrder");
      if (!res.ok) throw new Error("Error al obtener órdenes");
      const data = await res.json();

      const formatted = data.map(order => {
        const products = order.idShoppingCart?.products?.map(p => ({
          idProduct: p.idProduct?._id,
          name: p.idProduct?.name,
          quantity: p.quantity,
          subtotal: p.subtotal,
          selectedVariantIndex: p.selectedVariantIndex
        })) || [];

        const totalPrice = products.reduce((sum, p) => sum + (isNaN(Number(p.subtotal)) ? 0 : Number(p.subtotal)), 0);
        const totalProducts = products.reduce((sum, p) => sum + (isNaN(Number(p.quantity)) ? 0 : Number(p.quantity)), 0);

        const ultimoEstado = (order) => {
          const estados = order.shippingState || [];
          return estados.length > 0 ? estados[estados.length - 1] : null;
        };

        const estadoFinal = ultimoEstado(order);

        return {
          _id: order._id,
          idShoppingCart: order.idShoppingCart?._id || "",
          name: order.idShoppingCart?.idUser?.name || "Sin cliente",
          paymentMethod: order.paymentMethod || "No especificado",
          email: order.idShoppingCart?.idUser?.email || "",
          firstName: order.address?.firstName || "",
          lastName: order.address?.lastName || "",
          phone: order.address?.phone || "",
          address: order.address?.address || "",
          city: order.address?.city || "",
          state: order.address?.state || "",
          zipCode: order.address?.zipCode || "",
          country: order.address?.country || "",
          saleDate: order.saleDate,
          shippingTotal: order.shippingTotal,
          total: order.total,
          shippingState: estadoFinal?.state || "",
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          products,
          totalProducts,
          totalPrice
        };
      });

      setSalesOrders(formatted);
    } catch (error) {
      console.error("Error al traer órdenes:", error);
      setOrdersError(error);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Crear orden en 
  const createSalesOrderPrivate = async (orderData) => {
    try {
      const res = await fetch("https://rose-candle-co.onrender.com/api/salesOrder/createSalesOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error al crear orden:", errorData);
        return null;
      }

      const data = await res.json();
      console.log("Orden creada:", data);
      reset(); // limpiar formulario
      getSalesOrders();
      return data; // retorna la orden creada
    } catch (error) {
      console.error("Error de red:", error);
      return null;
    }
  };
  //PUT
  const updateOrder = async (id, orderData) => {
    try {
      console.log(orderData);

      const res = await fetch(`https://rose-candle-co.onrender.com/api/salesOrder/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shippingState: orderData }), // Aquí va como objeto

      });


      if (!res.ok) throw new Error("Error al actualizar la orden");

      const data = await res.json();
      getSalesOrders();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsForOrders();
    getSalesOrders();
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    control,
    watch,
    createSalesOrderPrivate,
    updateOrder,
    products,
    reset,
    getProductsForOrders,
    salesOrders,
    loadingOrders,
    ordersError,
    getSalesOrders
  };
};


export default useOrders;
