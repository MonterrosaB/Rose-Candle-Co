const Input = ({ name, label, type = "text", error, register }) => {

  return (
    <div className="mb-5 w-full">
      <div className="relative w-full">
        <input
          id={name}
          type={type}
          {...register(name, { required: `${label} es un campo requerido` })}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border 
            ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"} 
            appearance-none focus:outline-none peer transition-colors duration-200`}
          placeholder=" "
        />
        <label
          htmlFor={name}
          className="absolute text-sm text-neutral-800 font-medium duration-300 transform 
            -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#F7F5EE] px-2 
            peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
            peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75
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
