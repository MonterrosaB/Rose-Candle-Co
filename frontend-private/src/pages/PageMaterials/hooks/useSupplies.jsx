// hooks/useMaterials.js
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";

import { useQuery, useQueryClient } from "@tanstack/react-query";

const useSupplies = (methods) => {
    const { API } = useAuth();

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = methods;

    const [loading, setLoading] = useState(true);

    const fetcher = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error en la petición");
        return res.json();
    };

    const materialsBalanceQuery = useQuery({
        queryKey: ["materialsBalance"],
        queryFn: () => fetcher(APIURL + "/materialBalance"),
        onError: () => toast.error("Error al obtener el balance")
    });

    const materialsQuery = useQuery({
        queryKey: ["materials"],
        queryFn: async () => {
            const res = await fetch(`${API}/rawMaterials`);
            if (!res.ok) throw new Error("No se pudo obtener materias primas");

            const data = await res.json();
            // Formatear para el dropdown
            return data.map((cat) => ({
                _id: cat._id,
                label: cat.name,
            }));
        },
        onError: (error) => {
            console.error("Error al cargar categorías:", error);
            toast.error("Error al obtener materias primas");
        },
    });

    const createMaterial = async (data) => {
        setLoading(true);
        try {
            // Convertimos a número antes de enviar
            const parsedData = {
                ...data,
                idMaterial: data.idMaterial,
                movement: "entrada",
                amount: Number(data.amount),
                unitPrice:
                    Number(data.amount) > 0
                        ? (Number(data.unitPrice) / Number(data.amount)).toFixed(2)
                        : "0.00",
                date: new Date().toISOString(),
                reference: "Ingreso de suministros",
            };

            const res = await fetch(API + "/materialBalance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsedData),
            });

            if (!res.ok) throw new Error("Error al guardar");
            toast.success("Materia Prima Guardada");
            queryClient.invalidateQueries(["materialsBalance"]);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateMaterial = async (id, data) => {
        try {
            const parsedData = {
                ...data,
                currentStock: Number(data.currentStock),
                currentPrice: Number(data.currentPrice),
            };

            const res = await fetch(API + `/materialBalance/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsedData),
            });

            if (!res.ok) throw new Error("Error al actualizar la materia prima");

            toast.success("Materia Prima actualizada");
            getMaterials();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const deleteMaterial = async (id) => {
        try {
            const res = await fetch(API + `/materialBalance/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Error al eliminar la materia prima");

            toast.success("Materia Prima eliminada");
            getMaterials();
        } catch (err) {
            toast.error(err.message);
        }
    };

    return {
        materialsBalance: materialsBalanceQuery.data ?? [],
        materials: materialsQuery.data ?? [],
        loading: materialsQuery.isLoading || materialsQuery.isLoading,
        createMaterial,
        register,
        handleSubmit,
        errors,
        reset,
        updateMaterial,
        deleteMaterial,
    };
};

export default useSupplies;
