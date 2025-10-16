import React from "react";
import VariantItem from "./VariantItem"

// Define VariantItem aquí o impórtalo desde su propio archivo
// (Copia el código del VariantItem aquí si prefieres un solo archivo)
// ... (Insertar código de VariantItem aquí) ...

const CartWithMaterials = ({ products, quantities, initialData, increment, decrement }) => {
    const items = Object.keys(quantities);

    if (items.length === 0) {
        return (
            <div className="flex justify-center items-center h-40 rounded-xl m-4">
                <p className="text-gray-500 text-xl font-medium">
                    No se han seleccionado productos.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8 min-h-36">
            <h1 className="text-3xl font-extrabold text-gray-800 border-b-4 pb-2">
                Resumen de venta
            </h1>

            {products.map((product) => {
                // Encontrar los índices de las variantes seleccionadas
                const variantesConIndices = product.variant
                    .map((variant, idx) => ({ variant, originalIndex: idx }))
                    .filter(({ variant, originalIndex }) =>
                        quantities.hasOwnProperty(`${product._id}-${originalIndex}`)
                    );

                if (variantesConIndices.length === 0) return null;

                return (
                    <div key={product._id} className="border border-gray-200 rounded-xl shadow-xl bg-white p-6">

                        {/* Título del Producto (Arriba, solo) */}
                        <div className="mb-4">
                            <h2 className="text-3xl font-bold text-gray-800 break-words">
                                {product.name}
                            </h2>
                        </div>

                        {/* Imagen y Divisor (Abajo del Título) */}
                        <div className="flex items-center gap-6 mb-6 pb-4 border-b border-gray-100">
                            <img
                                src={product.images?.[0] || 'placeholder.png'}
                                alt={product.name}
                                className="w-24 h-24 object-cover rounded-xl shadow-md flex-shrink-0"
                            />
                            {/* Espacio vacío para rellenar (si es necesario) o simplemente dejar un hueco */}
                            <div className="flex-grow">
                                <p className="text-gray-500 text-sm italic">
                                    {/* Puedes añadir una descripción corta o una referencia aquí si quieres aprovechar el espacio */}
                                </p>
                            </div>
                        </div>

                        {/* Listado de Variantes Seleccionadas */}
                        <div className="space-y-4">
                            {variantesConIndices.map(({ variant, originalIndex }) => (
                                <VariantItem
                                    key={`${product._id}-${originalIndex}`}
                                    product={product}
                                    variant={variant}
                                    variantIndex={originalIndex}
                                    quantities={quantities}
                                    initialData={initialData}
                                    increment={increment}
                                    decrement={decrement}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CartWithMaterials;