// Manejo de rutas privadas
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};