// hooks/useMaterials.js
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useMaterials = (methods) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const API = "https://rose-candle-co.onrender.com/api"

  const [materials, setMaterials] = useState([]);
  const [materialsBalance, setMaterialsBalance] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener todas las categorías de materias primas
  const getCategories = async () => {
    setLoading(true)
    try {
      const res = await fetch(API + "/rawMaterialCategories");
      if (!res.ok) throw new Error("Error al obtener categorías");

      const data = await res.json();

      const formatted = data.map(cat => ({
        _id: cat._id,
        label: cat.name
      }));

      setCategories(formatted);

    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar categorías");
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
      setMaterials(data);
    } catch (err) {
      toast.error("No se pudo cargar materias primas");
    } finally {
      setLoading(false);
    }
  };

  const getMaterialsBalance = async () => {
    setLoading(true);
    try {
      const res = await fetch(API + "/materialBalance");
      if (!res.ok) throw new Error("No se pudo obtener el balance de materias primas");
      const data = await res.json();
      setMaterialsBalance(data);
    } catch (err) {
      toast.error("No se pudo cargar el balance");
    } finally {
      setLoading(false);
    }
  };

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

      console.log("Enviando:", parsedData);

      const res = await fetch(API + "/rawMaterials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Error al guardar");

      toast.success("Materia Prima Guardada");
      getMaterials();
    } catch (err) {
      toast.error(err.message || "Problemas al crear una nueva materia");
    } finally {
      setLoading(false);
    }
  };


  const updateMaterial = async (id, data) => {
    setLoading(true)
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
      getMaterials();
    } catch (err) {
      toast.error("Error al actualizar la materia prima");
    } finally {
      setLoading(false)
    }
  };

  const deleteMaterial = async (id) => {
    setLoading(true)
    try {
      const res = await fetch(`${ApiURL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar la materia prima");

      toast.success("Materia Prima eliminada");
      getMaterials();
    } catch (err) {
      toast.error("Error al eliminar la materia prima");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getMaterials();
    getMaterialsBalance();
    getCategories();
  }, []);

  return {
    materials, materialsBalance, categories, loading, createMaterial, register, handleSubmit, errors, reset, updateMaterial, deleteMaterial
  };
};

export default useMaterials;
