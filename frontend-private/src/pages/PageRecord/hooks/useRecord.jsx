import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";


const useRecord = () => {

    const { API } = useAuth();

    const ApiProducts = API + "/products";

    const [bestSellers, setBestSellers] = useState([]);
    const [worstSellers, setWorstSellers] = useState([]);
    const [materialCost, setMaterialCost] = useState([]);
    const [materialsBalance, setMaterialsBalance] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [inventoryValue, setInventoryValue] = useState([]);
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

    const getProductMaterialsCost = async () => {

        try {
            const response = await fetch(API + "/productionCostHistory")

            if (!response.ok) {
                throw new Error("Error fetching Products");
            }

            const data = await response.json();
            const rows = data.flatMap(d =>
                d.materials.map(m => ({
                    product: d.product,
                    variantName: d._id.variantName,
                    material: m.material,
                    quantity: m.quantity,
                    cost: m.cost
                }))
            );
            setMaterialCost(rows)
            console.log(rows);

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
            console.log(data);

        } catch (err) {
            toast.error("No se pudo cargar materias primas");
        } finally {
            setLoading(false);
        }
    };

    const getMaterialsValue = async () => {
        setLoading(true);
        try {
            const res = await fetch(API + "/rawMaterials/inventoryValue");
            if (!res.ok) throw new Error("No se pudo obtener el valor total de las materias primas");
            const data = await res.json();
            setInventoryValue(data.totalInventoryValue);

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
        getProductMaterialsCost();
        getMaterialsValue();
    }, []);

    return {
        bestSellers, worstSellers, dataM, materialsBalance, materials, materialCost, inventoryValue
    }
}
export default useRecord;