//Para traer categorias, colecciones y raw materials
import { useState, useEffect } from "react";

const useProductOptions = () => {
  const [opcionesCategorias, setOpcionesCategorias] = useState([]);
  const [opcionesColecciones, setOpcionesColecciones] = useState([]);
  const [opcionesMateria, setOpcionesMateria] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Categorías
        const resCategories = await fetch(
          "http://localhost:4000/api/productcategories"
        );
        if (!resCategories.ok) throw new Error("Error al traer categorías");
        const categories = await resCategories.json();
        const mappedCategories = categories.map((item) => ({
          _id: item._id,
          label: item.name,
        }));
        setOpcionesCategorias(mappedCategories);

        //  Colecciones
        const resCollections = await fetch(
          "http://localhost:4000/api/collections"
        );
        if (!resCollections.ok) throw new Error("Error al traer colecciones");
        const collections = await resCollections.json();
        const mappedCollections = collections.map((item) => ({
          _id: item._id,
          label: item.name || item.collection,
        }));
        setOpcionesColecciones(mappedCollections);

        //  Componentes (Materia Prima)
        const resMaterials = await fetch(
          "http://localhost:4000/api/rawMaterials"
        );
        if (!resMaterials.ok) throw new Error("Error al traer materiales");
        const materials = await resMaterials.json();
        const mappedMaterials = materials.map((item) => ({
          _id: item._id,
          label: item.name,
        }));
        setOpcionesMateria(mappedMaterials);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchOptions();
  }, []);


  const opcionesEstado = [
    { _id: true, label: "Activo" },
    { _id: false, label: "Inactivo" },
  ];
  return {
    opcionesCategorias,
    opcionesColecciones,
    opcionesMateria,
    opcionesEstado

  };
};

export default useProductOptions;