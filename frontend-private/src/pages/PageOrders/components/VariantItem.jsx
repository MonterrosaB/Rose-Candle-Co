import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const VariantItem = ({ product, variant, variantIndex, quantities, initialData, increment, decrement }) => {
    // Estado para colapsar/expandir la sección de materiales
    const [showMaterials, setShowMaterials] = useState(false);

    // Generar la clave de la variante
    const key = `${product._id}-${variantIndex}`;
    const qty = quantities[key] || 0;

    // Calcular el costo unitario de los materiales
    const totalCosto = variant.components.reduce(
        (acc, item) => acc + item.amount * item.idComponent.currentPrice,
        0
    );

    return (
        <div className="bg-white border border-gray-100 rounded-lg p-4 mb-4 shadow-md transition hover:shadow-lg">

            {/* Contenedor principal de la variante: Stacked en móvil, Fila en SM+ */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-4">

                {/* Info de la Variante (Lado Izquierdo) */}
                <div className="flex-shrink-0">
                    <h3 className="text-xl font-bold text-gray-800">
                        {variant.variant}
                    </h3>
                    <p className="text-lg text-green-700 font-extrabold mt-1">
                        Precio: ${variant.variantPrice}
                    </p>
                    <span className="text-sm text-gray-500">
                        Seleccionados: <span className="font-semibold">{qty}</span> unidad{qty !== 1 ? 'es' : ''}
                    </span>
                </div>

                {/* Controles y Botones (Lado Derecho) */}
                <div className="flex flex-col items-start sm:items-end gap-2 mt-3 sm:mt-0">

                    {/* Botones de Cantidad */}
                    <div className="flex items-center space-x-3">
                        {!initialData && (
                            <>
                                <button
                                    onClick={() => decrement(key)}
                                    className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-600 disabled:opacity-30 transition duration-150"
                                    aria-label={`Disminuir cantidad de ${variant.variant}`}
                                    disabled={qty <= 0}
                                    type="button"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>

                                <span className="font-extrabold text-xl min-w-[30px] text-center text-gray-900">{qty}</span>

                                <button
                                    onClick={() => increment(key)}
                                    className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-600 transition duration-150"
                                    aria-label={`Aumentar cantidad de ${variant.variant}`}
                                    type="button"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Botón Ver/Ocultar Materiales */}
                    <button
                        onClick={() => setShowMaterials(!showMaterials)}
                        className="text-blue-600 font-medium text-sm hover:text-blue-800 transition py-1 px-3 rounded-full bg-blue-50 hover:bg-blue-100 mt-2"
                        aria-expanded={showMaterials}
                        aria-controls={`materials-${key}`}
                        type="button"
                    >
                        {showMaterials ? "Ocultar detalles" : "Ver materiales"}
                    </button>
                </div>
            </div>

            {/* Sección de Materiales Colapsable */}
            {showMaterials && (
                <div id={`materials-${key}`} className="border-t border-gray-200 pt-4 mt-4 animate-fadeIn">
                    <h4 className="text-lg font-semibold mb-3 text-gray-700">
                        Materiales Requeridos (Total)
                    </h4>

                    <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm">
                        {variant.components.map((comp, i) => {
                            const cantidadTotal = comp.amount * qty;
                            return (
                                <li key={i}>
                                    <strong className="text-gray-900">{comp.idComponent.name}</strong>:
                                    <span className='ml-1 text-gray-800'>
                                        {comp.amount} {comp.idComponent.unit}
                                    </span>
                                    {` x ${qty} unidades =`}
                                    <span className="font-bold ml-1 text-red-600">
                                        {cantidadTotal.toFixed(2)} {comp.idComponent.unit}
                                    </span> (total)
                                </li>
                            );
                        })}
                    </ul>

                    {/* Costo Unitario */}
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-base font-semibold text-gray-800 border border-yellow-200">
                        Costo unitario aproximado de materiales: <strong className="text-red-700">${totalCosto.toFixed(2)}</strong>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VariantItem;

// Para que la animación de fadeIn funcione, podrías necesitar añadir esto a tu CSS global si no está ya:
/*
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
}
*/