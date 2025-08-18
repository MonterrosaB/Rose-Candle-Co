import { useState } from "react";
import AddToCartButton from "./ButtonAddToCard.jsx";
import GalleryImages from "./GalleryImages.jsx";


const CardProductDetail = ({ product }) => {


  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  console.log(selectedVariantIndex);


  return (
    <div className="radial-gradient(circle, rgba(223, 204, 172, 0.63) 0%, rgba(223, 204, 172, 0) 40%) max-w-6xl w-full rounded-2xl p-8 flex gap-30 flex-col md:flex-row">
      <GalleryImages product={product} />

      <div className="flex-1 space-y-4">
        <h3 className="text-xs italic text-gray-400">ROSE CANDLE CO</h3>
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-600 text-lg">{product.description}</p>

        {/* Disponibilidad */}
        <p className={`font-semibold ${product.availability ? "text-green-600" : "text-red-600"}`}>
          {product.availability ? "Disponible" : "No disponible"}
        </p>
        {/* Variantes */}
        <h3 className="text-gray-400">Variantes</h3>
        <select className="list-disc list-inside text-"
          value={selectedVariantIndex}
          onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
        >
          {product.variant.map((v, idx) => (
            <option key={idx} value={idx}>
              {v.variant} - ${v.variantPrice}
            </option>
          ))}
        </select>
        {/* Componentes por variante seleccionada */}
        {product.variant[selectedVariantIndex]?.components?.length > 0 && (
          <div>
            <h3 className="text-gray-400">Componentes de la variante {product.variant[selectedVariantIndex].variant}</h3>
            <ul className="list-disc list-inside text-sm">
              {product.variant[selectedVariantIndex].components.map((comp, i) => (
                <li key={i}>
                  {comp.idComponent?.name || "Nombre no disponible"}
                </li>
              ))}
            </ul>
          </div>
        )}


        {/* Instrucciones de uso */}
        {product.useForm?.length > 0 ? (
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-400 ">Recomendaciones:</h3>
            {product.useForm.map((comp, i) => (
              <p key={i} className="text-sm text-black px-3 py-1">
                {comp.instruction}
              </p>
            ))}
          </div>
        ) : (
          <p>No hay instrucciones disponibles.</p>
        )}

        {/* Cantidad y botón agregar al carrito */}
        <div className="flex flex-col items-center gap-4 pt-4 w-full max-w-sm">
          <span className="text-sm text-gray-600 self-start pl-2">Quantity</span>

          <div className="flex items-center justify-center gap-2 border rounded-2xl p-2 w-full">
            <button
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              className="text-black px-2 rounded hover:scale-90 hover:bg-gray-300 text-2xl transition-transform duration-200"
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="text-black px-2 rounded hover:scale-90 hover:bg-gray-300 text-2xl transition-transform duration-200"
            >
              +
            </button>
          </div>

          <AddToCartButton product={product} quantity={quantity} selectedVariantIndex={selectedVariantIndex} />
        </div>
      </div>
    </div>
  );
};

export default CardProductDetail;
