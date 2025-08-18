import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Clientes
const ApiCustomers = "https://rose-candle-co.onrender.com/api/customers/count";
const ApiCustomersByMonth = "https://rose-candle-co.onrender.com/api/customers/countByMonth";

// Pedidos
const ApiOrders = "https://rose-candle-co.onrender.com/api/salesOrder/countTotal";

// Ingresos
const ApiEarnings = "https://rose-candle-co.onrender.com/api/salesOrder/totalEarnings";

// Stock
const ApiLowStock = "https://rose-candle-co.onrender.com/api/rawMaterials/lowStock";

// Productos
const ApiBestSellingProducts = "https://rose-candle-co.onrender.com/api/cart/bestSellingProducts";

// Últimos pedidos
const ApiLatestOrders = "https://rose-candle-co.onrender.com/api/salesOrder/latestOrders";

const useHome = () => {
  // Clientes
  const [customerCount, setCustomerCount] = useState(0);
  const [latestCustomerCount, setLatestCustomerCount] = useState(0);

  // Pedidos
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentMonthOrders, setCurrentMonthOrders] = useState(0);

  // Ingresos
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);

  // Materias primas
  const [lowStockMaterials, setLowStockMaterials] = useState([]);

  // Productos más vendidos
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  // Pedidos
  const [latestOrders, setLatestOrders] = useState([]);

  // Contador de usuarios
  const getCustomers = async () => {
    try {
      const res = await fetch(ApiCustomers);
      if (!res.ok) throw new Error("Error al obtener usuarios");

      const data = await res.json();

      // Devuelve el número de la cuenta
      setCustomerCount(data.count || 0);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar la cantidad de clientes");
    }
  };

  // Contador de usuarios del último mes
  const getLatestCustomers = async () => {
    try {
      const res = await fetch(ApiCustomersByMonth);
      if (!res.ok) throw new Error("Error al obtener usuarios");

      const data = await res.json();

      // Devuelve el número de la cuenta
      setLatestCustomerCount(data.count || 0);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar la cantidad de clientes");
    }
  };

  // Contador de pedidos (total y del mes actual)
  const getOrdersCount = async () => {
    try {
      const res = await fetch(ApiOrders);
      if (!res.ok) throw new Error("Error al obtener pedidos");

      const data = await res.json();
      setTotalOrders(data.totalOrders || 0);
      setCurrentMonthOrders(data.currentMonthOrders || 0);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar la cantidad de pedidos");
    }
  };

  // Obtener ingresos totales y del mes
  const getEarnings = async () => {
    try {
      const res = await fetch(ApiEarnings);
      if (!res.ok) throw new Error("Error al obtener ingresos");

      const data = await res.json();
      setTotalEarnings(data.totalEarnings || 0);
      setMonthlyEarnings(data.monthlyEarnings || 0);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar los ingresos");
    }
  };

  // Obtener materias primas con menos stock
  const getLowStockMaterials = async () => {
    try {
      const res = await fetch(ApiLowStock);
      if (!res.ok)
        throw new Error("Error al obtener materiales con bajo stock");

      const data = await res.json();
      setLowStockMaterials(data || []);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar el stock bajo de materias primas");
    }
  };

  // Obtener productos más vendidos
  const getBestSellingProducts = async () => {
    try {
      const res = await fetch(ApiBestSellingProducts, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al obtener productos más vendidos");

      const data = await res.json();
      setBestSellingProducts(data || []);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar los productos más vendidos");
    }
  };

  // Obtener últimos pedidos
  const getLatestOrders = async () => {
    try {
      const res = await fetch(ApiLatestOrders);
      if (!res.ok) throw new Error("Error al obtener últimos pedidos");

      const data = await res.json();
      setLatestOrders(data || []);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar la lista de últimos pedidos");
    }
  };

  // Cargar automáticamente
  useEffect(() => {
    getCustomers();
    getLatestCustomers();
    getOrdersCount();
    getEarnings();
    getLowStockMaterials();
    getBestSellingProducts();
    getLatestOrders();
  }, []);

  return {
    // Clientes
    customerCount,
    latestCustomerCount,
    getCustomers,
    getLatestCustomers,

    // Pedidos
    totalOrders,
    currentMonthOrders,
    getOrdersCount,

    // Ingresos
    totalEarnings,
    monthlyEarnings,
    getEarnings,

    // Materias primas
    lowStockMaterials,
    getLowStockMaterials,

    // Productos más vendidos
    bestSellingProducts,
    getBestSellingProducts,

    // Últimos pedidos
    latestOrders,
    getLatestOrders,
  };
};

export default useHome;
