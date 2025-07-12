import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRequestCode } from "../hooks/useRequestCode.jsx";
import { useVerifyCode } from "../hooks/useVerifyCode.jsx";
import { useNewPassword } from "../hooks/useNewPassword.jsx";

// Components
import Star from "../../../assets/star.svg?react";
import AnimatedLine from "../../../global/components/AnimatedLine.jsx";

const PasswordRecovery = () => {
  /* Cambiar título de la página */
  useEffect(() => {
    document.title = "Recuperar Contraseña | Rosé Candle Co.";
  }, []);

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const { requestCode, message: messageRequest } = useRequestCode();
  const { verifyCode, message: messageVerify } = useVerifyCode();
  const { updatePassword, message: messageUpdate } = useNewPassword();

  const handleRequest = async (data) => {
    const success = await requestCode(data);
    if (success) {
      setStep(2);
      reset();
    }
  };

  const handleVerify = async (data) => {
    const success = await verifyCode(data);
    if (success) {
      setStep(3);
      reset();
    }
  };

  const handleUpdate = async (data) => {
    const success = await updatePassword(data);
    if (success) {
      setStep(4);
      reset();
    }
  };

  return (
    <div className="relative overflow-hidden flex items-center justify-center h-screen bg-[#F0ECE6]">
      {/* Fondo decorativo */}
      <div
        style={{
          width: "130%",
          height: "120%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(223, 204, 172, 0.63) 0%, rgba(223, 204, 172, 0) 40%)",
          position: "fixed",
          top: "-50%",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      ></div>

      <AnimatedLine />

      {/* Estrellas decorativas */}
      <div className="absolute -top-90 -right-50 w-[500px] h-[500px] rotate-[20deg] z-[10]">
        <Star />
      </div>
      <div className="absolute -bottom-10 -left-60 w-[500px] h-[500px] rotate-[-5deg]">
        <Star />
      </div>

      <div className="relative z-20 max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg text-center font-[Poppins]">
        {step === 1 && (
          <form onSubmit={handleSubmit(handleRequest)}>
            <h2 className="text-[#7D7954] text-2xl font-semibold mb-4">
              Recuperar contraseña
            </h2>
            <input
              type="email"
              placeholder="Correo electrónico"
              {...register("email", { required: true })}
              className="w-full p-3 border border-[#D3CCBE] rounded-lg mb-4"
            />
            <button
              type="submit"
              className="py-2 px-6 mt-5 border border-[#C2A878] rounded-lg text-[#C2A878] font-medium cursor-pointer transition duration-200 hover:bg-[#C2A878] hover:text-[#F7F5EE]"
            >
              Enviar código
            </button>
            {messageRequest && (
              <p className="text-sm text-[#86918C] mt-3">{messageRequest}</p>
            )}
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(handleVerify)}>
            <h2 className="text-[#7D7954] text-2xl font-semibold mb-4">
              Verifica el código
            </h2>
            <input
              type="text"
              placeholder="Código"
              {...register("code", { required: true })}
              className="w-full p-3 border border-[#D3CCBE] rounded-lg mb-4"
            />
            <button
              type="submit"
              className="py-2 px-6 mt-5 border border-[#C2A878] rounded-lg text-[#C2A878] font-medium cursor-pointer transition duration-200 hover:bg-[#C2A878] hover:text-[#F7F5EE]"
            >
              Verificar
            </button>
            {messageVerify && (
              <p className="text-sm text-[#86918C] mt-3">{messageVerify}</p>
            )}
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(handleUpdate)}>
            <h2 className="text-[#7D7954] text-2xl font-semibold mb-4">
              Nueva contraseña
            </h2>
            <input
              type="password"
              placeholder="Nueva contraseña"
              {...register("newPassword", { required: true, minLength: 6 })}
              className="w-full p-3 border border-[#D3CCBE] rounded-lg mb-4"
            />
            <button
              type="submit"
              className="py-2 px-6 mt-5 border border-[#C2A878] rounded-lg text-[#C2A878] font-medium cursor-pointer transition duration-200 hover:bg-[#C2A878] hover:text-[#F7F5EE]"
            >
              Actualizar
            </button>
            {messageUpdate && (
              <p className="text-sm text-[#86918C] mt-3">{messageUpdate}</p>
            )}
          </form>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-[#7D7954] text-2xl font-semibold mb-4">
              ¡Contraseña actualizada!
            </h2>
            <p className="text-[#86918C]">
              Ya puedes iniciar sesión con tu nueva contraseña.
            </p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="py-2 px-6 mt-5 border border-[#C2A878] rounded-lg text-[#C2A878] font-medium cursor-pointer transition duration-200 hover:bg-[#C2A878] hover:text-[#F7F5EE]"
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordRecovery;
