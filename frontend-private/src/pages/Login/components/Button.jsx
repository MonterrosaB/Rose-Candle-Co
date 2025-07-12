// Componente para el botón del formulario
import React from "react";

const FormButton = ({ title, onClick, disabled }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={disabled}
        type="submit"
        className="py-2 px-6 mt-5 border border-[#C2A878] rounded-lg text-[#C2A878] font-medium cursor-pointer transition duration-200 hover:bg-[#C2A878] hover:text-[#F7F5EE]"
      >
        {title}
      </button>
    </div>
  );
};

export default FormButton;