import { useState } from "react"

import RegisterEmployee from "./components/RegisterEmployee"
import Dialog from "../../global/components/Dialog"
import PrincipalDiv from "../../global/components/PrincipalDiv"
import DataGrid from "../../global/components/DataGrid"


const PageEmplooyes = () => {

    const [openDialogEmployees, setOpenDialogEmployees] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleAdd = () => {
        setSelectedEmployee(null); // Form vacío
        setOpenDialogEmployees(true);
    };

    const handleUpdate = (employee) => {
        setSelectedEmployee(employee); // Cargar datos del empleado
        setOpenDialogEmployees(true);
    };


    const columns = {
        "DUI": "dui",
        "Nombre": "name",
        "Apellido": "surnames",
        "Correo": "email",
        "Teléfono": "phone",
        "Usuario": "user",
        "Estado": "isActive"
    };

    //Registros de las tablas
    //En este caso seria la variable materials o como se nombre.
    //Descomenntar loading
    const rows = [
        {
            name: "María",
            surnames: "González",
            phone: "2233-4455",
            dui: "12345678-9",
            email: "maria.g@example.com",
            password: "S3cur3Emp1oy3e*",
            user: "mariag",
            isActive: true
        },
        {
            name: "Carlos",
            surnames: "Ramírez",
            phone: "7654-3210",
            dui: "98765432-1",
            email: "carlos.ram@example.com",
            password: "P@sswordC4rl0s!",
            user: "carlosr",
            isActive: false
        }
    ];

    return (
        <PrincipalDiv>
            <DataGrid
                title={"Empleados"}
                columns={columns}
                rows={rows}
                primaryBtnText={"Agregar Empleado"}
                onClickPrimaryBtn={handleAdd}
                updateRow={handleUpdate}
            />

            {openDialogEmployees && (<Dialog
                open={openDialogEmployees}
                onClose={() => setOpenDialogEmployees(false)}

            >
                <RegisterEmployee
                    defaultValues={selectedEmployee} // Aquí enviamos los datos al form
                    onClose={() => setOpenDialogEmployees(false)}
                />
            </Dialog>)}
        </PrincipalDiv>

    )
}
export default PageEmplooyes