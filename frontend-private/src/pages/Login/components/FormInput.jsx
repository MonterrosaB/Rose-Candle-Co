// Componente para el input del formulario (incluye el label)
import React from "react";

const FormInput = ({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  maxLength,
  minLength,
  error,
}) => {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="relative">
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          value={value}
          onChange={onChange}
          className={`w-80 px-4 pt-3 pb-2 border rounded-lg focus:outline-none focus:ring-1
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-400 focus:ring-gray-400"
            }`}
        />
        <label
          htmlFor={id}
          className="absolute left-3 -top-3 text-gray-700 font-medium px-1 text-md pointer-events-none bg-[#F7F5EE]"
        >
          {label}
        </label>
      </div>

      {/* Mensaje de error */}
      {error && (
        <span className="text-red-500 text-sm mt-1 w-80 text-left">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;