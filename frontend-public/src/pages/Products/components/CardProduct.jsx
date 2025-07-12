import { Link } from "react-router-dom";

const CardProduct = ({
  _id,
  name,
  description,
  images,
  currentPrice,
  components,
  variant
}) => {
  const imageUrl = images?.[0];

  return (
    <Link
      to={`/product/${_id}`}
      className="block w-full max-w-xs mx-auto transition-transform duration-300 ease-in-out hover:shadow-md hover:-translate-y-1"
    >
      <div className="aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden">
        <img
          src={imageUrl}
          alt={`Imagen de ${name}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-3 mt-4 text-gray-900 p-2">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Simple separación visual */}
        <div className="mt-6 space-y-2">
          {components?.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {variant.map((comp, id) => (
                <span
                  key={id}
                  className="border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700"
                >
                  {comp.variant}
                </span>
              ))}
            </div>
          )}
          <p className="font-bold text-xl">
            {variant?.map(v => `$${Number(v.variantPrice || 0).toFixed(2)}`).join(" | ")}          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
