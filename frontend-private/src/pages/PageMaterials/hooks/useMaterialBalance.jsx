import { useState } from "react";

export function useCreateMaterialBalance() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function createMaterialBalance(newMovement) {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/materialBalance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMovement),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Error al crear movimiento");

            return data;
        } catch (err) {
            setError(err.message || "Error desconocido");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { createMaterialBalance, loading, error };
}
