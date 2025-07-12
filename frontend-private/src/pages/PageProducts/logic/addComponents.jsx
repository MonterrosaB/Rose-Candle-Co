import { useState } from "react";

const useInputGroups = () => {
    const [inputs, setInputs] = useState({
        variantes: [],
        componentes: [],
    });

    // Permite agregar inputs vacíos o con datos iniciales
    const agregarInput = (grupo, valoresIniciales = []) => {
        const nuevosInputs = valoresIniciales.length
            ? valoresIniciales.map((item) => ({
                id: Date.now() + Math.random(),
                ...item,
            }))
            : [{ id: Date.now() + Math.random() }];

        setInputs((prev) => ({
            ...prev,
            [grupo]: [...prev[grupo], ...nuevosInputs],
        }));
    };

    // Para resetear completamente (por ejemplo, cuando cambias de producto)
    const resetInputs = () => {
        setInputs({ variantes: [], componentes: [] });
    };

    return { agregarInput, inputs, resetInputs };
};

export default useInputGroups;
