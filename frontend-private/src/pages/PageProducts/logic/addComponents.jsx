import { useState } from "react";

const useInputGroups = () => {
    const [inputs, setInputs] = useState({
        variantes: [],
        componentes: [],
    });

    const agregarInput = (grupo) => {
        setInputs((prev) => ({
            ...prev,
            [grupo]: [
                ...prev[grupo],
                { id: Date.now() + Math.random() }, // solo necesitas el id para el key
            ],
        }));
    };

    return { agregarInput, inputs };
};

export default useInputGroups;
