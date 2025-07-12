// Componente para el input de recuperar contra
import React from "react";

const FormInput = React.forwardRef(
  (
    {
      id,
      label,
      placeholder,
      type = "text",
      maxLength,
      minLength,
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-80">
          <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            maxLength={maxLength}
            minLength={minLength}
            ref={ref}
            {...rest}
            className={`peer w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none focus:ring-1 bg-[#F7F5EE] transition-all duration-150
              ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-400 focus:ring-[#A78A5E]"
              }`}
          />
          <label
            htmlFor={id}
            className="absolute left-3 top-1 text-gray-700 text-sm font-medium px-1 bg-[#F7F5EE] peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#7D7954] peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm transition-all duration-150"
          >
            {label}
          </label>
        </div>

        {error && (
          <span className="text-red-500 text-sm mt-1 w-80 text-left">{error}</span>
        )}
      </div>
    );
  }
);

export default FormInput;