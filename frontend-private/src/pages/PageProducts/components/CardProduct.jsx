import { Link } from "react-router-dom";

const CardProduct = ({
  _id,
  images,
  name,
  currentPrice,
  cost,
  size,
  category,
  timestamps,
  availability,
  onClick
}) => {
  return (
    <div
      className="flex w-full max-w-sm border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-transform duration-200 hover:-translate-y-1 bg-gray-100 mx-auto"
      onClick={onClick}
    >
      {/* Imagen (mitad izquierda) */}
      <div className="w-1/2 flex flex-col items-center justify-center p-4"> {/* ← más margen */}
        <img
          src={images}
          alt={`Imagen de ${name}`}
          className="w-full h-36 object-cover rounded mb-2" // ← imagen un poco más chica y con margen abajo
        />
        <p className="text-sm text-gray-500 text-center">Categoría: {category}</p>
      </div>

      {/* Información (mitad derecha) */}
      <div className="w-1/2 p-4 space-y-2 text-gray-800">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-sm">
          <span className="font-semibold">Precio:</span> ${currentPrice}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Costo:</span> ${cost}
        </p>
        <div className="text-xs bg-green-700 text-white px-3 py-1 rounded-full inline-block">
          {size}
        </div>
        <p className="text-sm text-gray-500">Últ: {timestamps}</p>
        <span
          className={`text-xs px-2 py-1 rounded-full ${availability ? "bg-green-600 text-white" : "bg-gray-400 text-white"
            }`}
        >
          {availability ? "Activo" : "Inactivo"}
        </span>
      </div>
    </div>
  );
};

export default CardProduct;
