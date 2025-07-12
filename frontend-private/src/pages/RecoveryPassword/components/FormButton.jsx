// Botón para enviar el formulario (provisional)
import React from "react";

const FormButton = ({ title, onClick, disabled }) => {
  return (
    <div className="flex justify-center w-full">
      <button
        onClick={onClick}
        disabled={disabled}
        type="submit"
        className="px-6 py-3 mt-0 border border-[#C2A878] cursor-pointer rounded-lg text-[#C2A878] font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-[#C2A878] hover:text-[#F7F5EE]"
      >
        {title}
      </button>
    </div>
  );
};

export default FormButton;