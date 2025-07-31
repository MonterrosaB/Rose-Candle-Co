// Hook para verificar el código
import { toast } from "react-hot-toast";

export const useVerifyCode = () => {
  const verifyCode = async ({ code }) => {
    const toastId = toast.loading("Verificando código...");

    try {
      const res = await fetch(
        "https://rose-candle-co.onrender.com/api/recoveryPassword/verifyCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
          credentials: "include", // para enviar la cookie al backend
        }
      );

      const data = await res.json();

      if (res.ok && data.message === "Code verified successfully") {
        toast.success("Código verificado correctamente.", { id: toastId });
        return true;
      } else {
        toast.error(data.message || "Código inválido.", { id: toastId });
        return false;
      }
    } catch (error) {
      toast.error("Error al verificar el código.", { id: toastId });
      return false;
    }
  };

  return { verifyCode };
};
