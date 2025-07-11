// Página para gestionar empleados
import { useState, useEffect } from "react";

import RegisterEmployee from "../components/RegisterEmployee"; // Formulario para registrar al empleado
import Dialog from "../../../global/components/Dialog";
import PrincipalDiv from "../../../global/components/PrincipalDiv";
import DataGrid from "../../../global/components/DataGrid";

import useEmployees from "../hooks/useEmployees";

const PageEmployees = () => {
  /* Cambiar título de la página */
  useEffect(() => {
    document.title = "Empleados | Rosé Candle Co.";
  }, []);

  const { employees, fetchData, updateEmployee, cleanData, setActiveTab } =
    useEmployees();

  const [openDialogEmployees, setOpenDialogEmployees] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Funcion para agregar
  const handleAdd = () => {
    cleanData();
    setSelectedEmployee(null);
    setActiveTab("form");
    setOpenDialogEmployees(true);
  };

  // Funcion para actualizar
  const handleUpdate = (employee) => {
    updateEmployee(employee);
    setSelectedEmployee(employee);
    setOpenDialogEmployees(true);
  };

  // Columnas de la tabla
  const columns = {
    Nombres: "name",
    Apellidos: "surnames",
    Correo: "email",
    Teléfono: "phone",
    DUI: "dui",
    Usuario: "user",
  };

  return (
    <PrincipalDiv>
      <DataGrid
        title={"Empleados"}
        columns={columns}
        rows={employees}
        primaryBtnText={"Agregar Empleado"}
        onClickPrimaryBtn={handleAdd}
        updateRow={handleUpdate}
      />

      {openDialogEmployees && (
        <Dialog
          open={openDialogEmployees}
          onClose={() => setOpenDialogEmployees(false)}
        >
          <RegisterEmployee
            defaultValues={selectedEmployee}
            onClose={() => {
              setOpenDialogEmployees(false);
              fetchData();
            }}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageEmployees;
