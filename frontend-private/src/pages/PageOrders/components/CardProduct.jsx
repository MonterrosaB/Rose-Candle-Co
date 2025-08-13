import { useState } from "react";
import SearchBar from "../../../global/components/SearchBar";

const CardProduct = ({ productos }) => {
    const [busqueda, setBusqueda] = useState("");
    const [seleccionados, setSeleccionados] = useState({}); 
    // { idProducto: cantidad }

    const productosFiltrados = productos.filter((producto) =>
        producto.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    const toggleSeleccion = (producto) => {
        setSeleccionados((prev) => {
            if (prev[producto.id]) {
                // Si ya está seleccionado, lo quitamos
                const copia = { ...prev };
                delete copia[producto.id];
                return copia;
            } else {
                // Si no está seleccionado, lo agregamos con cantidad 1
                return { ...prev, [producto.id]: 1 };
            }
        });
    };

    const cambiarCantidad = (id, delta) => {
        setSeleccionados((prev) => {
            const nuevaCantidad = (prev[id] || 1) + delta;
            if (nuevaCantidad < 1) return prev; // No bajar de 1
            return { ...prev, [id]: nuevaCantidad };
        });
    };

    return (
        <>
            {/* Barra de búsqueda */}
            <SearchBar
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar Producto..."
            />

            {/* Contenedor principal */}
            <div className="p-4 flex flex-col gap-4">
                {/* Grid con scroll */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[12rem] overflow-y-auto pr-1 snap-y snap-mandatory">
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map((producto) => {
                            const seleccionado = seleccionados[producto.id] !== undefined;

                            return (
                                <div
                                    key={producto.id}
                                    className={`p-2 flex flex-col items-center justify-center text-center font-serif text-sm rounded snap-start shadow-md cursor-pointer transition-colors duration-200 ${
                                        seleccionado ? "bg-green-200" : "bg-[#F0ECE6]"
                                    }`}
                                    onClick={() => toggleSeleccion(producto)}
                                >
                                    <img
                                        src={producto.images[0]}
                                        alt={producto.name}
                                        className="w-10 h-14 object-contain mb-1"
                                    />
                                    <h2 className="font-medium">{producto.name}</h2>

                                    {seleccionado && (
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    cambiarCantidad(producto.id, -1);
                                                }}
                                                className="px-2 py-1 bg-red-300 rounded hover:bg-red-400"
                                            >
                                                -
                                            </button>
                                            <span className="min-w-[1.5rem] text-center">
                                                {seleccionados[producto.id]}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    cambiarCantidad(producto.id, 1);
                                                }}
                                                className="px-2 py-1 bg-green-300 rounded hover:bg-green-400"
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-gray-500 text-base p-4">
                            No hay productos disponibles
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CardProduct;
