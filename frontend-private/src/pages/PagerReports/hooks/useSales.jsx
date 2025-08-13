import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useSales = () => {

    const API = "http://localhost:4000/api"

    const [orders, setOrders] = useState([]);
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);


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

    useEffect(() => {
        getTotalOrders();
        getAbandonetedCarts();
    }, []);

    return { loading, orders, carts }
}
export default useSales;