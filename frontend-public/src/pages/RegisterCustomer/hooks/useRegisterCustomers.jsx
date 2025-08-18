import { useState } from "react";
import { toast } from "react-hot-toast";

// Hook personalizado para registrar un nuevo cliente
const useRegisterCustomer = () => {
  // Estados para controlar la carga, éxito y errores del proceso
  const [loading, setLoading] = useState(false); // Indica si está en proceso
  const [error, setError] = useState(null); // Almacena mensaje de error
  const [success, setSuccess] = useState(false); // Indica si el registro fue exitoso

  // Función que envía los datos del cliente al backend
  const registerCustomer = async (customerData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Realiza una solicitud POST al backend con los datos del cliente
      const response = await fetch(
        "https://rose-candle-co.onrender.com/api/registerCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
          credentials: "include", // Envía cookies como el token de sesión
        }
      );

      const data = await response.json();

      // Si el backend devuelve un error, lo maneja y muestra toast
      if (!response.ok) {
        const errorMessage = data.message || "Failed to register customer";
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      }

      // Registro exitoso
      setSuccess(true);
      return data;
    } catch (err) {
      // Manejo de errores de red u otros problemas
      console.error("Registration error:", err);
      const errorMessage = err.message || "Error de conexión";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      // Finaliza el estado de carga sin importar el resultado
      setLoading(false);
    }
  };

  // Devuelve la función de registro y los estados asociados
  return { registerCustomer, loading, error, success };
};

export default useRegisterCustomer;
