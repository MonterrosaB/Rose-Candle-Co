import { useState } from "react";

import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";

import Dialog from "../../global/components/Dialog";
import RegisterMaterial from "./components/RegisterMaterial";
import RegisterSupplies from "./components/RegisterSupplies";

const Materials = () => {

    //variables para abrir los formularios en un dialog
    const [openDialogMaterial, setOpenDialogMaterial] = useState(false)
    const [openDialogSupplies, setOpenDialogSupplies] = useState(false)
    const [registroActual, setRegistroActual] = useState(null);


    const handleUpdateRow = (row) => {
        setRegistroActual(row); // Guarda el registro completo
        setOpenDialogMaterial(true); // Abre el modal
    };


    //Columnas de la tabla
    //Primer valor es el que aparecerá como el nombre de la columna.
    //El segundo valor es el nombre del campo en el get o la base de datos.
    const columns = {
        "Nombre": "name",
        "Stock": "currentStock",
        "unidad": "unit",
        "Precio": "currentPrice",
        "Categoria": "idRawMaterialCategory",
        "Proveedor": "idSupplier",
    };

    //Registros de las tablas
    //En este caso seria la variable materials o como se nombre.
    //Descomenntar loading
    const rows = [
        {
            _id: "680beb71c5bd435e56b60ecb",
            currentStock: 100,
            currentPrice: 15.5,
            idRawMaterialCategory: "680bc45b248b6ebb26f03bb6",
            idSupplier: "680bbd2478ebb1ec93049f90",
            name: "Cera de soja",
            unit: "g"
        },
        {
            _id: "680beb71c5bd435e56b60ecc",
            currentStock: 250,
            currentPrice: 9.75,
            idRawMaterialCategory: "680bc45b248b6ebb26f03bb6",
            idSupplier: "680bbd2478ebb1ec93049f91",
            name: "Esencia de lavanda",
            unit: "ml"
        }
    ];

    return (
        <>
            <PrincipalDiv>
                <DataGrid
                    title={"Materia"}
                    columns={columns}
                    rows={rows}
                    //loading={loading}
                    primaryBtnText={"Add New Material"}
                    onClickPrimaryBtn={() => setOpenDialogMaterial(true)}
                    onClickSecondaryBtn={() => setOpenDialogSupplies(true)}
                    secondaryBtnText={"Add Supplies"}
                    updateRow={handleUpdateRow} // ESTA ES LA CLAVE
                />
                {openDialogMaterial && (<Dialog
                    open={openDialogMaterial}
                    onClose={() => setOpenDialogMaterial(false)}

                >
                    <RegisterMaterial
                        onClose={() => setOpenDialogMaterial(false)}
                    />
                </Dialog>)}

                {openDialogSupplies && (<Dialog
                    open={openDialogSupplies}
                    onClose={() => setOpenDialogSupplies(false)}

                >
                    <RegisterSupplies
                        onClose={() => setOpenDialogSupplies(false)}
                    />
                </Dialog>)}

            </PrincipalDiv>
        </>
    )
}
export default Materials;