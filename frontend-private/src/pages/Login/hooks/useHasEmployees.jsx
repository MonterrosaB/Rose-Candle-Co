// Hook para contar empleados en la db, si no hay ninguno, se crea el primer usuario
import { useEffect, useState } from "react";

export function useHasEmployees() {
  const [hasEmployees, setHasEmployees] = useState(null);

  // Función para consultar si hay empleados
  const fetchHasEmployees = async () => {
    try {
      const res = await fetch("https://rose-candle-co.onrender.com/api/employees/count");
      const data = await res.json();
      setHasEmployees(data.count > 0); // true si hay al menos uno
    } catch (error) {
      console.error("Error al verificar empleados:", error);
      setHasEmployees(true);
    }
  };

  useEffect(() => {
    fetchHasEmployees();
  }, []);

  return {
    hasEmployees,
    refetchHasEmployees: fetchHasEmployees,
  };
}