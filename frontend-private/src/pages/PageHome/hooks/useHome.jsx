import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ApiCustomers = "http://localhost:4000/api/customers/count";
const ApiCustomersByMonth = "http://localhost:4000/api/customers/countByMonth";

const useHome = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [latestCustomerCount, setLatestCustomerCount] = useState(0);

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

  // Cargar automáticamente
  useEffect(() => {
    getCustomers();
    getLatestCustomers();
  }, []);

  return {
    customerCount,
    latestCustomerCount,
    getCustomers,
    getLatestCustomers
  };
};

export default useHome;
