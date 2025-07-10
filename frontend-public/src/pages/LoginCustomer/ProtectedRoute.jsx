import { useAuth } from "../../global/hooks/useAuth.js";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    toast.error("Debes iniciar sesión para agregar productos al carrito");
    return <Navigate to="/loginCustomer" replace />;
  }

  return children;
}

export default ProtectedRoute;
