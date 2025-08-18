// Label para el formulario
import React from "react";

const Label = ({ 
  children, 
  className = "", 
  htmlFor, 
  icon: Icon, 
  text, 
  ...props 
}) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 ${className}`}
    htmlFor={htmlFor}
    {...props}
  >
    {Icon && <Icon className="w-4 h-4 text-gray-500" />}
    {text || children}
  </label>
);

export default Label;
