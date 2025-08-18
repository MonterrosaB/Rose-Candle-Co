// Hook para verificar el código de verificación enviado al correo
import { toast } from "react-hot-toast";

export const useVerifyCode = () => {
  // Función asíncrona que envía el código al backend y valida su autenticidad
  const verifyCode = async ({ code }) => {
    if (!code) {
      toast.error("El código de verificación es requerido");
      return false;
    }

    // Muestra un toast de carga mientras se verifica el código
    const toastId = toast.loading("Verificando código...");

    try {
      // Realiza una solicitud POST al backend con el código ingresado
      const res = await fetch(
        "https://rose-candle-co.onrender.com/api/registerCustomer/verifyCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
          credentials: "include", // Envía cookies (para sesiones)
        }
      );

      const data = await res.json();

      // Si el código fue verificado correctamente, muestra éxito
      if (res.ok && data.message === "Code verified successfully") {
        toast.success("Código verificado correctamente", { id: toastId });
        return true;
      } else {
        // Si el código es inválido o el servidor responde con error
        toast.error(data.message || "Código inválido.", { id: toastId });
        return false;
      }
    } catch (error) {
      // Maneja errores de red u otros fallos inesperados
      console.error("Error verifying code:", error);
      toast.error("Error al verificar el código.", { id: toastId });
      return false;
    }
  };

  // Devuelve la función para usarla en el componente
  return { verifyCode };
};
