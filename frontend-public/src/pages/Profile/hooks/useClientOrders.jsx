import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../../global/hooks/useAuth";

const useClientOrders = () => {
    const { user, API } = useAuth();

    const APIURL = API + `/salesOrder/user/${user?.id}`


    const fetcher = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error en la petición");
        return res.json();
    };

    const ordersClientQuery = useQuery({
        queryKey: ["ordersClient"],
        queryFn: () => fetcher(APIURL),
        onError: () => toast.error("Error al obtener los pedidos"),
        enabled: !!user, // solo corre si user existe
    });

    return {
        ordersClient: ordersClientQuery.data ?? [], //  aseguramos array
        isLoading: ordersClientQuery.isLoading
    };
};

export default useClientOrders;
