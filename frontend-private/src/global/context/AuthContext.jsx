// Hook para manejar funciones de inicio de sesión
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Crear y exportar el contexto
const AuthContext = createContext(null);
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://rose-candle-co.onrender.com/api";

  const navigate = useNavigate();

  // Eliminar sesión: token local, cookie, y estado
  const clearSession = () => {
    Cookies.remove("authToken", { path: "/" });
    setUser(null);
    setIsAuthenticated(false);
  };

  // Cerrar sesión: notificar backend y limpiar sesión
  const logout = useCallback(() => {
    const logoutUser = async () => {
      try {
        await fetch(`${API_URL}/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.error("Error durante el logout:", error);
      } finally {
        clearSession();
        navigate("/");
        toast.success("Sesión cerrada correctamente");
      }
    };

    logoutUser();
  }, [API_URL, navigate]);

  // Iniciar sesión: enviar datos, guardar token y validar
  const login = async (user, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);

        // Obtener usuario desde el endpoint protegido
        const userData = await verifySession();
        if (userData) {
          setUser(userData);
        }

        console.log(userData);


        return true;
      } else {
        if (
          data.message === "User not found" ||
          data.message === "Invalid password"
        ) {
          toast.error("Credenciales incorrectas");
        } else {
          toast.error(data.message || "Error al iniciar sesión");
        }
        return false;
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      toast.error("Error de conexión con el servidor");
      return false;
    }
  };



  const verifySession = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/verify`, {
        method: "GET",
        credentials: "include", // Necesario para enviar cookies
      });

      if (!res.ok) {
        throw new Error("No autorizado");
      }

      const data = await res.json();
      console.log("Sesión válida:", data);

      // Aquí podrías setear el usuario al contexto
      return data;

    } catch (error) {
      console.error("Error al verificar sesión:", error.message);
      return null;
    }
  };

  // Verificar sesión automáticamente al cargar la app
  useEffect(() => {
    const checkSession = async () => {

      try {
        const data = await verifySession();
        setUser(data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Valor global del contexto
  const contextValue = {
    user,
    loading,
    login,
    logout,
    API: API_URL,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
