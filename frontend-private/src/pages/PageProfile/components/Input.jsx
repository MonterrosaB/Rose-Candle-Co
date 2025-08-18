// Input para el formulario
import React from "react";

const Input = ({ className = "", icon: Icon, type = "text", ...props }) => (
  <div className="relative">
    {Icon && (
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
        <Icon />
      </div>
    )}
    <input
      type={type}
      className={`flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        Icon ? "pl-10" : "pl-3"
      } ${className}`}
      {...props}
    />
  </div>
);

export default Input;
