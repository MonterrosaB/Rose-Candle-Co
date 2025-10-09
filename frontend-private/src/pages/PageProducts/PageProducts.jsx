import { useState } from "react";
import React, { useEffect } from "react";

import PrincipalDiv from "../../global/components/PrincipalDiv";
import TitleH1 from "../../global/components/TitleH1"
import DropDownFilter from "../../global/components/DropDownFilter";

import InputsInLine from "../../global/components/InputsInline"
import Dialog from "../../global/components/Dialog";
import RegisterProducts from "./components/RegisterProducts";
import Button from "../../global/components/Button";
import UseProductsList from "./components/UseProductList";

import useProducts from "./hooks/useProducts";
import useProductOptions from "./hooks/useProductOptions";

import { useTranslation } from "react-i18next"; // Soporte para múltiples idiomas


import { useForm } from "react-hook-form";

const PageProducts = () => {
  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = "Productos | Rosé Candle Co.";
  }, []);

  const { t, i18n } = useTranslation("products"); // Traducciones del namespace "stock"


  const [openDialogProduct, setOpenDialogProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const methods = useForm();


  const { opcionesCategorias, opcionesEstado, opcionesColecciones } = useProductOptions();
  const { products } = useProducts(methods);

  const handleAdd = () => {
    setSelectedProduct(null);
    setOpenDialogProduct(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenDialogProduct(true);
  };


  const handleCloseModal = () => {
    setSelectedProduct(null); // esto limpia defaultValues
    setOpenDialogProduct(false);
  };

  const [filtroCategoria, setFiltroCategoria] = useState(""); // estado del filtro
  const [filtroEstado, setFiltroEstado] = useState("true"); // estado del filtro
  const [filtroColeccion, setFiltroColeccion] = useState("");



  const productosFiltrados = products.filter((p) => {
    // filtro estado
    const matchEstado =
      filtroEstado === "" ? true : p.availability === (filtroEstado === "true");

    // filtro categoría (ejemplo: p.category === filtroCategoria)
    const matchCategoria =
      filtroCategoria === "" ? true : p.idProductCategory?._id === filtroCategoria;

    const matchColeccion =
      filtroColeccion === "" ? true : p.idCollection?._id === filtroColeccion;


    return matchEstado && matchCategoria && matchColeccion;
  });


  return (
    <>
      <PrincipalDiv>
        <TitleH1 title={t("title")} />
        <div className="flex justify-end gap-4 px-4">
          <Button
            buttonText={t("add_prodcut")}
            showIcon={true}
            type={"button"}
            onClick={handleAdd}
          />
        </div>
        <InputsInLine>
          <DropDownFilter
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            options={opcionesEstado}
            label={t("availability_selector")}
          />

          <DropDownFilter
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            options={opcionesCategorias}
            label={t("category_selector")}
          />

          <DropDownFilter
            value={filtroColeccion}
            onChange={(e) => setFiltroColeccion(e.target.value)}
            options={opcionesColecciones}
            label={t("collection_selector")}
          />
        </InputsInLine>


        <div className="flex items-center justify-center gap-4">
          <UseProductsList
            onEdit={handleEdit}
            products={productosFiltrados}
          />
        </div>

        {openDialogProduct && (
          <Dialog
            open={openDialogProduct}
            onClose={handleCloseModal}
          >
            <RegisterProducts
              onClose={handleCloseModal}
              selectedProduct={selectedProduct} />
          </Dialog>
        )}
      </PrincipalDiv>
    </>
  );
};
export default PageProducts;
