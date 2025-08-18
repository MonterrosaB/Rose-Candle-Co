const DropDownFilter = ({ value, onChange, options, label, all = true }) => {
    return (
        <div className="flex justify-center items-baseline gap-4 mb-4 w-full">
            <div className="relative w-full overflow-visible">
                <select
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border border-gray-300 focus:border-black appearance-none focus:outline-none peer transition-colors duration-200"
                    value={value}
                    onChange={onChange}
                >
                    {/* opción "todos" */}
                    {all &&
                        <option value="">Todos</option>
                    }
                    {options.map((opt) => (
                        <option
                            key={opt._id}
                            value={String(opt._id)} // asegura que sea string
                            className="text-gray-700 text-sm"
                        >
                            {opt.label || opt.name}
                        </option>
                    ))}
                </select>
                <label
                    className="absolute text-sm text-neutral-800 font-medium duration-300 transform 
            -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 
            peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
            peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75
            peer-focus:-translate-y-4 start-1 capitalize"
                >
                    {label}
                </label>
            </div>
        </div>
    );
};

export default DropDownFilter;
