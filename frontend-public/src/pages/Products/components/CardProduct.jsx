const CardProduct = ({
  name,
  description,
  images,
  currentPrice,
  components,
}) => {
  const imageUrl = images?.[0] || "https://via.placeholder.com/150";

  return (
    <div className="bg-[#F0ECE6] shadow-md rounded-2xl p-4 w-full max-w-sm text-[#333] space-y-3">
      <div className="flex gap-4 items-center">
        <div className="w-1/2">
          <img
            src={imageUrl}
            alt={`Imagen de ${name}`}
            className="w-full h-32 object-cover rounded-sm"
          />
        </div>
        <div className="w-1/2 space-y-1">
          <h2 className="font-serif text-xl font-semibold">{name}</h2>
          <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
          <p className="text-sm text-gray-600">
            Precio: ${parseFloat(currentPrice || 0).toFixed(2)}
          </p>
        </div>
      </div>

      {components?.length > 0 && (
        <div className="pt-2">
          <p className="text-sm text-gray-700 font-medium mb-1">Componentes:</p>
          <div className="flex flex-wrap gap-2">
            {components.map((comp, idx) => (
              <span
                key={idx}
                className="bg-white border border-gray-300 text-sm text-gray-700 px-3 py-1 rounded-full"
              >
                {comp.amount} {comp.unit}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProduct;
