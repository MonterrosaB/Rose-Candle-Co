// Hook para contar empleados en la db, si no hay ninguno, se crea el primer usuario
import { useEffect, useState } from "react";
import { useAuth } from "../../../global/hooks/useAuth";


export function useHasEmployees() {

  const { API } = useAuth();

  const [hasEmployees, setHasEmployees] = useState(null);
  const [loadingEmployee, setLoadingEmployee] = useState(true);

  // Función para consultar si hay empleados
  const fetchHasEmployees = async () => {
    try {
      const res = await fetch(API + "/employees/count");
      const data = await res.json();
      setHasEmployees(data.count > 0); // true si hay al menos uno
    } catch (error) {
      console.error("Error al verificar empleados:", error);
      setHasEmployees(true);
    } finally {
      setLoadingEmployee(false);
    }
  };

  useEffect(() => {
    fetchHasEmployees();
  }, []);

  return {
    hasEmployees,
    refetchHasEmployees: fetchHasEmployees,
    loadingEmployee
  };
}