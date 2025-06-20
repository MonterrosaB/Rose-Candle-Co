// Se importan librerias
import React, { useEffect, useState } from "react";

import Star from "../../../assets/star.svg?react"; // circulos del fondo
import AnimatedLine from "../../../global/components/AnimatedLine.jsx"; // linea animada
//import AnimatedStar from '../../global/components/AnimatedStar.jsx'; // estrella/circulo animada
import { FaUserCircle } from "react-icons/fa"; // icono de usuario (Libreria react-icons)
import FormInput from "../components/FormInput.jsx"; // componente del input para el formulario
import Button from "../components/Button.jsx"; // Botón

const Login = () => {
  return (
    <div className="relative overflow-hidden flex items-center justify-center h-screen bg-[#F0ECE6]">
      {/* Elementos del fondo*/}
      {/* Degradado superior*/}
      <div
        style={{
          width: "130%",
          height: "120%",
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(223, 204, 172, 0.63) 0%, rgba(223, 204, 172, 0) 40%)",
          position: "fixed",
          top: "-50%",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      ></div>

      {/* Linea animada */}
      <AnimatedLine />

      {/* Círculo superior derecho */}
      <div className="absolute -top-90 -right-50 w-[500px] h-[500px] rotate-[20deg] z-[10]">
        <Star />
      </div>

      {/* Círculo inferior izquierdo */}
      <div className="absolute -bottom-10 -left-60 w-[500px] h-[500px] rotate-[-5deg]">
        <Star />
      </div>

      {/* Formulario para ingresar */}
      <div className="z-10 p-8 rounded-xl shadow-md w-full max-w-lg bg-[#F7F5EE]">

        {/* Icono de usuario */}
        <div className="flex justify-center">
          <FaUserCircle color="#7D7954" size={120} />
        </div>

        <br />

        <FormInput
          id="username"
          label="Usuario"
          placeholder="Nombre de usuario"
          type="text"
        />

        <FormInput
          id="password"
          label="Contraseña"
          placeholder="********"
          type="password"
        />

        <Button title="Continuar" />
      </div>
    </div>
  );
};

export default Login;