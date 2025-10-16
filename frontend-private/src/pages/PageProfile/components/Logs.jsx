import React, { useState, useMemo } from 'react'; // <-- Importamos useState y useMemo
import { useTranslation } from "react-i18next";
import useLogs from "../hooks/useLogs";
import LogCard from "./LogCard";
import SearchBar from "../components/SearchBar"; // <-- Importamos SearchBar
// Nota: Necesitarás el ID del usuario. Asumiremos que el hook lo obtiene de un AuthContext 
// o que se pasa como prop. Por ahora, asumiremos que useLogs puede funcionar sin un argumento 
// o lo obtiene internamente, pero es crucial pasarlo si tu hook lo requiere (como en la versión anterior).

const Logs = ({ userId }) => { // <-- Asumiendo que recibimos el userId como prop (opcional)
    const { t } = useTranslation("profile");

    // 1. Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    // Handler que actualiza el estado de búsqueda
    const handleSearch = (query) => {
        setSearchTerm(query.toLowerCase());
    };

    // 2. Obtener TODOS los logs (solo una vez)
    // Pasamos userId si el hook lo requiere para filtrar por usuario
    const { logs, isError: logsError, isLoading } = useLogs(userId);

    // 3. Lógica de Filtrado Local con useMemo
    const filteredLogs = useMemo(() => {
        if (!logs) return [];
        if (!searchTerm) return logs; // No filtrar si no hay término

        return logs.filter(log => {
            // Criterios de búsqueda

            // 1. Buscar en Acción (traducida o literal)
            const actionMatch = (t(log.action.toLowerCase()) || log.action).toLowerCase().includes(searchTerm);

            // 2. Buscar en Descripción
            const descriptionMatch = (log.description || "").toLowerCase().includes(searchTerm);

            // 3. Buscar en la Colección afectada
            const collectionMatch = (log.collectionAffected || "").toLowerCase().includes(searchTerm);

            // 4. Buscar por nombre de usuario (asumiendo que log.user está populado)
            const userName = log.user ? `${log.user.name} ${log.user.surnames}`.toLowerCase() : "";
            const userMatch = userName.includes(searchTerm);

            return actionMatch || descriptionMatch || collectionMatch || userMatch;
        });
    }, [logs, searchTerm, t]);

    // Renderizado del componente
    return (
        <div className="space-y-6">
            <hr className="my-6 border-gray-200" />

            {/* Cabecera y SearchBar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">{t("audit_trail")}</h2>

                <SearchBar
                    placeholder={t("search_logs_placeholder")}
                    onSearchChange={handleSearch}
                    className="w-full lg:w-1/2"
                />
            </div>

            {/* Manejo de estados de carga y error */}
            {isLoading && <p className="text-gray-500">{t("loading_logs")}</p>}

            {logsError && (
                <p className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                    {t("error_fetching_logs")}
                </p>
            )}

            {/* Mostrar Logs Filtrados */}
            {!isLoading && !logsError && filteredLogs.length > 0 ? (
                <div className="space-y-4">
                    {filteredLogs.map((log) => (
                        <LogCard
                            key={log._id}
                            log={log}
                            t={t}
                        />
                    ))}
                </div>
            ) : (
                // Mensaje de no resultados o no logs
                <p className="text-gray-500 p-4 border rounded-lg bg-white shadow-sm">
                    {searchTerm
                        ? t("no_search_results")
                        : t("no_logs")
                    }
                </p>
            )}
        </div>
    )
}

export default Logs;