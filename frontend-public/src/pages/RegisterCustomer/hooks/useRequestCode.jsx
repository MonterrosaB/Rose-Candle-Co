// Hook para solicitar el envío de un código de verificación al correo
import { toast } from "react-hot-toast";

export const useRequestCode = () => {
  // Función asíncrona que solicita al backend el envío del código
  const requestCode = async ({ email }) => {
    if (!email) {
      toast.error("El correo electrónico es requerido");
      return false;
    }

    // Muestra un toast de carga mientras se envía el código
    const toastId = toast.loading("Enviando código...");

    try {
      // Realiza una solicitud POST al backend con el correo electrónico
      const res = await fetch(
        "https://rose-candle-co.onrender.com/api/registerCustomer/requestCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          credentials: "include", // Envía cookies (para sesiones)
        }
      );

      const data = await res.json();

      // Si la respuesta es exitosa, muestra mensaje de éxito
      if (res.ok) {
        toast.success("Código enviado al correo", { id: toastId });
        return true;
      } else {
        // Si hay un error del servidor o correo inválido
        toast.error(data.message || "No se pudo enviar el código.", {
          id: toastId,
        });
        return false;
      }
    } catch (error) {
      // Maneja errores de red u otros fallos inesperados
      console.error("Error requesting code:", error);
      toast.error("Error del servidor.", { id: toastId });
      return false;
    }
  };

  // Devuelve la función para usarla en el componente
  return { requestCode };
};
