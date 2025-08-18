// Hook para solicitar el código de recuperación por correo
import { toast } from "react-hot-toast";

export const useRequestCode = () => {
  // Función para enviar solicitud del código al backend
  const requestCode = async ({ email }) => {
    // Muestra mensaje de carga
    const toastId = toast.loading("Enviando código...");

    try {
      // Realiza la solicitud POST al servidor con el correo
      const res = await fetch(
        "https://rose-candle-co.onrender.com/api/recoveryPassword/requestCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          credentials: "include", // Incluye cookies en la solicitud
        }
      );

      const data = await res.json();

      // Si la respuesta es exitosa, muestra mensaje de confirmación
      if (res.ok) {
        toast.success("Código enviado al correo.", { id: toastId });
        return true;
      } else {
        // Muestra mensaje de error con respuesta del backend
        toast.error(data.message || "No se pudo enviar el código.", {
          id: toastId,
        });
        return false;
      }
    } catch (error) {
      // Muestra error si falla la conexión o el servidor
      toast.error("Error del servidor.", { id: toastId });
      return false;
    }
  };

  // Retorna la función para ser usada en los componentes
  return { requestCode };
};
