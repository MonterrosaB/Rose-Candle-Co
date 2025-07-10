import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Star from "../../../assets/star.svg?react";
import AnimatedLine from "../../../global/components/AnimatedLine.jsx";
import FormInput from "../components/FormInput.jsx";
import Button from "../components/Button.jsx";
import Logo from "../../../assets/Isotipo.svg?react";
import useEmployees from "../../../pages/PageEmployees/hooks/useEmployees.jsx"; // Importamos el hook

const FirstUser = () => {
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
    handleSubmit,
  } = useEmployees();

  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmar la contraseña
  const navigate = useNavigate();

  // Campos ya establecidos por ser el primer usuario
  const isActive = true; // por defecto true
  const role = "admin"; // por defecto "admin"

  // Validación para asegurar que la contraseña y la confirmación sean iguales
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    handleSubmit(e, { isActive, role }); // Si las contraseñas coinciden, llamamos al handleSubmit del hook (se envian los valores por defecto)
    navigate("/login"); // Navegar al login para autenticación
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
          {/* Icono de Rosé */}
          <Logo color="#7D7954" size={120} />

          {/* Texto al lado del icono */}
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

        {/* Fila de nombre y apellidos */}
        <div className="grid grid-cols-2 gap-4">
          {/* Campo de nombre */}
          <FormInput
            id="name"
            label="Nombre"
            placeholder="Nombre"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Campo de apellidos */}
          <FormInput
            id="surnames"
            label="Apellido"
            placeholder="Apellido"
            type="text"
            value={surnames}
            onChange={(e) => setSurnames(e.target.value)}
          />
        </div>

        {/* Fila de teléfono y DUI */}
        <div className="grid grid-cols-2 gap-4">
          {/* Campo de teléfono */}
          <FormInput
            id="phone"
            label="Teléfono"
            placeholder="1234-5678"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Campo de DUI */}
          <FormInput
            id="dui"
            label="DUI"
            placeholder="12345678-9"
            type="text"
            value={dui}
            onChange={(e) => setDui(e.target.value)}
          />
        </div>

        {/* Fila de correo y usuario */}
        <div className="grid grid-cols-2 gap-4">
          {/* Campo de correo electrónico */}
          <FormInput
            id="email"
            label="Correo Electrónico"
            placeholder="correo@rose.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Campo de usuario */}
          <FormInput
            id="user"
            label="Usuario"
            placeholder="Nombre de usuario"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        {/* Fila de contraseña y confirmación */}
        <div className="grid grid-cols-2 gap-4">
          {/* Campo de contraseña */}
          <FormInput
            id="password"
            label="Contraseña"
            placeholder="********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Campo de confirmación de contraseña */}
          <FormInput
            id="confirmPassword"
            label="Confirmar Contraseña"
            placeholder="********"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Botón para continuar */}
        <Button title="Iniciar" type="submit" />
      </form>
    </div>
  );
};

export default FirstUser;
