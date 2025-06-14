import { useState } from "react";
import PrincipalDiv from "../../global/components/PrincipalDiv"
import DataGrid from "../../global/components/DataGrid";
import Dialog from "../../global/components/Dialog";
import RegisterSuppliers from "./components/RegisterSuppliers"
const PageSupplies = () => {

    const [openDialogSuppliers, setOpenDialogSuppliers] = useState(false)
    const [selectedSupplier, setSelectedSupplier] = useState(null);


    const handleAdd = () => {
        setSelectedSupplier(null); // Form vacío
        setOpenDialogSuppliers(true);
    };

    const handleUpdate = (employee) => {
        setSelectedSupplier(employee); // Cargar datos del empleado
        setOpenDialogSuppliers(true);
    };

    const columns = {
        Nombre: "contact",
        Contacto: "contact",
    };

    const rows = [
        {
            _id: "122",
            name: "González",
            contact: "75950101",
        },
        {
            _id: "123",
            name: "González",
            contact: "7789652",
        },
    ];

    return (
        <PrincipalDiv>
            <DataGrid
                title={"Proveedores"}
                columns={columns}
                rows={rows}
                primaryBtnText={"Agregar Proveedores"}
                onClickPrimaryBtn={handleAdd}
                updateRow={handleUpdate} // <-- Lo importante: pasar handleEdit
            />
            {openDialogSuppliers && (<Dialog
                open={openDialogSuppliers}
                onClose={() => setOpenDialogSuppliers(false)}

            >
                <RegisterSuppliers
                    defaultValues={selectedSupplier} // Aquí enviamos los datos al form
                    onClose={() => setOpenDialogSuppliers(false)}
                />
            </Dialog>)}
        </PrincipalDiv>
    )
}
export default PageSupplies;