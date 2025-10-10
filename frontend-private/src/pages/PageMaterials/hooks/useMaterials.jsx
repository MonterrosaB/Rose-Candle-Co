// hooks/useMaterials.js
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";

import { useQuery } from "@tanstack/react-query";

const useMaterials = (methods) => {
  const { API } = useAuth();

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

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${API}/rawMaterialCategories`);
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

  const materialsQuery = useQuery({
    queryKey: ["materials"],
    queryFn: () => fetcher(API + "/rawMaterials"),
    onError: () => toast.error("Error al obtener materias primas"),
  });

  const materialsBalanceQuery = useQuery({
    queryKey: ["materialsBalance"],
    queryFn: () => fetcher(API + "/materialBalance"),
    onError: () => toast.error("Error al obtener el balance"),
  });

  const createMaterial = async (data) => {
    setLoading(true);
    try {
      const parsedData = {
        name: data.name?.trim(),
        unit: data.unit?.trim(),
        currentStock: Number(data.currentStock),
        minimunStock: Number(data.minimunStock),
        currentPrice:
          Number(data.currentStock) > 0
            ? Number(data.currentPrice / data.currentStock)
            : 0,
        idRawMaterialCategory: data.idRawMaterialCategory,
        idSupplier: data.idSupplier,
      };
      console.log(data);

      const res = await fetch(API + "/rawMaterials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Error al guardar");

      toast.success("Materia Prima Guardada");
    } catch (err) {
      toast.error(err.message || "Problemas al crear una nueva materia");
    } finally {
      setLoading(false);
    }
  };

  const updateMaterial = async (id, data) => {
    setLoading(true);
    try {
      const parsedData = {
        name: data.name?.trim(),
        unit: data.unit?.trim(),
        currentStock: Number(data.currentStock),
        currentPrice: Number(data.currentPrice),
        idRawMaterialCategory: data.idRawMaterialCategory,
        idSupplier: data.idSupplier,
      };
      const res = await fetch(API + `/rawMaterials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      if (!res.ok) throw new Error("Error al actualizar la materia prima");

      toast.success("Materia Prima actualizada");
    } catch (err) {
      toast.error("Error al actualizar la materia prima");
    } finally {
      setLoading(false);
    }
  };

  const deleteMaterial = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar la materia prima");

      toast.success("Materia Prima eliminada");
    } catch (err) {
      toast.error("Error al eliminar la materia prima");
    } finally {
      setLoading(false);
    }
  };

  return {
    materials: materialsQuery.data ?? [],
    materialsBalance: materialsBalanceQuery.data ?? [],
    categories: categoriesQuery.data ?? [],
    loading: materialsBalanceQuery.isLoading || materialsQuery.isLoading,
    createMaterial,
    register,
    handleSubmit,
    errors,
    reset,
    updateMaterial,
    deleteMaterial,
  };
};

export default useMaterials;
