// Componente para el input del formulario (incluye el label)
import React from "react";

const FormInput = ({ id, label, placeholder, type = "text", value, onChange, maxLength, minLength }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="relative mb-4 top-4">
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          value={value}
          onChange={onChange}
          className="w-80 px-4 pt-3 pb-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <label
          htmlFor={id}
          className="absolute left-3 -top-3 text-gray-700 font-medium px-1 text-md pointer-events-none bg-[#F7F5EE]">
          {label}
        </label>
      </div>
    </div>
  );
};

export default FormInput;