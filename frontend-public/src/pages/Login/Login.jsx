// Se importan librerias
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // icono de usuario (Libreria react-icons)
import { motion } from "motion/react"; // animaciones

import Star from '../../assets/star.svg?react'; // circulos del fondo
import AnimatedLine from '../../global/components/AnimatedLine.tsx'; // linea animada
//import AnimatedStar from '../../global/components/AnimatedStar.tsx'; // estrella/circulo animada

const Login = () => {
    return (
    <div className="relative overflow-hidden flex items-center justify-center h-screen bg-[#F0ECE6]">
        {/* Elementos del fondo*/ } 

        {/* Degradado superior*/ }
        <div style={{
                width: '130%',
                height: '120%',
                borderRadius: '50%',
                background: 'radial-gradient(circle,rgba(223, 204, 172, 0.63) 0%, rgba(223, 204, 172, 0) 40%)',
                position: 'fixed',
                top: '-50%',
                left: '50%',
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
                zIndex: 0
            }}>
        </div>

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

        <div className="z-10 p-8 rounded-xl shadow-md w-full max-w-lg bg-[#F7F5EE]">
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
                <button className="w-32 py-2 px-4 mt-5 border border-[#C2A878] rounded-lg text-[#C2A878] font-medium cursor-pointer transition duration-200 hover:bg-[#C2A878] hover:text-[#F7F5EE]">Continuar</button>
            </div>
        </form>

      </div>
    </div>
  );
};

export default Login;