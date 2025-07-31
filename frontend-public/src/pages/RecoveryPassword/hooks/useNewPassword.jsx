// Hook para cambiar la contraseña
import { toast } from "react-hot-toast";

export const useNewPassword = () => {
  const updatePassword = async ({ newPassword }) => {
    const toastId = toast.loading("Actualizando contraseña...");

    try {
      const res = await fetch(
        "https://rose-candle-co.onrender.com/api/recoveryPassword/newPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
          credentials: "include", // cookies
        }
      );

      const data = await res.json();

      if (res.ok && data.message === "Password updated") {
        toast.success("Contraseña actualizada exitosamente.", { id: toastId });
        return true;
      } else {
        toast.error(data.message || "No se pudo actualizar la contraseña.", {
          id: toastId,
        });
        return false;
      }
    } catch (error) {
      toast.error("Error del servidor.", { id: toastId });
      return false;
    }
  };

  return { updatePassword };
};
