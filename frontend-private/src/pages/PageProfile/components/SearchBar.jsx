import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ placeholder = "Buscar...", onSearchChange, className = "" }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Si se proporciona una función, la llamamos con el nuevo valor
        if (onSearchChange) {
            onSearchChange(value);
        }
    };

    const handleClear = () => {
        setSearchTerm("");

        // Si se proporciona una función, la llamamos con un valor vacío
        if (onSearchChange) {
            onSearchChange("");
        }
    };

    return (
        <div className={`relative flex items-center w-full max-w-lg ${className}`}>

            {/* Icono de Búsqueda */}
            <Search className="absolute left-3 w-5 h-5 text-gray-400 pointer-events-none" />

            {/* Campo de Input */}
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2.5 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-150 shadow-sm"
            />

            {/* Botón de Limpiar (solo visible si hay texto) */}
            {searchTerm && (
                <button
                    onClick={handleClear}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-3 p-1 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition duration-150"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;