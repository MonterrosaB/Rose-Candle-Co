import { useState } from "react";
import React, { useEffect } from "react";

import PrincipalDiv from "../../global/components/PrincipalDiv";

import Dialog from "../../global/components/Dialog";
import RegisterProducts from "./components/RegisterProducts";
import Button from "../../global/components/Button";
import UseProductsList from "./components/UseProductList";

const PageProducts = () => {

  const [openDialogProduct, setOpenDialogProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAdd = () => {
    setSelectedProduct(null);
    setOpenDialogProduct(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenDialogProduct(true);
  };

  return (
    <>
      <PrincipalDiv>
        <div className="flex justify-end gap-4 px-4">
          <Button
            buttonText={"Agregar Producto"}
            showIcon={true}
            type={"button"}
            onClick={handleAdd}
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <UseProductsList
            onEdit={handleEdit}
          />
        </div>

        {openDialogProduct && (
          <Dialog
            open={openDialogProduct}
            onClose={() => setOpenDialogProduct(false)}
          >
            <RegisterProducts
              onClose={() => setOpenDialogProduct(false)}
              selectedProduct={selectedProduct} />
          </Dialog>
        )}
      </PrincipalDiv>
    </>
  );
};
export default PageProducts;
