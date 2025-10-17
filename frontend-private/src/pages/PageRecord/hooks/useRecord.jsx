import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";

const fetcher = async (url, transform) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error fetching data");
    const data = await res.json();
    return transform ? transform(data) : data;
};

const useRecord = () => {
    const { API } = useAuth();
    const ApiProducts = `${API}/products`;

    //  Best Sellers
    const bestSellersQuery = useQuery({
        queryKey: ["bestSellers"],
        queryFn: () => fetcher(`${ApiProducts}/bestSellers`),
        onError: () => toast.error("Error al obtener los más vendidos"),
    });

    //  Worst Sellers
    const worstSellersQuery = useQuery({
        queryKey: ["worstSellers"],
        queryFn: () => fetcher(`${ApiProducts}/worstSellers`),
        onError: () => toast.error("Error al obtener los menos vendidos"),
    });

    // Materiales con costo
    const materialCostQuery = useQuery({
        queryKey: ["materialCost"],
        queryFn: () =>
            fetcher(`${API}/productionCostHistory`, (data) =>
                data.flatMap((d) =>
                    d.materials.map((m) => ({
                        product: d.product,
                        //Accede directamente a d.variantName
                        variantName: d.variantName,
                        material: m.material,
                        quantity: m.quantity,
                        cost: m.cost,
                    }))
                )
            ),
        onError: () => toast.error("Error al obtener costos de materiales"),
        refetchOnWindowFocus: false,

    });

    //  Ganancias y Ventas
    const profitAndSalesQuery = useQuery({
        queryKey: ["profitAndSales"],
        queryFn: () =>
            fetcher(`${API}/salesOrder/summary`, (stats) =>
                (stats.last6Months || []).map((item) => ({
                    name: item._id,
                    ingresos: Number(item.totalSales).toFixed(2),
                    ganancias: Number(item.totalProfit).toFixed(2),
                }))
            ),
        onError: () => toast.error("Error al obtener resumen de ventas"),
    });

    //  Balance de Materiales
    const materialsBalanceQuery = useQuery({
        queryKey: ["materialsBalance"],
        queryFn: () => fetcher(`${API}/materialBalance`),
        onError: () => toast.error("Error al cargar balance de materias"),
    });

    //  Materias primas
    const materialsQuery = useQuery({
        queryKey: ["materials"],
        queryFn: () => fetcher(`${API}/rawMaterials`),
        onError: () => toast.error("Error al cargar materias primas"),
    });

    //  Valor de inventario
    const inventoryValueQuery = useQuery({
        queryKey: ["inventoryValue"],
        queryFn: () =>
            fetcher(`${API}/rawMaterials/inventoryValue`, (data) => data.totalInventoryValue),
        onError: () => toast.error("Error al cargar valor del inventario"),
    });

    //  Producción de un producto (parametrizable con mutation/query)
    const productionQuery = useMutation({
        mutationFn: (productId) =>
            fetcher(`${API}/products/calculateProduction/${productId}`, (data) =>
                data.productionCapacity.reduce((acc, v) => acc + v.maxProduction, 0)
            ),
        onError: () => toast.error("Error al calcular producción"),
    });

    //  Historial de precio de producto
    const productPriceHistoryQuery = useMutation({
        mutationFn: (productId) =>
            fetcher(`${API}/productPriceHistory/${productId}`, (data) => {
                const variants = {};
                data.forEach((item) => {
                    const date = new Date(item.createdAt).toLocaleDateString();
                    if (!variants[item.variantName]) variants[item.variantName] = {};
                    variants[item.variantName][date] = item.unitPrice;
                });

                const formatted = Object.keys(
                    data.reduce((acc, item) => {
                        acc[new Date(item.createdAt).toLocaleDateString()] = true;
                        return acc;
                    }, {})
                ).map((date) => {
                    const row = { name: date };
                    for (const v of Object.keys(variants)) {
                        row[v] = variants[v][date] || null;
                    }
                    return row;
                });

                return formatted;
            }),
        onError: () => toast.error("Error al obtener historial de precios"),
    });

    return {
        // Queries
        bestSellers: bestSellersQuery.data,
        worstSellers: worstSellersQuery.data,
        materialCost: materialCostQuery.data,
        dataM: profitAndSalesQuery.data,
        materialsBalance: materialsBalanceQuery.data,
        materials: materialsQuery.data,
        inventoryValue: inventoryValueQuery.data,

        // Mutations
        getProducctionProducts: productionQuery.mutateAsync,
        production: productionQuery.data,

        getProductPriceHistorial: productPriceHistoryQuery.mutateAsync,
        priceHistorial: productPriceHistoryQuery.data,

        // Estados
        isLoading:
            bestSellersQuery.isLoading ||
            worstSellersQuery.isLoading ||
            materialCostQuery.isLoading ||
            profitAndSalesQuery.isLoading ||
            materialsBalanceQuery.isLoading ||
            materialsQuery.isLoading ||
            inventoryValueQuery.isLoading,
    };
};

export default useRecord;
