import { useEffect, useState } from "react";
import { useAuth } from "../../../global/hooks/useAuth";

const useOptions = () => {

    const { API } = useAuth()


    const [optionProducts, setOptionProducts] = useState([]);

    const fetchProductsOptions = async () => {
        try {
            //  Componentes (Materia Prima)
            const data = await fetch(
                API + "/products"
            );
            if (!data.ok) throw new Error("Error al traer productos");
            const optionsProducts = await data.json();
            const mappedProducts = optionsProducts.map((item) => ({
                _id: item._id,
                label: item.name,
            }));
            setOptionProducts(mappedProducts);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    useEffect(() => {
        fetchProductsOptions();
    }, []);




    return {
        optionProducts
    };
};

export default useOptions;
