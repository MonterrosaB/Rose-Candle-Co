import { useState } from "react";

import PrincipalDiv from "../../global/components/PrincipalDiv"
import CardProduct from "./components/CardProduct";

import Dialog from "../../global/components/Dialog";
import RegisterProducts from "./components/RegisterProducts";
import Button from "../../global/components/Button";

import Calmness from "../../assets/calmness.jpg";


const PageProducts = () => {

    const [openDialogProduct, setOpenDialogProduct] = useState(false)

    return (
        <>
            <PrincipalDiv>
                <div className="flex justify-end gap-4 px-4">
                    <Button
                        buttonText={"Agregar Producto"}
                        showIcon={true}
                        type={"button"}
                        onClick={() => setOpenDialogProduct(true)}
                    />
                </div>
                <div className="flex items-center justify-center gap-4">
                    <CardProduct
                        image={Calmness}
                        name="Calmness"
                        price="$8.00 - $15.00"
                        cost="$4.50 - $7.00"
                        size="4oz - 8oz"
                        category="Vela | Classic"
                        lastUpdated="03/05/25"
                        activo={true} // 👉 verde
                    />

                    <CardProduct
                        image={Calmness}
                        name="Relax"
                        price="$6.00 - $12.00"
                        cost="$3.00 - $6.00"
                        size="2oz - 6oz"
                        category="Vela | Minimal"
                        lastUpdated="01/04/25"
                        activo={false} // 👉 gris
                    />
                </div>

                {openDialogProduct && (<Dialog
                    open={openDialogProduct}
                    onClose={() => setOpenDialogProduct(false)}

                >
                    <RegisterProducts
                        onClose={() => setOpenDialogProduct(false)}
                    />
                </Dialog>)}
            </PrincipalDiv>
        </>
    )
}
export default PageProducts;