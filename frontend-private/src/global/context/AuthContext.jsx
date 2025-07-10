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
  const API_URL = "http://localhost:4000/api";

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
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        const token = Cookies.get("authToken");

        if (token) {
          localStorage.setItem("token", token);
          setAuthCokie(token);
          return true;
        } else {
          toast.error("Token no recibido");
          return false;
        }
      } else {
        // No muestro los mensajes del backend
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

  // Verificar sesión automáticamente al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const cookieToken = Cookies.get("authToken");

        if (token || cookieToken) {
          const validToken = token || cookieToken;

          const response = await fetch(`${API_URL}/products`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${validToken}`,
            },
            credentials: "include",
          });

          if (response.ok) {
            // Extraer datos del usuario desde el token
            const parts = validToken.split(".");
            if (parts.length === 3) {
              const payload = JSON.parse(atob(parts[1]));
              setUser({ id: payload.id, userType: payload.userType });
              setAuthCokie(validToken);
            }
          } else {
            clearSession(); // Token inválido
          }
        } else {
          clearSession(); // No hay token
        }
      } catch (error) {
        console.error("Error verificando la autenticación:", error);
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API_URL]);

  // Valor global del contexto
  const contextValue = {
    user,
    authCokie,
    loading,
    login,
    logout,
    API: API_URL,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
