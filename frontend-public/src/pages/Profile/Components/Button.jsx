// Botón para el formulario
import React from "react";

const Button = ({ 
  children, 
  className = "", 
  onClick, 
  icon: Icon, 
  text, 
  ...props 
}) => (
  <button
    className={`inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${className}`}
    onClick={onClick}
    {...props}
  >
    {Icon && <Icon className="w-4 h-4 mr-2" />}
    {text || children}
  </button>
);

export default Button;
