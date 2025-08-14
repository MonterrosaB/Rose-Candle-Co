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

    const eliminarInput = (grupo, id) => {
        setInputs((prev) => ({
            ...prev,
            [grupo]: prev[grupo].filter((item) => item.id !== id),
        }));
    };

    return { agregarInput, inputs, resetInputs, eliminarInput };
};

export default useInputGroups;
