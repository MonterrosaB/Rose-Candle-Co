const CardProduct = ({
    image,
    name,
    price,
    cost,
    size,
    category,
    lastUpdated,
    activo // <- campo booleano
}) => {
    return (
        <div className="bg-[#F0ECE6] shadow-md rounded-2xl p-4 w-full max-w-sm text-[#333] space-y-3">
            <div className="flex gap-4 items-center">
                <div className="w-1/2">
                    <img
                        src={image}
                        alt={`Imagen de ${name}`}
                        className="w-full h-32 object-cover rounded-sm"
                    />
                    <div
                        className={`text-white text-xs text-center px-2 py-1 rounded mt-2
                            ${activo ? "bg-green-900" : "bg-gray-400"}
                        `}
                    >
                        {size}
                    </div>
                </div>
                <div className="w-1/2 space-y-1">
                    <h2 className="font-serif text-xl font-semibold">{name}</h2>
                    <p className="text-lg font-medium">{price}</p>
                    <p className="text-sm text-gray-600">Costo: {cost}</p>
                </div>
            </div>

            <div className="flex justify-around text-sm text-gray-700 px-1">
                <span>{category}</span>
                <span>Últ: {lastUpdated}</span>
            </div>
        </div>
    );
};

export default CardProduct;
