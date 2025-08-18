import { useState, useEffect } from "react";
import toast from "react-hot-toast";



const useRecord = () => {

    const ApiProducts = "http://localhost:4000/api/products";

    const [bestSellers, setBestSellers] = useState([]);
    const [worstSellers, setWorstSellers] = useState([]);

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

    useEffect(() => {
        getBestSellers();
        getWorstSellers();
    }, []);



    return {
        bestSellers, worstSellers
    }
}
export default useRecord;