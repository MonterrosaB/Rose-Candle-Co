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

import useFetchProduct from "./components/UseFetchProduct";
import useProductOptions from "./hooks/useProductOptions";

const PageProducts = () => {

  const [openDialogProduct, setOpenDialogProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products, getProducts } = useFetchProduct();

  const { opcionesCategorias, opcionesEstado, opcionesColecciones } = useProductOptions();




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
    useEffect(() => {
      getProducts();
    }, []);  // o cerrar modal, si usas uno
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
        <TitleH1 title="Productos" />
        <div className="flex justify-end gap-4 px-4">
          <Button
            buttonText={"Agregar Producto"}
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
            label="Disponibilidad"
          />

          <DropDownFilter
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            options={opcionesCategorias}
            label="Categoría"
          />

          <DropDownFilter
            value={filtroColeccion}
            onChange={(e) => setFiltroColeccion(e.target.value)}
            options={opcionesColecciones}
            label="Colección"
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
