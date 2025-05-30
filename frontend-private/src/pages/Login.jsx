// Se importan librerias
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // icono de usuario


const Login = () => {
    return (
    <div className="flex items-center justify-center h-screen bg-[#F0ECE6]">
      <div className="p-8 rounded-xl shadow-md w-full max-w-lg bg-[#F7F5EE]">
        {/* Elementos del fondo*/ }
        
        {/* Círculo superior derecho 
        <div 
            className="absolute rounded-full border pointer-events-none"
            style={{
                width: 650,
                height: 400,
                top: -130,
                right: -130,
                transform: "rotate(60deg)",
                zIndex: 0,
            }}
        />

        Círculo inferior izquierdo (óvalo)
        <div 
            className="absolute rounded-full border pointer-events-none"
            style={{
                width: 650,
                height: 400,
                bottom: -200,
                left: -200,
                transform: "rotate(60deg)",
                zIndex: 0,
            }}
        />*/}

        {/* Icono de usuario */}
        <div className="flex justify-center">
            <FaUserCircle color="#7D7954" size={120}/>
        </div>
        <br />
        {/* Formulario para ingresar telefono */}
        <form>  
            <div className="flex justify-center">
                <div className="relative mb-4 top-4">
                    <input 
                        type="tel" 
                        id="phone" 
                        className="w-80 px-4 pt-3 pb-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"  
                        placeholder="0123-4567"
                        maxLength={9}/>

                    <label
                        htmlFor="phone"
                        className="absolute left-3 -top-3 text-gray-700 font-medium px-1 text-md pointer-events-none bg-[#F7F5EE]">
                        Número de teléfono
                    </label>
                </div>
            </div>
            <br />
            {/* Boton para enviar */}
            <div className="flex justify-center">
                <button className="w-32 py-2 px-4 mt-5 rounded-lg transition text-[#C2A878] duration-200 border-1 font-medium cursor-pointer">Continuar</button>
            </div>
        </form>

      </div>
    </div>
  );
};

export default Login;