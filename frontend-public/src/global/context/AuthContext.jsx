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
  const [authCokie, setAuthCokie] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://rose-candle-co.onrender.com/api";

  const navigate = useNavigate();

  // Eliminar sesión: token local, cookie, y estado
  const clearSession = () => {
    localStorage.removeItem("token");
    Cookies.remove("authToken", { path: "/" });
    setUser(null);
    setAuthCokie(null);
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
  const login = async (email, password) => {
    try {
      if (!email || !password) {
        toast.error("Por favor completa todos los campos");
        return false;
      }

      console.log("Enviando login:", { email, password });

      const response = await fetch(`${API_URL}/loginCustomer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token; // Ahora tomas el token del body
        const user = data.customer; // Y el usuario

        if (token && user) {
          localStorage.setItem("token", token);
          setAuthCokie(token); // O "true"
          setUser(user);
          return true;
        } else {
          toast.error("Datos incompletos recibidos del servidor");
          return false;
        }
      } else {
        if (
          data.message === "Cliente no encontrado" ||
          data.message === "Contraseña incorrecta"
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

  // Verificar sesión automáticamente al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/loginCustomer/verifyCustomer`, 
          {
          method: "GET",
          credentials: "include", // <--- manda la cookie automáticamente
        });

        if (response.ok) {
          const data = await response.json();

          // Usa los datos devueltos
          if (data.customer) {
            setUser(data.customer);
            setAuthCokie("true"); // Solo un flag para decir "sí hay sesión"
          } else {
            clearSession();
          }
        } else {
          clearSession();
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API_URL]);

  const isAuthenticated = !!authCokie;

  // Valor global del contexto
  const contextValue = {
    user,
    setUser,
    authCokie,
    isAuthenticated, // ← ¡Esta línea es clave!
    loading,
    login,
    logout,
    API: API_URL,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
