import React, { forwardRef } from "react";

// Componente reutilizable para inputs de formulario con etiqueta, estilos y validación
const FormInput = forwardRef(
  (
    {
      id,
      label,
      placeholder,
      type = "text",
      value,
      onChange,
      onBlur,
      name,
      maxLength,
      minLength,
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex justify-center mb-4 w-full">
        {/* Contenedor del input y elementos relacionados */}
        <div className="relative top-4 w-80">
          {/* Input del formulario */}
          <input
            ref={ref}
            type={type}
            id={id}
            name={name || id} // Usa name si se pasa, si no, usa id
            placeholder={placeholder}
            maxLength={maxLength}
            minLength={minLength}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full px-4 pt-3 pb-2 border rounded-lg focus:outline-none focus:ring-1 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-400 focus:ring-gray-400"
            }`}
            {...rest} // Cualquier otra prop adicional
          />

          {/* Etiqueta flotante sobre el input */}
          <label
            htmlFor={id}
            className={`absolute left-3 -top-3 font-medium px-1 text-md pointer-events-none bg-[#F7F5EE] ${
              error ? "text-red-500" : "text-gray-700"
            }`}
          >
            {label}
          </label>

          {/* Espacio reservado para mensaje de error */}
          <div className="h-5 mt-1">
            {error && <p className="text-red-500 text-sm px-1">{error}</p>}
          </div>
        </div>
      </div>
    );
  }
);

// Asigna un nombre al componente para facilitar debugging
FormInput.displayName = "FormInput";

export default FormInput;
