//Para traer categorias, colecciones y raw materials
import { useState, useEffect } from "react";
import { useAuth } from "../../../global/hooks/useAuth";
import { useTranslation } from "react-i18next"; // Soporte para múltiples idiomas



const useProductOptions = () => {

  const { API } = useAuth()

  const { t } = useTranslation("products"); // Traducciones del namespace "stock"


  const [opcionesCategorias, setOpcionesCategorias] = useState([]);
  const [opcionesColecciones, setOpcionesColecciones] = useState([]);
  const [opcionesMateria, setOpcionesMateria] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Categorías
        const resCategories = await fetch(
          API + "/productcategories"
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
          API + "/collections"
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
          API + "/rawMaterials"
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
    { _id: true, label: t("status.active") },
    { _id: false, label: t("status.inactive") },
  ];
  return {
    opcionesCategorias,
    opcionesColecciones,
    opcionesMateria,
    opcionesEstado

  };
};

export default useProductOptions;