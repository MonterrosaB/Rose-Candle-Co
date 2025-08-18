import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useSales = () => {

    const API = "https://rose-candle-co.onrender.com/api"

    const [orders, setOrders] = useState([]);
    const [carts, setCarts] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [worstSellers, setWorstSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data6M, setData6M] = useState([]);
    const [dataD, setDataD] = useState([]);
    const [dataM, setDataM] = useState([]);
    const [productProfit, setProductProfit] = useState([]);
    const [soldByCategory, setSoldByCategory] = useState([]);
    const [error, setError] = useState(null);

    //https://rose-candle-co.onrender.com/api/


    const getTotalOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch(API + "/salesOrder/count");
            if (!res.ok) throw new Error("No se pudo obtener materias primas");
            const data = await res.json();
            setOrders(data);

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getAbandonetedCarts = async () => {
        setLoading(true);
        try {
            const res = await fetch(API + "/cart/count");
            if (!res.ok) throw new Error("No se pudo obtener materias primas");
            const data = await res.json();
            setCarts(data);

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getProfitAndSales = async () => {
        try {
            setLoading(true);
            const response = await fetch(API + "/salesOrder/summary");
            if (!response.ok) throw new Error("Error al obtener los datos");
            const stats = await response.json();

            // Preparar datos para el gráfico (últimos 6 meses)
            const chartData = (stats.last6Months || []).map((item) => ({
                name: item._id,
                ingresos: Number(item.totalSales).toFixed(2),
                ganancias: Number(item.totalProfit).toFixed(2),
            }));

            // Ganancias diarias
            const profitD = (stats.daily || []).map((item) => ({
                ganancias: Number(item.totalProfit).toFixed(2),
            }));

            // Ganancias mensuales
            const profitM = (stats.monthly || []).map((item) => ({
                ganancias: Number(item.totalProfit).toFixed(2),
                ingresos: Number(item.totalSales).toFixed(2),
            }));

            setDataD(profitD[0]);
            setDataM(profitM[0]);
            setData6M(chartData);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    const getProductsCostAndProfit = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API}/productionCostHistory/profitSummary`);
            if (!response.ok) throw new Error("Error al obtener los datos");
            const result = await response.json();
            setProductProfit(result);
        } catch (err) {
            console.error(err);
            setError(err.message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    const getSelledByCategory = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API}/products/salesByCategory`);
            if (!response.ok) throw new Error("Error al obtener los datos");
            const result = await response.json();
            setSoldByCategory(result);
        } catch (err) {
            console.error(err);
            setError(err.message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    const getBestSellers = async () => {

        try {
            const response = await fetch(API + "/products/bestSellers")

            if (!response.ok) {
                throw new Error("Error fetching Products");
            }

            const data = await response.json();
            setBestSellers(data)
        } catch (error) {
            console.error("Error fetching Products", error);
            toast.error("Error fetching Products");
        }
    }

    const getWorstSellers = async () => {

        try {
            const response = await fetch(API + "/products/worstSellers")

            if (!response.ok) {
                throw new Error("Error fetching Products");
            }

            const data = await response.json();
            setWorstSellers(data)
        } catch (error) {
            console.error("Error fetching Products", error);
            toast.error("Error fetching Products");
        }
    }



    useEffect(() => {
        getTotalOrders();
        getAbandonetedCarts();
        getProfitAndSales();
        getProductsCostAndProfit();
        getBestSellers();
        getWorstSellers();
        getSelledByCategory();
    }, []);

    return { loading, orders, carts, data6M, dataD, dataM, productProfit, worstSellers, bestSellers, soldByCategory }
}
export default useSales;