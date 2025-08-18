import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ApiEmployees = "https://rose-candle-co.onrender.com/api/employees"; // API endpoint para empleados

const useEmployeeAction = (getEmployees) => {
  const navigate = useNavigate();

  // funcion para eliminar un usuario por su id
  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${ApiEmployees}/${id}`, {
        method: "DELETE",
      });
      toast.success("Empleado eliminado correctamente.");
      console.log("Employee deleted:", response);
      getEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error eliminando al empleado.");
    } finally {
      getEmployees();
    }
  };

  // Función para manejar la actualización de un usuario
  const handleUpdateEmployee = (id) => {
    navigate(`/employees/${id}`);
  };

  return {
    deleteEmployee,
    handleUpdateEmployee,
  };
};

export default useEmployeeAction;