import { useState } from "react";

const useInputGroups = () => {
    const [inputs, setInputs] = useState({ variant: [] });

    // Agregar una nueva variante
    const agregarVariante = (valoresIniciales = {}) => {
        const nuevaVariante = {
            id: crypto.randomUUID(), // ID único
            variant: "",
            variantPrice: "",
            components: [], // inicializa siempre
            ...valoresIniciales,
        };

        setInputs((prev) => ({
            ...prev,
            variant: [...prev.variant, nuevaVariante], // 👈 consistente
        }));
    };

    // Agregar un componente a una variante específica
    const agregarComponente = (varianteIndex, valoresIniciales = {}) => {
        const nuevoComponente = {
            id: crypto.randomUUID(),
            idComponent: "",
            amount: "",
            ...valoresIniciales,
        };

        setInputs((prev) => {
            const variants = [...prev.variant];
            const variant = variants[varianteIndex];

            // fallback: si no existen components, inicialízalos
            const components = variant.components || [];

            variants[varianteIndex] = {
                ...variant,
                components: [...components, nuevoComponente], // inmutable
            };

            return { ...prev, variant: variants };
        });
    };

    // Eliminar variante y sus componentes
    const eliminarVariante = (varianteId) => {
        setInputs((prev) => ({
            ...prev,
            variant: prev.variant.filter((v) => v.id !== varianteId),
        }));
    };

    // Eliminar componente de una variante
    const eliminarComponente = (varianteIndex, componenteId) => {
        setInputs((prev) => {
            const variants = [...prev.variant];
            const variant = variants[varianteIndex];

            variants[varianteIndex] = {
                ...variant,
                components: variant.components.filter((c) => c.id !== componenteId),
            };

            return { ...prev, variant: variants };
        });
    };

    // Resetear todo
    const resetInputs = () => setInputs({ variant: [] });

    return {
        inputs,
        agregarVariante,
        agregarComponente,
        eliminarVariante,
        eliminarComponente,
        resetInputs,
        setInputs
    };
};

export default useInputGroups;
