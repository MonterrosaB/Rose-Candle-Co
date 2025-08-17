// Lógica para la página del Login
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Star from "../../../assets/star.svg?react";
import AnimatedLine from "../../../global/components/AnimatedLine.jsx";
import { FaUserCircle } from "react-icons/fa";
import FormInput from "../components/FormInput.jsx";
import Button from "../components/Button.jsx";
import { useAuth } from "../../../global/hooks/useAuth.js";
import toast from "react-hot-toast";

const Login = () => {
  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = "Iniciar Sesión | Rosé Candle Co.";
  }, []);

  const { login } = useAuth(); // login del authContext
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validaciones
    if (user.trim() === "" || password.trim() === "") {
      toast.error("Por favor completa todos los campos");
      return;
    }

    // Ejecutar login desde el contexto
    const success = await login(user, password);

    if (success) {
      toast.success("Inicio de sesión exitoso");
      navigate("/home"); // Navegar al home después del login
    }
  };

  return (
    <div className="relative overflow-hidden flex items-center justify-center h-screen bg-[#F0ECE6]">
      {/* Fondo */}
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
        onSubmit={handleLogin}
        className="z-10 p-8 rounded-xl shadow-md w-full max-w-lg bg-[#F7F5EE]"
      >
        {/* Icono de usuario */}
        <div className="flex justify-center">
          <FaUserCircle color="#7D7954" size={120} />
        </div>

        <br />

        {/* Campo de usuario */}
        <FormInput
          id="username"
          label="Usuario"
          placeholder="Nombre de usuario"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        {/* Campo de contraseña */}
        <FormInput
          id="password"
          label="Contraseña"
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Recuperar contraseña */}
        <div className="text-end -mt-2  mb-0">
          <Link
            to="/recoveryPassword"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 px-16"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Botón para continuar */}
        <Button title="Continuar" type="submit" />
      </form>
    </div>
  );
};

export default Login;
