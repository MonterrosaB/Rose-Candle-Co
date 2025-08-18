import { useState, useEffect } from "react";
import toast from "react-hot-toast";



const useRecord = () => {

    const ApiProducts = "https://rose-candle-co.onrender.com/api/products";
    const API = "https://rose-candle-co.onrender.com/api";

    //https://rose-candle-co.onrender.com/api/materialBalance

    const [bestSellers, setBestSellers] = useState([]);
    const [worstSellers, setWorstSellers] = useState([]);
    const [materialsBalance, setMaterialsBalance] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [dataM, setDataM] = useState([]);
    const [loading, setLoading] = useState(true);



    const getBestSellers = async () => {

        try {
            const response = await fetch(ApiProducts + "/bestSellers")

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
            const response = await fetch(ApiProducts + "/worstSellers")

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

    const getProfitAndSales = async () => {
        try {
            setLoading(true);
            const response = await fetch(API + "/salesOrder/summary");
            if (!response.ok) throw new Error("Error al obtener los datos");
            const stats = await response.json();

            // Ganancias mensuales
            const chartData = (stats.last6Months || []).map((item) => ({
                name: item._id,
                ingresos: Number(item.totalSales).toFixed(2),
                ganancias: Number(item.totalProfit).toFixed(2),
            }));

            console.log(chartData);


            setDataM(chartData);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getMaterialsBalance = async () => {
        setLoading(true);
        try {
            const res = await fetch(API + "/materialBalance");
            if (!res.ok) throw new Error("No se pudo obtener el balance de materias primas");
            const data = await res.json();
            console.log(data);

            setMaterialsBalance(data);
        } catch (err) {
            toast.error("No se pudo cargar el balance");
        } finally {
            setLoading(false);
        }
    };

    const getMaterials = async () => {
        setLoading(true);
        try {
            const res = await fetch(API + "/rawMaterials");
            if (!res.ok) throw new Error("No se pudo obtener materias primas");
            const data = await res.json();
            setMaterials(data);
        } catch (err) {
            toast.error("No se pudo cargar materias primas");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getBestSellers();
        getWorstSellers();
        getProfitAndSales();
        getMaterialsBalance();
        getMaterials();
    }, []);

    return {
        bestSellers, worstSellers, dataM, materialsBalance, materials
    }
}
export default useRecord;