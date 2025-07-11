// Aqui se maneja la ruta de inicio para crear el primer usuario
// unicamente visible cuando no hay ningun empleado en la base
import { Navigate } from "react-router-dom";
import { useHasEmployees } from "../../pages/Login/hooks/useHasEmployees.jsx"; // Hook

export function StartRoute({ children }) {
  const { hasEmployees } = useHasEmployees();

  if (hasEmployees) {
    return <Navigate to="/login" replace />;
  }

  return children;
}