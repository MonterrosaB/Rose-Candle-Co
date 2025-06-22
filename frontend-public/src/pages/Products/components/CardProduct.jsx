import { Link } from "react-router-dom";

const CardProduct = ({
  _id,
  name,
  description,
  images,
  currentPrice,
  components,
  // idProductCategory
}) => {
  const imageUrl = images?.[0];

  return (
    <Link
      to={`/product/${_id}`}
      className="radial-gradient(circle, rgba(223, 204, 172, 0.63) 0%, rgba(223, 204, 172, 0) 40%) block w-full max-w-xs mx-auto transition duration-300 ease-in-out transform hover:shadow-md hover:-translate-y-1 rounded-2xl"
    >
      <div className="radial-gradient(circle, rgba(223, 204, 172, 0.63) 0%, rgba(223, 204, 172, 0) 40%) rounded-2xl p-4 w-full text-[#333] transition duration-300 ease-in-out">
        <div>
          <img
            src={imageUrl}
            alt={`Imagen de ${name}`}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>

        <div className="space-y-1 mt-2">
          <h2 className="font-serif text-xl font-semibold">{name}</h2>
          <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
        </div>

        {components?.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-2">
              {components.map((comp, id) => (
                <span
                  key={id}
                  className="radial-gradient(circle, rgba(223, 204, 172, 0.63) 0%, rgba(223, 204, 172, 0) 40%) border border-black text-xs text-black px-2 py-0.5 rounded-full"
                >
                  {comp.amount} {comp.unit}
                </span>
              ))}
            </div>
          </div>
        )}

        <h2 className="font-serif text-xl font-semibold mt-3">
          Precio: ${parseFloat(currentPrice || 0).toFixed(2)}
        </h2>
      </div>
    </Link>
  );
};

{
  /* <p className="font-serif text-xs font-semibold">Categoría: {idProductCategory}</p> */
}

export default CardProduct;
