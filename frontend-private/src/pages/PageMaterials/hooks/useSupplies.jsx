// hooks/useMaterials.js
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useSupplies = (methods) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = methods;

    const [materialsBalance, setMaterialsBalanceBalance] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    const API = "https://rose-candle-co.onrender.com/api";

    const getMaterialsBalance = async () => {
        setLoading(true);
        try {
            const res = await fetch(API + "/materialBalance");
            if (!res.ok) throw new Error("No se pudo obtener materias primas");
            const data = await res.json();
            setMaterialsBalanceBalance(data);
        } catch (err) {
            toast.error(err.message);
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
            // Formatea para el dropdown
            const formatted = data.map(cat => ({
                _id: cat._id,
                label: cat.name
            }));
            setMaterials(formatted);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    const createMaterial = async (data) => {
        setLoading(true)
        try {
            // Convertimos a número antes de enviar
            const parsedData = {
                ...data,
                idMaterial: data.idMaterial,
                movement: "entrada",
                amount: Number(data.amount),
                unitPrice: Number(data.amount) > 0
                    ? (Number(data.unitPrice) / Number(data.amount)).toFixed(2)
                    : "0.00",
                date: new Date().toISOString()
            };

            const res = await fetch(API + "/materialBalance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsedData),
            });

            if (!res.ok) throw new Error("Error al guardar");
            toast.success("Materia Prima Guardada");
            getMaterials();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false)
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

    useEffect(() => {
        getMaterialsBalance();
        getMaterials();
    }, []);

    return {
        materialsBalance, materials, loading, createMaterial, register, handleSubmit, errors, reset, updateMaterial, deleteMaterial
    };
};

export default useSupplies;
