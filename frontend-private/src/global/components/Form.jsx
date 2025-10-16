import { X } from "lucide-react";

const FormDiv = ({ children, headerLabel, onClose, onSubmit }) => {
  return (
    <div
      className="
 bg-white
          w-full
          max-h-[95vh]
          overflow-y-auto
          rounded-xl
          shadow-2xl
          transform transition-all duration-300 ease-out
          max-w-xs
          sm:max-w-md
          lg:max-w-xl 
          xl:max-w-2xl
    "
    >
      {/* Encabezado */}
      <div
        className="sticky top-0 z-20 flex justify-between items-center 
                   bg-[#C2A878] text-white text-xl p-4 font-extrabold 
                   rounded-t-xl shadow-md border-b-2"
      >
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
