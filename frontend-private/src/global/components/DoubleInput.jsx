const DoubleInput = ({
    id,
    grupo,
    register,
    name1,
    name2,
    placeholder1,
    placeholder2,
    error1,
    error2,
    options1 = {},
    options2 = {},
    eliminarInput
}) => {
    return (
        <div className="mb-2 w-full">
            <button
                type="button"
                onClick={() => eliminarInput()}
                className="right-2 text-gray-500 hover:text-red-500"
            >
                ✕
            </button>
            <div className="flex w-full">
                {/* Botón X */}

                {/* Primer input */}
                <div className="flex justify-center items-baseline gap-4 w-1/2">
                    <div className="relative w-full">
                        <input
                            id={name1}
                            type="text"
                            placeholder={placeholder1}
                            {...register(name1, options1)}
                            className={`block px-2.5 py-2.5 w-full text-sm rounded-lg border 
                ${error1 ? "border-red-500" : "border-gray-300"} 
                focus:outline-none transition-colors duration-200`}
                        />
                        <div className="mt-1 min-h-[1.25rem]">
                            {error1 && <p className="text-sm text-red-500">{error1}</p>}
                        </div>
                    </div>
                </div>

                {/* Segundo input */}
                <div className="w-1/2">
                    <input
                        id={name2}
                        type="text"
                        placeholder={placeholder2}
                        {...register(name2, options2)}
                        className={`block px-2.5 py-2.5 w-full text-sm rounded-lg border 
              ${error2 ? "border-red-500" : "border-gray-300"} 
              focus:outline-none transition-colors duration-200`}
                    />
                    <div className="mt-1 min-h-[1.25rem]">
                        {error2 && <p className="text-sm text-red-500">{error2}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoubleInput;
