// Importar librerias
import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // icono de usuario (Libreria react-icons)

const LoginForm = ({title, placeholder, inputId, type, maxLength, minLength, buttonTitle, onClick}) => {
  return (
    <div className="z-10 p-8 rounded-xl shadow-md w-full max-w-lg bg-[#F7F5EE]">
      {/* Icono de usuario */}
      <div className="flex justify-center">
        <FaUserCircle color="#7D7954" size={120} />
      </div>
      <br />
      {/* Formulario para ingresar telefono/codigo de verificacion */}
      <form>
        <div className="flex justify-center">
          <div className="relative mb-4 top-4">
            <input
              type={type}
              id={inputId}
              className="w-80 px-4 pt-3 pb-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder={placeholder}
              maxLength={maxLength}
              minLength={minLength}
            />
            <label
              htmlFor={inputId}
              className="absolute left-3 -top-3 text-gray-700 font-medium px-1 text-md pointer-events-none bg-[#F7F5EE]">
              {title}
            </label>
          </div>
        </div>
        <br />
        {/* Botón para enviar */}
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={onClick}
            className="w-32 py-2 px-4 mt-5 border border-[#C2A878] rounded-lg text-[#C2A878] font-medium cursor-pointer transition duration-200 hover:bg-[#C2A878] hover:text-[#F7F5EE]">
            {buttonTitle}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;