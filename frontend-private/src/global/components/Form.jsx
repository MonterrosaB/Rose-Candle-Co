import { X } from "lucide-react";

const FormDiv = ({ children, headerLabel, onClose, onSubmit }) => {
  return (
    <div className="
      bg-white
      w-full
      max-w-xs        /* móvil muy pequeño */
      sm:max-w-sm     /* ≥640px */
      md:max-w-md     /* ≥768px */
      lg:max-w-3xl    /* ≥1024px */
      xl:max-w-5xl    /* ≥1280px */
      max-h-screen
      sm:max-h-[90vh] /* deja margen superior/inferior */
      overflow-y-auto
      rounded-xl
      shadow-2xl
      relative
    ">
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
