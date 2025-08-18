import { useState, useEffect } from "react";
import RegisterEmployee from "../components/RegisterEmployee";
import Dialog from "../../../global/components/Dialog";
import PrincipalDiv from "../../../global/components/PrincipalDiv";
import DataGrid from "../../../global/components/DataGrid";
import useEmployeeAction from "../hooks/useEmployeeAction";
import TitleH1 from "../../../global/components/TitleH1"


import useDataEmployee from "../hooks/useEmployees";
import useFetchEmployees from "../hooks/useFetchEmployees";

const PageEmployees = () => {
  useEffect(() => {
    document.title = "Empleados | Rosé Candle Co.";
  }, []);

  const { employees, getEmployees } = useFetchEmployees();
  const { deleteEmployee } = useEmployeeAction(getEmployees);

  const [openDialogEmployees, setOpenDialogEmployees] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleAdd = () => {
    setSelectedEmployee(null);
    setOpenDialogEmployees(true);
  };

  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialogEmployees(true);
  };

  const columns = {
    Nombres: "name",
    Apellidos: "surnames",
    Correo: "email",
    Teléfono: "phone",
    DUI: "dui",
    Rol: "role",
  };


  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setOpenDialogEmployees(false);
    getEmployees()
  };

  return (
    <PrincipalDiv>
      <TitleH1 title="Empleados" />

      {/* Vista tabla para pantallas medianas en adelante */}
      <div className="hidden md:block overflow-x-auto">
        <DataGrid
          columns={columns}
          rows={employees}
          primaryBtnText="Agregar Empleado"
          onClickPrimaryBtn={handleAdd}
          updateRow={handleUpdate}
          showDelete={false}
        />
      </div>


      {/* Vista tipo tarjeta para pantallas pequeñas */}
      <div className="md:hidden space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Empleados</h2>
          <button
            onClick={handleAdd}
            className="bg-[#C2A878] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#a98c6a] transition"
          >
            Agregar
          </button>
        </div>

        {employees.map((emp) => (
          <div
            key={emp.id || emp.dui}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800">{emp.name} {emp.surnames}</h3>
            <p className="text-sm text-gray-600"><strong>Correo:</strong> {emp.email}</p>
            <p className="text-sm text-gray-600"><strong>Teléfono:</strong> {emp.phone}</p>
            <p className="text-sm text-gray-600"><strong>DUI:</strong> {emp.dui}</p>
            <p className="text-sm text-gray-600"><strong>Usuario:</strong> {emp.user}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleUpdate(emp)}
                className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                Editar
              </button>
              <button
                onClick={() => deleteEmployee(emp.id)}
                className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Modal de registro / edición */}
      {openDialogEmployees && (
        <Dialog open={openDialogEmployees} onClose={handleCloseModal}>
          <RegisterEmployee
            defaultValues={selectedEmployee}
            onClose={handleCloseModal}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageEmployees;