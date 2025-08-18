const ProductList = ({ onEdit, products }) => {

  return (
    <>
      {products && products.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
          {products.map((product, i) => (
            <div
              className="flex w-full max-w-sm border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-transform duration-200 hover:-translate-y-1 bg-gray-100 mx-auto"
              onDoubleClick={() => onEdit(product)}
              key={product._id}
              tabIndex={i}
            >
              {/* Imagen (mitad izquierda) */}
              <div className="w-1/2 flex flex-col items-center justify-center p-4"> {/* ← más margen */}
                <img
                  src={product.images[0]}
                  alt={`Imagen de ${product.name}`}
                  className="w-full h-36 object-cover rounded mb-2" // ← imagen un poco más chica y con margen abajo
                />
                <div
                  className={`text-xs px-2 py-1 rounded-full w-full text-center ${product.availability ? "bg-green-600 text-white" : "bg-gray-400 text-white"
                    }`}
                >
                  <div className="text-xs px-2 py-1 rounded-full w-full text-center text-white">
                    {product.variant?.length > 0
                      ? product.variant.map((v, i) => v.variant).join(" | ")
                      : "Sin variantes"}
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center">{product.idProductCategory?.name} | {product.idCollection?.name}</p>
              </div>

              {/* Información (mitad derecha) */}
              <div className="w-1/2 p-4 space-y-2 text-gray-800">
                <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Variantes:</p>
                  {product.variant?.length > 0 ? (
                    product.variant.map((v, i) => (
                      <div key={i} className="text-sm flex justify-between gap-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          ${parseFloat(v.variantPrice || 0).toFixed(2)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">Sin variantes</p>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Costo:</p>
                  {product.variant?.length > 0 ? (
                    product.variant.map((v, i) => (
                      <div key={i} className="text-sm flex justify-between gap-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          ${parseFloat(v.variantPrice || 0).toFixed(2)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">Sin variantes</p>
                  )}
                </div>


                <p className="text-sm text-gray-500">Últ: {new Date(product.updatedAt).toLocaleDateString("en-GB")}</p>
              </div>
            </div>
          ))}
        </div>
      )
        : (
          <p>No hay productos disponibles</p>
        )
      }
    </>

  );
};
export default ProductList;
