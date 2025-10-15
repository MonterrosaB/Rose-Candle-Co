// Input.jsx
import React from 'react';

const Input = ({
  name,
  label,
  type = "text",
  error,
  register,
  options,
  disabled = false,
  step,
  min,
  // Acepta una nueva prop para el manejo personalizado de cambios
  onChange: customOnChange // Renombrado para evitar conflicto
}) => {

  // Ejecuta register para obtener las props del input (incluyendo el onChange de RHF)
  const registeredProps = register(name, {
    required: `${label} es requerido`,
    ...options
  });

  // Función combinada para manejar el cambio:
  // 1. Ejecuta la función onChange de React Hook Form (para actualizar el estado del formulario).
  // 2. Ejecuta la función onChange personalizada (para aplicar el auto-formateo).
  const handleChange = (e) => {
    registeredProps.onChange(e); // 1. Llamar al onChange de RHF
    if (customOnChange) {
      customOnChange(e);        // 2. Llamar al onChange personalizado (formateo)
    }
  };

  return (
    <div className="mb-5 w-full">
      <div className="relative w-full">
        <input
          id={name}
          type={type}

          // Spread de las props de RHF, pero sobrescribiendo onChange
          {...registeredProps}
          onChange={handleChange}

          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border 
                        ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"} 
                        appearance-none focus:outline-none peer transition-colors duration-200`}
          placeholder=""
          disabled={disabled}
          step={step}
          min={min}
        />
        <label
          htmlFor={name}
          className="absolute text-sm text-neutral-800 font-medium duration-300 transform 
                        -translate-y-4 scale-90 top-2 z-10 origin-[0] bg-white px-2 
                        peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                        peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100
                        peer-focus:-translate-y-4 start-1 capitalize"
        >
          {label}
        </label>
      </div>
      <div className="h-5 mt-1">
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Input;