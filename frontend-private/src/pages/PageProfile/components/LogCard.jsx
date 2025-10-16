import { User, Activity, Trash2, Edit, LogIn, Clock, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from 'react'; // Importamos useState para el toggle
import SearchBar from "./SearchBar";

// Importamos todos los íconos necesarios (asegúrate de que estén disponibles en el archivo principal)
// Solo se incluye el código del componente LogCard y las funciones auxiliares.

// Función para obtener el ícono y color basado en la acción (Sin Cambios)
const getLogStyling = (action) => {
    switch (action.toLowerCase()) {
        case 'update':
            return { icon: Edit, color: 'bg-yellow-100', iconColor: 'text-yellow-700', description: 'border-l-4 border-yellow-500 bg-white hover:bg-yellow-50/70' };
        case 'create':
            return { icon: Activity, color: 'bg-green-100', iconColor: 'text-green-700', description: 'border-l-4 border-green-600 bg-white hover:bg-green-50/70' };
        case 'delete':
            return { icon: Trash2, color: 'bg-red-100', iconColor: 'text-red-700', description: 'border-l-4 border-red-600 bg-white hover:bg-red-50/70' };
        case 'login':
            return { icon: LogIn, color: 'bg-blue-100', iconColor: 'text-blue-700', description: 'border-l-4 border-blue-600 bg-white hover:bg-blue-50/70' };
        default:
            return { icon: Clock, color: 'bg-gray-100', iconColor: 'text-gray-600', description: 'border-l-4 border-gray-500 bg-white hover:bg-gray-50/70' };
    }
};

const LogCard = ({ log, t }) => {
    const { icon: Icon, color, description, iconColor } = getLogStyling(log.action);
    const [isExpanded, setIsExpanded] = useState(false); // Nuevo estado para expandir la descripción

    // Formatear la fecha para un look más profesional
    const formattedDate = new Date(log.createdAt).toLocaleString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    // 1. Obtener el nombre del usuario populado
    const userName = log.user
        ? `${log.user.name} ${log.user.surnames}`.trim()
        : t("system_user"); // Mensaje por defecto si no hay usuario

    // Determinar si la descripción es larga y necesita el toggle
    const needsToggle = log.description && log.description.length > 100;

    return (
        <div
            className={`flex flex-col p-4 rounded-xl shadow-lg transition duration-300 ease-in-out ${description} border border-gray-100`}
        >
            {/* Cabecera del Log (Ícono, Título y Colección) */}
            <div className="flex items-start">

                {/* Ícono de Acción */}
                <div className={`p-3 rounded-xl ${color} mr-4 flex-shrink-0 shadow-inner`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>

                {/* Título Principal */}
                <div className="flex-grow">
                    <p className="text-lg font-bold text-gray-800">
                        {t(log.action.toLowerCase()) || log.action}
                    </p>
                    <p className="text-sm font-medium text-gray-500 mt-0.5">
                        {t("collection")}: {log.collectionAffected}
                    </p>
                </div>

                {/* Metadata a la derecha */}
                <div className="flex flex-col items-end flex-shrink-0 ml-4">
                    <p className="text-xs text-gray-400 font-mono">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {formattedDate}
                    </p>
                </div>
            </div>

            {/* Fila del Usuario y Descripción */}
            <div className="mt-3 pl-14"> {/* Alineación con el contenido principal */}

                {/* Info del Usuario */}
                <p className="text-sm font-semibold text-indigo-600 mb-2 flex items-center">
                    <User className="w-4 h-4 mr-1.5 text-indigo-400" />
                    {userName}
                </p>

                {/* 2. Descripción con Expansión */}
                <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className={!isExpanded && needsToggle ? "line-clamp-2" : ""}>
                        {log.description || t("no_description_provided")}
                    </p>
                </div>

                {/* Botón de Expansión/Contracción */}
                {needsToggle && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs text-blue-600 hover:text-blue-800 mt-1 flex items-center transition duration-150"
                    >
                        {isExpanded ? t("show_less") : t("show_more")}
                        {isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                    </button>
                )}
            </div>

            {/* 3. Target ID (Información secundaria, en el pie de página) */}
            {log.targetId && (
                <div className="mt-3 pt-3 border-t border-gray-100 text-right">
                    <span className="text-xs text-gray-400 font-mono">
                        {t("target_id")}: {log.targetId}
                    </span>
                </div>
            )}
        </div>
    );
};

export default LogCard;