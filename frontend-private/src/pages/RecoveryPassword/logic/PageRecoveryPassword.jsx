// Página para recuperar contraseña
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRequestCode } from "../hooks/useRequestCode.jsx";
import { useVerifyCode } from "../hooks/useVerifyCode";
import { useNewPassword } from "../hooks/useNewPassword";
import Star from "../../../assets/star.svg?react";
import AnimatedLine from "../../../global/components/AnimatedLine.jsx";
import FormInput from "../../Login/components/FormInput.jsx";
import FormButton from "../components/FormButton.jsx";

const PagePasswordRecovery = () => {
  /* Cambiar título de la página */
  useEffect(() => {
    document.title = "Recuperar Contraseña | Rosé Candle Co.";
  }, []);

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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

      {/* Formulario */}
      <div className="z-10 p-8 rounded-xl shadow-md w-full max-w-lg bg-[#F7F5EE]">
        {step === 1 && (
          <form
            onSubmit={handleSubmit(handleRequest)}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-[#7D7954] text-2xl font-semibold mb-8 text-center">
              Recuperar contraseña
            </h2>

            <FormInput
              id="email"
              label="Correo electrónico"
              type="email"
              placeholder="Correo electrónico"
              {...register("email", { required: true })}
              error={errors.email && "El correo es obligatorio"}
            />

            <FormButton title="Enviar código" type="submit" />

            {messageRequest && (
              <p className="text-sm text-[#86918C] mt-3">{messageRequest}</p>
            )}
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleSubmit(handleVerify)}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-[#7D7954] text-2xl font-semibold mb-8 text-center">
              Verificar código
            </h2>

            <FormInput
              id="code"
              label="Código de verificación"
              placeholder="12345"
              type="text"
              {...register("code", { required: true })}
              error={errors.email && "El código es obligatorio"}
            />

            <FormButton title="Enviar código" type="submit" />

            {messageRequest && (
              <p className="text-sm text-[#86918C] mt-3">{messageRequest}</p>
            )}
          </form>
        )}

        {step === 3 && (
          <>
            <h2 className="text-[#7D7954] text-xl font-semibold mb-2 text-center">
              Nueva Contraseña
            </h2>
            <FormInput
              id="newPassword"
              label="Nueva contraseña"
              placeholder="********"
              type="password"
              {...register("newPassword", { required: true, minLength: 6 })}
            />
            <FormButton title="Actualizar contraseña" type="submit" />
          </>
        )}

        {step === 4 && (
          <div className="text-center text-[#86918C]">
            <h2 className="text-[#7D7954] text-2xl font-semibold mb-2">
              ¡Contraseña actualizada!
            </h2>
            <p>Ya puedes iniciar sesión con tu nueva contraseña.</p>
            <br />
            <FormButton
              title="Iniciar sesión"
              type="button"
              onClick={() => navigate("/login")} // Navega al login
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PagePasswordRecovery;
