// Importa React y hooks necesarios
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// Importa componentes visuales y reutilizables
import Star from "../../assets/star.svg?react";
import AnimatedLine from "../../global/components/AnimatedLine.jsx";
import FormInput from "./components/FormInput.jsx";
import Button from "./components/Button.jsx";
import Logo from "../../assets/Isotipo.svg?react";
import VerifyCodeForm from "./components/VerifyCodeForm.jsx";

// Importa hooks personalizados para el flujo de registro
import useRegisterCustomer from "./hooks/useRegisterCustomers.jsx";
import { useRequestCode } from "./hooks/useRequestCode.jsx";
import { useVerifyCode } from "./hooks/useVerifyCode.jsx";

const Register = () => {
  const navigate = useNavigate();
  const {
    registerCustomer,
    loading: registerLoading,
    error: registerError,
    success,
  } = useRegisterCustomer();
  const { requestCode } = useRequestCode();
  const { verifyCode } = useVerifyCode();

  // Hook de formulario para la primera etapa del registro
  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: formErrors },
    watch,
    setValue: setFormValue,
    trigger,
  } = useForm({ mode: "onChange" }); // Valida campos al cambiar

  // Hook de formulario usado en el componente de verificación de código
  const { register, handleSubmit, setValue, getValues, reset } = useForm();

  // Control del paso actual del flujo de registro
  const [step, setStep] = useState(1);

  // Mensaje de error o éxito para la verificación
  const [verifyMessage, setVerifyMessage] = useState(null);

  // Indica si se está enviando un formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obtiene valores del formulario en tiempo real
  const watchedValues = watch();

  // Establece el título de la página al montar el componente
  useEffect(() => {
    document.title = "Registrarse | Rosé Candle Co.";
  }, []);

  // Reglas de validación personalizadas para cada campo del formulario
  const validationRules = {
    name: {
      required: "El nombre es obligatorio",
      minLength: {
        value: 3,
        message: "El nombre debe tener al menos 3 caracteres",
      },
      maxLength: {
        value: 100,
        message: "El nombre no puede exceder 100 caracteres",
      },
      pattern: {
        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        message: "El nombre solo puede contener letras y espacios",
      },
    },
    surnames: {
      required: "Los apellidos son obligatorios",
      minLength: {
        value: 3,
        message: "Los apellidos deben tener al menos 3 caracteres",
      },
      maxLength: {
        value: 100,
        message: "Los apellidos no pueden exceder 100 caracteres",
      },
      pattern: {
        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        message: "Los apellidos solo pueden contener letras y espacios",
      },
    },
    email: {
      required: "El correo electrónico es obligatorio",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Formato de correo electrónico inválido",
      },
    },
    user: {
      required: "El nombre de usuario es obligatorio",
      pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message:
          "El usuario solo puede contener letras, números y guiones bajos",
      },
    },
    password: {
      required: "La contraseña es obligatoria",
      minLength: {
        value: 8,
        message: "La contraseña debe tener al menos 8 caracteres",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        message: "Debe incluir mayúscula, minúscula, número y símbolo",
      },
    },
    confirmPassword: {
      required: "Confirma tu contraseña",
      validate: (value) => {
        if (value !== watchedValues.password) {
          return "Las contraseñas no coinciden";
        }
        return true;
      },
    },
    phone: {
      required: "El teléfono es obligatorio",
      pattern: {
        value: /^\d{4}-\d{4}$/,
        message: "Formato de teléfono inválido (####-####)",
      },
      minLength: {
        value: 9,
        message: "El teléfono debe tener 9 caracteres",
      },
    },
  };

  // Aplica el formato ####-#### al número de teléfono mientras se escribe
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
    if (value.length > 8) value = value.slice(0, 8); // Limita a 8 dígitos

    let formattedValue = value;
    if (value.length > 4) {
      formattedValue = value.slice(0, 4) + "-" + value.slice(4);
    }

    setFormValue("phone", formattedValue); // Establece valor formateado
    trigger("phone"); // Valida el campo actualizado
  };

  // Envia el código de verificación al correo ingresado
  const handleFormSubmit = handleSubmitForm(async (data) => {
    setIsSubmitting(true);
    try {
      const success = await requestCode({ email: data.email });
      if (success) {
        setStep(2); // Avanza al paso de verificación
        setVerifyMessage(null);
        reset(); // Limpia los inputs del código
      }
    } catch (error) {
      toast.error("Error al enviar el código");
    } finally {
      setIsSubmitting(false);
    }
  });

  // Verifica el código y completa el registro si es válido
  const handleVerify = async ({ code }) => {
    if (!code || code.length !== 5) {
      setVerifyMessage("Por favor ingresa un código válido de 5 dígitos");
      return;
    }

    setIsSubmitting(true);
    setVerifyMessage(null);

    try {
      const isCodeValid = await verifyCode({ code });

      if (!isCodeValid) {
        setVerifyMessage("Código incorrecto. Inténtalo de nuevo.");
        setIsSubmitting(false);
        return;
      }

      // Si el código es válido, registra al cliente con los datos previos
      const customerData = {
        name: watchedValues.name,
        surnames: watchedValues.surnames,
        email: watchedValues.email,
        password: watchedValues.password,
        user: watchedValues.user,
        phone: watchedValues.phone,
        addresses: [
          {
            address: "Dirección predeterminada",
            isDefault: true,
            type: "casa",
          },
        ],
      };

      const result = await registerCustomer(customerData);

      if (result) {
        toast.success("¡Registro exitoso!");
        setTimeout(() => navigate("/loginCustomer"), 2000); // Redirige al login
      } else {
        setVerifyMessage("Error al completar el registro. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error durante el proceso de registro:", error);
      setVerifyMessage("Error durante el proceso de registro");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Permite regresar al paso anterior desde la verificación
  const handleGoBack = () => {
    setStep(1);
    setVerifyMessage(null);
    reset(); // Limpia los inputs del código
  };

  // Reenvía el código de verificación al correo
  const handleResendCode = async () => {
    setIsSubmitting(true);
    setVerifyMessage(null);

    try {
      const success = await requestCode({ email: watchedValues.email });
      if (success) {
        setVerifyMessage("Código reenviado exitosamente");
        reset(); // Limpia inputs anteriores del código
      }
    } catch (error) {
      setVerifyMessage("Error al reenviar el código");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Indica si hay alguna operación en curso
  const loading = isSubmitting || registerLoading;

  return (
    <div className="relative overflow-hidden flex items-center justify-center min-h-screen bg-[#F0ECE6] py-8">
      {/* Fondo decorativo circular difuminado */}
      <div
        style={{
          width: "150%",
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

      {/* Formulario de registro - Paso 1 */}
      {step === 1 && (
        <form
          onSubmit={handleFormSubmit}
          className="z-10 p-8 rounded-xl shadow-md w-full max-w-4xl bg-[#F7F5EE]"
        >
          <div className="flex items-center justify-center mb-6">
            <Logo color="#7D7954" size={120} />
            <div className="ml-4">
              <h1 className="text-3xl font-serif font-bold text-gray-800">
                Únete a Rosé Candle Co.
              </h1>
              <p className="text-xl text-gray-600">
                Crea una cuenta para comenzar esta aventura.
              </p>
            </div>
          </div>

          {/* Campos de entrada distribuidos en grid */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="name"
              label="Nombre"
              placeholder="Nombre"
              type="text"
              {...registerForm("name", validationRules.name)}
              error={formErrors.name?.message}
            />
            <FormInput
              id="surnames"
              label="Apellido"
              placeholder="Apellido"
              type="text"
              {...registerForm("surnames", validationRules.surnames)}
              error={formErrors.surnames?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="phone"
              label="Teléfono"
              placeholder="1234-5678"
              type="text"
              {...registerForm("phone", validationRules.phone)}
              onChange={handlePhoneChange}
              error={formErrors.phone?.message}
            />
            <FormInput
              id="email"
              label="Correo Electrónico"
              placeholder="correo@rose.com"
              type="email"
              {...registerForm("email", validationRules.email)}
              error={formErrors.email?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="user"
              label="Usuario"
              placeholder="Nombre de usuario"
              type="text"
              {...registerForm("user", validationRules.user)}
              error={formErrors.user?.message}
            />
            <div></div> {/* Espacio para mantener alineación */}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="password"
              label="Contraseña"
              placeholder="********"
              type="password"
              {...registerForm("password", validationRules.password)}
              error={formErrors.password?.message}
            />
            <FormInput
              id="confirmPassword"
              label="Confirmar Contraseña"
              placeholder="********"
              type="password"
              {...registerForm(
                "confirmPassword",
                validationRules.confirmPassword
              )}
              error={formErrors.confirmPassword?.message}
            />
          </div>

          {/* Muestra error del backend si existe */}
          {registerError && (
            <p className="text-red-500 mt-2 text-center">{registerError}</p>
          )}

          {/* Botón para enviar el formulario */}
          <Button title={"Continuar"} type="submit" disabled={loading} />
        </form>
      )}

      {/* Paso 2: Verificación de código */}
      {step === 2 && (
        <VerifyCodeForm
          register={register}
          handleSubmit={handleSubmit}
          setValue={setValue}
          getValues={getValues}
          handleVerify={handleVerify}
          message={verifyMessage}
          isLoading={loading}
          email={watchedValues.email}
          onResendCode={handleResendCode}
          onGoBack={handleGoBack}
          resendLoading={isSubmitting && !registerLoading}
        />
      )}
    </div>
  );
};

export default Register;
