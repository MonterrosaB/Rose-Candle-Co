// Hook personalizado para usar el contexto de autenticación
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export const useAuth = () => {
  return useContext(AuthContext);
};