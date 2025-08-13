import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Clientes
const ApiCustomers = "http://localhost:4000/api/customers/count";
const ApiCustomersByMonth = "http://localhost:4000/api/customers/countByMonth";

// Pedidos
const ApiOrders = "http://localhost:4000/api/salesOrder/countTotal";

// Ingresos
const ApiEarnings = "http://localhost:4000/api/salesOrder/totalEarnings";

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

  // Cargar automáticamente
  useEffect(() => {
    getCustomers();
    getLatestCustomers();
    getOrdersCount();
    getEarnings();
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
  };
};

export default useHome;
