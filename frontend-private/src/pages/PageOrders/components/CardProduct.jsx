import { useState } from "react";
import SearchBar from "../../../global/components/SearchBar";

const CardProduct = ({ productos }) => {
    const [busqueda, setBusqueda] = useState("");

    const productosFiltrados = productos.filter((producto) =>
        producto.name.toLowerCase().includes(busqueda.toLowerCase())
    );

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
                        productosFiltrados.map((producto) => (
                            <div
                                key={producto.id}
                                className="bg-[#F0ECE6] p-2 flex flex-col items-center justify-center text-center font-serif text-sm rounded snap-start shadow-md"
                            >
                                <img
                                    src={producto.images[0]}
                                    alt={producto.name}
                                    className="w-10 h-14 object-contain mb-1"
                                />
                                <h2 className="font-medium">{producto.name}</h2>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-gray-500 text-base p-4">
                            No hay productos disponibles
                        </div>)}
                </div>
            </div>
        </>
    );
};

export default CardProduct;
