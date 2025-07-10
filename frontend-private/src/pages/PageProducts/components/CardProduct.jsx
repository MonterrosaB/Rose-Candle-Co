// Card personalizada para mostrar la información del producto

//const CardProduct = ({
 //   image,
   // name,
    //price,
 //   cost,
 //   size,
   // category,
    //lastUpdated,
    //activo 

import { Link } from "react-router-dom";

const CardProduct = ({
    _id,
    images,
    name,
    price,
    cost,
    size,
    category,
    lastUpdated,
    activo, // booleano
  }) => {
    return (
        <Link
        to={`/product/${_id}`}
        className="block w-full max-w-xs mx-auto transition-transform duration-300 ease-in-out hover:shadow-md hover:-translate-y-1"
      >
      <div className="block w-full max-w-xs mx-auto transition-transform duration-300 ease-in-out hover:shadow-md hover:-translate-y-1">
        <div className="aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden">
          <img
            src={images}
            alt={`Imagen de ${name}`}
            className="w-full h-full object-cover"
          />
        </div>
  
        <div className="space-y-3 mt-4 text-gray-900">
          <h3 className="font-bold text-lg">{name}</h3>
  
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700">
              {size}
            </span>
            <span
              className={`border rounded-full px-3 py-1 text-xs text-white ${
                activo ? "bg-green-700" : "bg-gray-400"
              }`}
            >
              {activo ? "Activo" : "Inactivo"}
            </span>
          </div>
  
          <div className="space-y-1 mt-4">
            <p className="font-bold text-xl">{price}</p>
            <p className="text-sm text-gray-600">Costo: {cost}</p>
            <p className="text-sm text-gray-500">Categoría: {category}</p>
            <p className="text-sm text-gray-500">Últ. actualización: {lastUpdated}</p>
          </div>
        </div>
      </div>
      </Link>
    );
  };
  
  export default CardProduct;
  
