// Manejo de rutas privadas con roles
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export const PrivateRoute = ({ allowedRoles = ["admin", "employee"] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Determinar el rol del usuario
  const userRole = user?.isAdmin ? "admin" : "employee";

  if (!allowedRoles.includes(userRole)) {
    // Si no tiene permiso, redirige a home o a una página de error
    return <Navigate to="/home" replace />;
  }

  return <Outlet />; // Permite acceder a las rutas hijas
};
