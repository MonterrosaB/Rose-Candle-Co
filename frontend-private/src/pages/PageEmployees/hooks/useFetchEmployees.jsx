import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ApiEmployees = "https://rose-candle-co.onrender.com/api/employees";

const useFetchEmployees = () => {
  const [employees, setEmployees] = useState([]);

  // Función para todos los empleados
  const getEmployees = async () => {
    try {
      const response = await fetch(ApiEmployees);
      if (!response.ok) {
        throw new Error("Error fetching employees");
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Error fetching employees");
    }
  };

  // Función para empleado por id
  const getEmployeeById = async (id) => {
    try {
      const response = await fetch(`${ApiEmployees}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch employee");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching employee:", error);
      toast.error("Failed to fetch employee");
      return null;
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return {
    employees,
    getEmployeeById,
    getEmployees
  };
};

export default useFetchEmployees;
