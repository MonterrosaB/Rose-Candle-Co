import { X } from "lucide-react";

const FormDiv = ({ children, headerLabel, onClose, onSubmit }) => {
  return (
    <div className="w-full max-w-3xl mx-auto shadow-2xl rounded-xl bg-white">
      {/* Encabezado */}
      <div className="flex justify-between items-center bg-[#C2A878] text-white text-xl p-4 font-bold rounded-t-xl">
        <span>{headerLabel}</span>
        <X
          className="cursor-pointer hover:scale-110 transition"
          onClick={onClose}
          strokeWidth={3}
        />
      </div>

      {/* Contenido del formulario */}
      <form onSubmit={onSubmit} className="p-6 space-y-4">
        {children}
      </form>
    </div>
  );
};

export default FormDiv;
