import { Plus } from "lucide-react";
const DropDown = ({ name, options, label, error, hideIcon = true, register, placeHolder = "Selecciona una opción", disabled = false }) => {
  return (
    <div className="flex justify-center items-baseline gap-4 mb-4 w-full">
      <div className="relative w-full overflow-visible">
        <select
          disabled={disabled}
          id={name}
          {...register(name, { required: "Selecciona una opción" })}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border 
      ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"} 
      appearance-none focus:outline-none peer transition-colors duration-200`}
          defaultValue=""
        >
          <option value="" disabled hidden>{placeHolder}</option>
          {options.map((opt) => (
            <option key={opt._id} value={opt._id} className="text-gray-700 text-sm">
              {opt.label}
            </option>
          ))}
        </select>
        <label
          htmlFor={name}
          className="absolute text-sm text-neutral-800 font-medium duration-300 transform 
            -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 
            peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
            peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75
            peer-focus:-translate-y-4 start-1 capitalize"
        >
          {label}
        </label>

        <div className="h-5 mt-1">
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
      {(!hideIcon &&
        < div className="cursor-pointer text-gray-500">
          <Plus size={18} />
        </div>
      )
      }


    </div >
  );
};

export default DropDown;
