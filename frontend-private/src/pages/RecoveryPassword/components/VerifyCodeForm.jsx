import { useRef, useEffect } from "react";

// Formulario para verificar el código de recuperación con inputs individuales
const VerifyCodeForm = ({
  register,
  handleSubmit,
  setValue,
  getValues,
  handleVerify,
  message,
  isLoading = false,
  email = "", // Email al que se envió el código
  onResendCode, // Función para reenviar código
  onGoBack, // Función para volver al paso anterior
  resendLoading = false, // Estado de carga para reenviar código
}) => {
  const inputRefs = useRef([]);

  // Enfocar automáticamente el primer input al cargar el componente
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Maneja la escritura en cada input
  const handleInput = (e, index) => {
    const value = e.target.value;

    // Solo permite un dígito numérico
    if (!/^\d?$/.test(value)) return;

    // Actualiza el valor en react-hook-form
    setValue(`code${index}`, value);

    // Si se ingresó un valor, enfoca el siguiente input
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Permite retroceder al input anterior con Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Al enviar, une los 5 dígitos y los pasa como "code"
  const onSubmit = (data) => {
    const code = [0, 1, 2, 3, 4].map((i) => data[`code${i}`] || "").join("");

    // Valida que tenga exactamente 5 dígitos numéricos
    if (code.length === 5 && /^\d{5}$/.test(code)) {
      handleVerify({ code });
    } else {
      // Si no es válido, no enviar y mostrar feedback visual
      inputRefs.current.forEach((input, idx) => {
        if (input && !data[`code${idx}`]) {
          input.style.borderColor = "#ef4444"; // Color rojo para campos vacíos
          setTimeout(() => {
            if (input) input.style.borderColor = "#D3CCBE"; // Volver al color original
          }, 2000);
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-[#7D7954] text-2xl font-semibold mb-4">
        Código de verificación
      </h2>
      <p className="text-[#86918C] mb-4">
        Hemos enviado un código de verificación a tu correo electrónico.
      </p>

      {/* Mostrar email al que se envió el código */}
      {email && (
        <div className="mb-6 p-3 bg-[#F7F5EE] rounded-lg border border-[#D3CCBE]">
          <p className="text-[#7D7954] text-sm">
            Código enviado a: <span className="font-semibold">{email}</span>
          </p>
        </div>
      )}

      {/* Inputs individuales para cada dígito del código */}
      <div className="flex justify-center gap-2 mb-6">
        {[0, 1, 2, 3, 4].map((index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            inputMode="numeric"
            {...register(`code${index}`, {
              required: true,
              pattern: /^\d$/,
            })}
            className="w-12 h-12 text-center text-xl border border-[#D3CCBE] rounded-lg focus:outline-none focus:border-[#C2A878] disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
            ref={(el) => (inputRefs.current[index] = el)}
            onInput={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={isLoading || resendLoading}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading || resendLoading}
        className="py-2 px-6 mt-2 mb-4 border border-[#C2A878] rounded-lg text-[#C2A878] font-medium cursor-pointer transition duration-200 hover:bg-[#C2A878] hover:text-[#F7F5EE] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Verificando..." : "Verificar"}
      </button>
      <br />

      {/* Mensaje de retroalimentación del servidor */}
      {message && (
        <div className="mb-4">
          <p
            className={`text-sm ${
              message.includes("Error") || message.includes("incorrecto")
                ? "text-[#86918C]"
                : message.includes("exitosamente") ||
                  message.includes("reenviado")
                ? "text-[#86918C]"
                : "text-[#86918C]"
            }`}
          >
            {message}
          </p>
        </div>
      )}

      {/* Botones de acción adicionales */}
      <div className="flex justify-between gap-2 pt-2 px-4 border-t border-[#D3CCBE]">
        {/* Botón reenviar código */}
        {onResendCode && (
          <button
            type="button"
            onClick={onResendCode}
            disabled={isLoading || resendLoading}
            className="py-2 px-4 text-[#86918C] cursor-pointer underline hover:text-[#C2A878] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {resendLoading ? "Reenviando..." : "Reenviar código"}
          </button>
        )}

        {/* Botón volver */}
        {onGoBack && (
          <button
            type="button"
            onClick={onGoBack}
            disabled={isLoading || resendLoading}
            className="py-2 px-4 text-[#86918C] cursor-pointer underline hover:text-[#C2A878] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Volver al paso anterior
          </button>
        )}
      </div>

      {/* Información adicional */}
      <div className="mt-2 pt-4 border-t border-[#D3CCBE]">
        <p className="text-sm text-[#86918C]">
          ¿No recibiste el código? <br />
          Revisa tu carpeta de spam o solicita un nuevo código.
        </p>
      </div>
    </form>
  );
};

export default VerifyCodeForm;
