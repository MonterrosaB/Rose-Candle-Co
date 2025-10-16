import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";




const useFetchEmployees = () => {

  const { API } = useAuth()

  const ApiEmployees = API + "/employees";

  const [employees, setEmployees] = useState([]);
  // Función auxiliar para formatear el rol (ej. 'super_admin' -> 'Super Admin')
  const formatRole = (role) => {
    if (!role) return '';

    // 1. Reemplaza los guiones bajos por espacios
    const spacedRole = role.replace(/_/g, ' ');

    // 2. Convierte todo a minúsculas, divide por espacios, 
    //    capitaliza la primera letra de cada palabra, y vuelve a unir
    const formattedRole = spacedRole
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return formattedRole;
  };


  // Función para todos los empleados
  const getEmployees = async () => {
    try {
      const response = await fetch(ApiEmployees);
      if (!response.ok) {
        throw new Error("Error fetching employees");
      }
      const data = await response.json();

      // 2. Mapear y formatear los datos para la estética (DUI, Teléfono y Rol)
      const formattedData = data.map(employee => {

        // Formato para Rol (ej. 'admin' -> 'Admin', 'super_admin' -> 'Super Admin')
        const formattedRole = formatRole(employee.role); // ⬅️ CAMBIO ESTÉTICO

        return {
          ...employee,
          role: formattedRole, // Aplica el formato estético al rol
        };
      });

      setEmployees(formattedData);
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
