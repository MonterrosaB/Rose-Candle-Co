import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";

const useHome = () => {
  const { API } = useAuth();

  // API Endpoints
  const ApiCustomers = `${API}/customers/count`;
  const ApiCustomersByMonth = `${API}/customers/countByMonth`;
  const ApiOrders = `${API}/salesOrder/countTotal`;
  const ApiEarnings = `${API}/salesOrder/totalEarnings`;
  const ApiLowStock = `${API}/rawMaterials/lowStock`;
  const ApiBestSellingProducts = `${API}/cart/bestSellingProducts`;
  const ApiLatestOrders = `${API}/salesOrder/latestOrders`;

  // Custom fetcher function for React Query
  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error fetching ${url}`);
    }
    return res.json();
  };

  // Fetching data with React Query (automatically handles caching, refetching, etc.)
  const { data: customerCountData, error: customerCountError, isLoading: isCustomerCountLoading } = useQuery({
    queryKey: ['customerCount'],
    queryFn: () => fetcher(ApiCustomers),
    onError: () => toast.error("No se pudo cargar la cantidad de clientes"),
    select: (data) => data.count || 0, // Select just the count from the response
  });

  const { data: latestCustomerCountData, error: latestCustomerCountError, isLoading: isLatestCustomerCountLoading } = useQuery({
    queryKey: ['latestCustomerCount'],
    queryFn: () => fetcher(ApiCustomersByMonth),
    onError: () => toast.error("No se pudo cargar la cantidad de clientes del último mes"),
    select: (data) => data.count || 0, // Select just the count from the response
  });

  const { data: ordersData, error: ordersError, isLoading: isOrdersLoading } = useQuery({
    queryKey: ['ordersCount'],
    queryFn: () => fetcher(ApiOrders),
    onError: () => toast.error("No se pudo cargar la cantidad de pedidos"),
  });

  const { data: earningsData, error: earningsError, isLoading: isEarningsLoading } = useQuery({
    queryKey: ['earnings'],
    queryFn: () => fetcher(ApiEarnings),
    onError: () => toast.error("No se pudo cargar los ingresos"),
  });

  const { data: lowStockData, error: lowStockError, isLoading: isLowStockLoading } = useQuery({
    queryKey: ['lowStockMaterials'],
    queryFn: () => fetcher(ApiLowStock),
    onError: () => toast.error("No se pudo cargar los materiales con bajo stock"),
  });

  const { data: bestSellingProductsData, error: bestSellingProductsError, isLoading: isBestSellingProductsLoading } = useQuery({
    queryKey: ['bestSellingProducts'],
    queryFn: () => fetcher(ApiBestSellingProducts),
    onError: () => toast.error("No se pudo cargar los productos más vendidos"),
  });

  const { data: latestOrdersData, error: latestOrdersError, isLoading: isLatestOrdersLoading } = useQuery({
    queryKey: ['latestOrders'],
    queryFn: () => fetcher(ApiLatestOrders),
    onError: () => toast.error("No se pudo cargar los últimos pedidos"),
  });

  return {
    // Clientes
    customerCount: customerCountData,
    latestCustomerCount: latestCustomerCountData,

    // Pedidos
    totalOrders: ordersData?.totalOrders || 0,
    currentMonthOrders: ordersData?.currentMonthOrders || 0,

    // Ingresos
    totalEarnings: earningsData?.totalEarnings || 0,
    monthlyEarnings: earningsData?.monthlyEarnings || 0,

    // Materias primas
    lowStockMaterials: lowStockData || [],

    // Productos más vendidos
    bestSellingProducts: bestSellingProductsData || [],

    // Últimos pedidos
    latestOrders: latestOrdersData || [],

    // Loading states
    isCustomerCountLoading,
    isLatestCustomerCountLoading,
    isOrdersLoading,
    isEarningsLoading,
    isLowStockLoading,
    isBestSellingProductsLoading,
    isLatestOrdersLoading,

    // Error states
    customerCountError,
    latestCustomerCountError,
    ordersError,
    earningsError,
    lowStockError,
    bestSellingProductsError,
    latestOrdersError,
  };
};

export default useHome;
