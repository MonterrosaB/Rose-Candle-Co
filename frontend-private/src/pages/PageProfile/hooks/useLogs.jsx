import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../global/hooks/useAuth";



const useLogs = () => {

    const { API } = useAuth();


    const fetcher = async () => {
        const apiUrl = `${API}/logs`; // Asumimos un endpoint para filtrar por user ID

        const res = await fetch(apiUrl);
        return res.json();
    };

    const logsQuery = useQuery({
        queryKey: ["logs"],
        queryFn: fetcher,
        // Manejo de errores
        onError: (error) => {
            console.error("Error fetching logs:", error);
            toast.error(`Error al obtener la bitácora`);
        },
        staleTime: 5 * 60 * 1000, // 5 minutos
    });

    return {
        logs: logsQuery.data,
        isLoading: logsQuery.isLoading,
        isError: logsQuery.isError,
        error: logsQuery.error,
        refetch: logsQuery.refetch,
    }
}
export default useLogs;