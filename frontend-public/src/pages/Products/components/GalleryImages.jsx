import { useState } from "react";

const GaleryProduct = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images?.[0]);
  const [hoveredImage, setHoveredImage] = useState(null);

  const activeImage = hoveredImage || mainImage;

  return (
    <div className="w-full md:w-1/2 space-y-4">
      {/* Imagen principal con tamaño fijo */}
      <div className="mx-auto overflow-hidden rounded-xl  w-full h-[500px]">
        <img
          src={activeImage}
          alt="Imagen principal"
          className="w-full h-full object-cover rounded-xl transition-all duration-300"
        />
      </div>

      {/* Miniaturas */}
      {product.images?.length > 1 && (
        <div className="flex gap-4 overflow-x-auto">
          {product.images.map((imgUrl, index) => {
            const isActive = imgUrl === mainImage;

            return (
              <div
                key={index}
                className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-shadow
    ${isActive ? "shadow-lg shadow-blue-200" : ""}
  `}
                onClick={() => setMainImage(imgUrl)}
                onMouseEnter={() => setHoveredImage(imgUrl)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src={imgUrl}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                {/* Overlay sombreado */}
                <div className="absolute inset-0 bg-gray-400 bg-opacity-14 opacity-0 hover:opacity-70 transition-opacity rounded-lg"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GaleryProduct;
