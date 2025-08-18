import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ApiSuppliers = "https://rose-candle-co.onrender.com/api/suppliers";

const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  const getSuppliers = async () => {
    try {
      const res = await fetch(ApiSuppliers);
      if (!res.ok) throw new Error("Error al obtener proveedores");
      const data = await res.json();

      const formatted = data.map((s) => ({
        _id: s._id,
        name: s.name,
        contact: s.contact,
        label: s.name,
      }));

      setSuppliers(formatted);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar proveedores");
    }
  };

  const createSupplier = async (newSupplier) => {
    try {
      const res = await fetch(ApiSuppliers, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSupplier),
      });

      const data = await res.json();
      console.log("Respuesta backend:", data);

      if (!res.ok) throw new Error(data.message || "Error al crear proveedor");

      toast.success("Proveedor agregado");
      getSuppliers();
    } catch (error) {
      console.error("Error en createSupplier:", error.message);
      toast.error(error.message || "No se pudo agregar proveedor");
    }
  };

  const updateSupplier = async (id, updatedSupplier) => {
    try {
      const res = await fetch(`${ApiSuppliers}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSupplier),
      });
      if (!res.ok) throw new Error("Error al actualizar proveedor");
      toast.success("Proveedor actualizado");
      getSuppliers();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar proveedor");
    }
  };

  const deleteSupplier = async (id) => {
    try {
      const res = await fetch(`${ApiSuppliers}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar proveedor");
      toast.success("Proveedor eliminado");
      getSuppliers();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar proveedor");
    }
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return {
    suppliers,
    getSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  };
};

export default useSuppliers;
