import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

// Custom hooks para cada paso del proceso
import { useRequestCode } from "../hooks/useRequestCode.jsx";
import { useVerifyCode } from "../hooks/useVerifyCode.jsx";
import { useNewPassword } from "../hooks/useNewPassword.jsx";

// Recursos visuales
import Star from "../../../assets/star.svg?react";
import AnimatedLine from "../../../global/components/AnimatedLine.jsx";

// Componentes del formulario
import RequestCodeForm from "../components/RequestCodeForm.jsx";
import VerifyCodeForm from "../components/VerifyCodeForm.jsx";
import UpdatePasswordForm from "../components/UpdatePasswordForm.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";

const PasswordRecovery = () => {
  // Cambia el título del documento al montar el componente
  useEffect(() => {
    document.title = "Recuperar Contraseña | Rosé Candle Co.";
  }, []);

  // Estado para controlar el paso actual del formulario
  // 1: solicitar código, 2: verificar código, 3: nueva contraseña, 4: éxito
  const [step, setStep] = useState(1);

  // Estado para almacenar el email del usuario ingresado en paso 1
  const [userEmail, setUserEmail] = useState("");

  // Estados para controlar indicadores de carga en cada acción
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const [isLoadingResend, setIsLoadingResend] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  // Hook react-hook-form para manejo y validación de formularios
  const {
    register, // Registra campos en el formulario
    handleSubmit, // Función para manejar el envío
    reset, // Resetea los campos del formulario
    setValue, // Establece valor manualmente en un campo
    getValues, // Obtiene el valor actual de un campo
    watch, // Observa cambios en campos específicos
    formState, // Estado con errores y validaciones
  } = useForm();

  // Custom hooks para lógica de negocio en cada paso
  const { requestCode, message: messageRequest } = useRequestCode();
  const { verifyCode, message: messageVerify } = useVerifyCode();
  const { updatePassword, message: messageUpdate } = useNewPassword();

  // Maneja envío del formulario en paso 1 para solicitar código
  const handleRequest = async (data) => {
    setIsLoadingRequest(true);
    try {
      const success = await requestCode(data);
      if (success) {
        setUserEmail(data.email); // Guarda el email para siguientes pasos
        setStep(2); // Avanza al paso 2 (verificar código)
        reset(); // Limpia el formulario
      }
    } finally {
      setIsLoadingRequest(false);
    }
  };

  // Maneja envío del formulario en paso 2 para verificar código
  const handleVerify = async (data) => {
    setIsLoadingVerify(true);
    try {
      const success = await verifyCode(data);
      if (success) {
        setStep(3); // Avanza al paso 3 (ingresar nueva contraseña)
        reset(); // Limpia el formulario
      }
    } finally {
      setIsLoadingVerify(false);
    }
  };

  // Maneja envío del formulario en paso 3 para actualizar contraseña
  const handleUpdate = async (data) => {
    setIsLoadingUpdate(true);
    try {
      const success = await updatePassword(data);
      if (success) {
        setStep(4); // Muestra mensaje de éxito en paso 4
        reset(); // Limpia el formulario
      }
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  // Función para reenviar código al email almacenado
  const handleResendCode = async () => {
    if (!userEmail) return;

    setIsLoadingResend(true);
    try {
      await requestCode({ email: userEmail });
    } finally {
      setIsLoadingResend(false);
    }
  };

  // Función para volver al paso 1 y reiniciar formulario
  const handleGoBack = () => {
    setStep(1);
    reset(); // Limpia los campos del formulario
  };

  return (
    <div className="relative overflow-hidden flex items-center justify-center h-screen bg-[#F0ECE6]">
      {/* Fondo decorativo radial */}
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

      {/* Línea animada decorativa */}
      <AnimatedLine />

      {/* Estrellas decorativas posicionadas */}
      <div className="absolute -top-90 -right-50 w-[500px] h-[500px] rotate-[20deg] z-[10]">
        <Star />
      </div>
      <div className="absolute -bottom-10 -left-60 w-[500px] h-[500px] rotate-[-5deg]">
        <Star />
      </div>

      {/* Contenedor principal del formulario */}
      <div className="relative z-20 max-w-lg mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg text-center font-[Poppins]">
        {/* Renderiza formulario o mensaje según el paso actual */}
        {step === 1 && (
          <RequestCodeForm
            register={register}
            handleSubmit={handleSubmit}
            handleRequest={handleRequest}
            message={messageRequest}
            isLoading={isLoadingRequest}
          />
        )}

        {step === 2 && (
          <VerifyCodeForm
            register={register}
            handleSubmit={handleSubmit}
            setValue={setValue}
            getValues={getValues}
            handleVerify={handleVerify}
            message={messageVerify}
            isLoading={isLoadingVerify}
            email={userEmail}
            onResendCode={handleResendCode}
            onGoBack={handleGoBack}
            resendLoading={isLoadingResend}
          />
        )}

        {step === 3 && (
          <UpdatePasswordForm
            register={register}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            watch={watch}
            formState={formState}
            message={messageUpdate}
            isLoading={isLoadingUpdate}
          />
        )}

        {step === 4 && <SuccessMessage />}
      </div>
    </div>
  );
};

export default PasswordRecovery;
