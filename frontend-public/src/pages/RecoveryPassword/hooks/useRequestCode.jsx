// Hook para solicitar el código
import { toast } from "react-hot-toast";

export const useRequestCode = () => {
  const requestCode = async ({ email }) => {
    const toastId = toast.loading("Enviando código...");

    try {
      const res = await fetch(
        "https://rose-candle-co.onrender.com/api/recoveryPassword/requestCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          credentials: "include", // para las cookies
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Código enviado al correo.", { id: toastId });
        return true;
      } else {
        toast.error(data.message || "No se pudo enviar el código.", {
          id: toastId,
        });
        return false;
      }
    } catch (error) {
      toast.error("Error del servidor.", { id: toastId });
      return false;
    }
  };

  return { requestCode };
};
