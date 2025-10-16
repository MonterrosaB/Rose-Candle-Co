import React from "react";

const ProductSelector = ({
    initialData,
    search,
    setSearch,
    filteredProducts,
    quantities,
    selectedProduct,
    selectedVariant,
    setSelectedVariant,
    openVariantSelector,
    confirmVariantSelection,
    setSelectedProduct,
}) => {
    if (initialData) return null;

    return (
        <>
            {/* Input de búsqueda */}
            <input
                type="search"
                placeholder="Buscar Producto..."
                className="w-full p-3 rounded border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-64 overflow-y-auto min-h-40">
                {filteredProducts.map((prod) => {
                    const isSelected = Object.keys(quantities).some((key) =>
                        key.startsWith(prod._id)
                    );
                    return (
                        <div
                            key={prod._id}
                            onClick={() => openVariantSelector(prod)}
                            className={`cursor-pointer p-3 rounded-lg shadow-sm border ${isSelected ? "bg-pink-200" : "bg-pink-50 border-pink-200"
                                } hover:shadow-md transition`}
                        >
                            <img
                                src={prod.images?.[0]}
                                alt={prod.name}
                                className="w-full h-28 object-cover rounded mb-2"
                            />
                            <p className="text-center font-semibold">{prod.name}</p>
                        </div>
                    );
                })}
            </div>

            {/* Modal de variantes */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black/10 bg-opacity-10 flex items-center justify-center z-50 m-auto">
                    <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
                        <h3 className="font-bold text-lg mb-4">{selectedProduct.name}</h3>

                        <div className="flex flex-col gap-3">
                            {selectedProduct.variant?.map((v, idx) => (
                                <button
                                    type="button"
                                    key={idx}
                                    onClick={() =>
                                        setSelectedVariant((prev) => ({
                                            ...prev,
                                            [selectedProduct._id]: idx,
                                        }))
                                    }
                                    className={`px-4 py-2 rounded-lg border text-left ${selectedVariant[selectedProduct._id] === idx
                                        ? "bg-pink-500 text-white border-pink-500"
                                        : "bg-gray-100 border-gray-300"
                                        }`}
                                >
                                    {v.variant} – ${v.variantPrice}
                                </button>
                            ))}
                        </div>

                        <div className="mt-5 flex justify-between">
                            <button
                                type="button"
                                onClick={confirmVariantSelection}
                                className="px-4 py-2 bg-black text-white rounded-lg"
                            >
                                Seleccionar
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedProduct(null)}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductSelector;
