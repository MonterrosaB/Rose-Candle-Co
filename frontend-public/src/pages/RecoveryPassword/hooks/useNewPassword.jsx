// Hook para cambiar la contraseña
import { toast } from "react-hot-toast";

export const useNewPassword = () => {
  // Función para actualizar la contraseña del usuario
  const updatePassword = async ({ newPassword }) => {
    // Muestra mensaje de carga
    const toastId = toast.loading("Actualizando contraseña...");

    try {
      // Envía solicitud al backend con la nueva contraseña
      const res = await fetch(
        "https://rose-candle-co.onrender.com/api/recoveryPassword/newPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
          credentials: "include", // Incluye cookies en la solicitud
        }
      );

      const data = await res.json();

      // Muestra mensaje de éxito si la respuesta es válida
      if (res.ok && data.message === "Password updated") {
        toast.success("Contraseña actualizada exitosamente.", { id: toastId });
        return true;
      } else {
        // Muestra mensaje de error si algo falla
        toast.error(data.message || "No se pudo actualizar la contraseña.", {
          id: toastId,
        });
        return false;
      }
    } catch (error) {
      // Muestra error en caso de falla en la conexión o el servidor
      toast.error("Error del servidor.", { id: toastId });
      return false;
    }
  };

  // Retorna la función para ser utilizada en componentes
  return { updatePassword };
};
