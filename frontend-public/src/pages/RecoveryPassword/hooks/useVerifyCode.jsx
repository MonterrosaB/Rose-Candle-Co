// Hook para verificar el código de recuperación
import { toast } from "react-hot-toast";

export const useVerifyCode = () => {
  // Función para enviar el código ingresado al backend
  const verifyCode = async ({ code }) => {
    // Muestra mensaje de carga
    const toastId = toast.loading("Verificando código...");

    try {
      // Realiza la solicitud POST con el código al backend
      const res = await fetch(
        "https://rose-candle-co.onrender.com/api/recoveryPassword/verifyCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
          credentials: "include", // Incluye cookies en la solicitud
        }
      );

      const data = await res.json();

      // Si el código es correcto, muestra mensaje de éxito
      if (res.ok && data.message === "Code verified successfully") {
        toast.success("Código verificado correctamente.", { id: toastId });
        return true;
      } else {
        // Muestra mensaje de error si el código es inválido
        toast.error(data.message || "Código inválido.", { id: toastId });
        return false;
      }
    } catch (error) {
      // Muestra error si falla la conexión o el servidor
      toast.error("Error al verificar el código.", { id: toastId });
      return false;
    }
  };

  // Retorna la función para ser utilizada en componentes
  return { verifyCode };
};
