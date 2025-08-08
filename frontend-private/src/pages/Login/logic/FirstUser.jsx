import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useHasEmployees } from "../hooks/useHasEmployees";
import Star from "../../../assets/star.svg?react";
import AnimatedLine from "../../../global/components/AnimatedLine.jsx";
import FormInput from "../components/FormInput.jsx";
import Button from "../components/Button.jsx";
import Logo from "../../../assets/Isotipo.svg?react";
import useEmployees from "../hooks/useEmployee"; // Importamos el hook
import { useForm } from "react-hook-form";

const FirstUser = () => {
  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = "Registrarse | Rosé Candle Co.";
  }, []);

  // useEmployees (hook de empleados)
  const {
    name,
    setName,
    surnames,
    setSurnames,
    email,
    setEmail,
    phone,
    setPhone,
    dui,
    setDui,
    password,
    setPassword,
    user,
    setUser,
    errors,
    handleSubmit,
  } = useEmployees();

  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmar contraseña
  const navigate = useNavigate();

  const { refetchHasEmployees } = useHasEmployees();

  // Validación para asegurar que la contraseña y la confirmación sean iguales
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // se detiene si la contraseña no coincide (trim para evitar espacios)
    if ((password ?? "").trim() !== (confirmPassword ?? "").trim()) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const success = await handleSubmit(e, { isActive: true, role: "admin" });

    if (success) {
      await refetchHasEmployees(); // vuelve a contar los empleados
      setTimeout(() => {
        window.location.reload(); // recarga la página después del toast
      }, 2000);
    }
  };

  // Que el input solo acepte letras
  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; // Solo letras y espacios
    if (regex.test(value)) {
      setName(value);
    }
  };

  const handleSurnamesChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (regex.test(value)) setSurnames(value);
  };

  // Validacion teléfono
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4);
    }
    setPhone(value);
  };

  // Validación dui
  const handleDuiChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 9) value = value.slice(0, 9);
    if (value.length > 8) {
      value = value.slice(0, 8) + "-" + value.slice(8);
    }
    setDui(value);
  };

  // Validación usuario
  const handleUserChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9_]*$/;
    if (regex.test(value)) setUser(value);
  };

  return (
    <div className="relative overflow-hidden flex items-center justify-center h-screen bg-[#F0ECE6]">
      {/* Fondo */}
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

      {/* Círculo superior derecho */}
      <div className="absolute -top-90 -right-50 w-[500px] h-[500px] rotate-[20deg] z-[10]">
        <Star />
      </div>

      {/* Círculo inferior izquierdo */}
      <div className="absolute -bottom-10 -left-60 w-[500px] h-[500px] rotate-[-5deg]">
        <Star />
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleFormSubmit} // función para enviar
        className="z-10 p-8 rounded-xl shadow-md w-full max-w-4xl bg-[#F7F5EE]"
      >
        {/* Icono de usuario */}
        <div className="flex items-center justify-center mb-6">
          <Logo color="#7D7954" size={120} />
          <div className="ml-4">
            <h1
              className="text-3xl font-serif font-bold text-gray-800"
              style={{ fontFamily: "Lora, serif" }}
            >
              Bienvenida a Rosé Candle Co.
            </h1>
            <p
              className="text-xl text-gray-600"
              style={{ fontFamily: "Lora, serif" }}
            >
              Crea una cuenta para comenzar esta aventura.
            </p>
          </div>
        </div>

        <br />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="name"
            label="Nombre"
            placeholder="Nombre"
            type="text"
            value={name}
            onChange={handleNameChange}
            error={errors.name}
          />
          <FormInput
            id="surnames"
            label="Apellido"
            placeholder="Apellido"
            type="text"
            value={surnames}
            onChange={handleSurnamesChange}
            error={errors.surnames}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="phone"
            label="Teléfono"
            placeholder="1234-5678"
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            error={errors.phone}
          />
          <FormInput
            id="dui"
            label="DUI"
            placeholder="12345678-9"
            type="text"
            value={dui}
            onChange={handleDuiChange}
            error={errors.dui}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="email"
            label="Correo Electrónico"
            placeholder="correo@rose.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <FormInput
            id="user"
            label="Usuario"
            placeholder="Nombre de usuario"
            type="text"
            value={user}
            onChange={handleUserChange}
            error={errors.user}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="password"
            label="Contraseña"
            placeholder="********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <FormInput
            id="confirmPassword"
            label="Confirmar Contraseña"
            placeholder="********"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={
              (password ?? "").trim() !== (confirmPassword ?? "").trim()
                ? "Las contraseñas no coinciden"
                : null
            }
          />
        </div>

        <Button title="Iniciar" type="submit" />
      </form>
    </div>
  );
};

export default FirstUser;
