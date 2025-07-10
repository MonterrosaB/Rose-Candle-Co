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

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const ApiURL = "http://localhost:4000/api/rawMaterials";

  const getMaterials = async () => {
    setLoading(true);
    try {
      const res = await fetch(ApiURL);
      if (!res.ok) throw new Error("No se pudo obtener materias primas");
      const data = await res.json();
      setMaterials(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createMaterial = async (data) => {
    try {
      const res = await fetch(ApiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al guardar");
      toast.success("Materia Prima Guardada");
      getMaterials();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getMaterials();
  }, []);

  return {
    materials, loading, createMaterial, register, handleSubmit, errors, reset
  };
};

export default useMaterials;
