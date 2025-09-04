import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Importar hook para traducciones
import RegisterEmployee from "../components/RegisterEmployee";
import Dialog from "../../../global/components/Dialog";
import PrincipalDiv from "../../../global/components/PrincipalDiv";
import DataGrid from "../../../global/components/DataGrid";
import useEmployeeAction from "../hooks/useEmployeeAction";
import TitleH1 from "../../../global/components/TitleH1";
import useFetchEmployees from "../hooks/useFetchEmployees";

const PageEmployees = () => {
  const { t } = useTranslation("employees"); // Inicializar traducción con el namespace 'employees'

  // Cambiar el título del documento al montar el componente con texto traducido
  useEffect(() => {
    document.title = t("title");
  }, [t]);

  // Obtener empleados y función para refrescar lista desde hook personalizado
  const { employees, getEmployees } = useFetchEmployees();

  // Obtener función para eliminar empleado, pasando el refresco de lista
  const { deleteEmployee } = useEmployeeAction(getEmployees);

  // Estado para controlar apertura/cierre del diálogo modal
  const [openDialogEmployees, setOpenDialogEmployees] = useState(false);

  // Estado para almacenar el empleado seleccionado para edición
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Función para abrir el modal en modo "agregar"
  const handleAdd = () => {
    setSelectedEmployee(null); // Limpiar selección previa
    setOpenDialogEmployees(true); // Abrir diálogo
  };

  // Función para abrir el modal en modo "editar" con empleado seleccionado
  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialogEmployees(true);
  };

  // Definición de columnas para la tabla, usando textos traducidos
  const columns = {
    [t("columns.firstName")]: "name",
    [t("columns.lastName")]: "surnames",
    [t("columns.email")]: "email",
    [t("columns.phone")]: "phone",
    [t("columns.dui")]: "dui",
    [t("columns.role")]: "role",
  };

  // Función para cerrar el modal y refrescar la lista de empleados
  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setOpenDialogEmployees(false);
    getEmployees(); // Refrescar datos después de cerrar modal
  };

  return (
    <PrincipalDiv>
      {/* Título principal de la página */}
      <TitleH1 title={t("pageTitle")} />

      {/* Vista tabla para pantallas medianas en adelante */}
      <div className="hidden md:block overflow-x-auto">
        <DataGrid
          columns={columns}
          rows={employees}
          primaryBtnText={t("buttons.addEmployee")}
          onClickPrimaryBtn={handleAdd}
          updateRow={handleUpdate}
          showDelete={false} // No mostrar botón eliminar en tabla
        />
      </div>

      {/* Vista tipo tarjeta para pantallas pequeñas */}
      <div className="md:hidden space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t("pageTitle")}</h2>
          <button
            onClick={handleAdd}
            className="bg-[#C2A878] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#a98c6a] transition"
          >
            {t("buttons.add")}
          </button>
        </div>

        {/* Renderizar cada empleado como tarjeta */}
        {employees.map((emp) => (
          <div
            key={emp.id || emp.dui}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800">{emp.name} {emp.surnames}</h3>
            <p className="text-sm text-gray-600"><strong>{t("columns.email")}:</strong> {emp.email}</p>
            <p className="text-sm text-gray-600"><strong>{t("columns.phone")}:</strong> {emp.phone}</p>
            <p className="text-sm text-gray-600"><strong>{t("columns.dui")}:</strong> {emp.dui}</p>
            <p className="text-sm text-gray-600"><strong>Usuario:</strong> {emp.user}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleUpdate(emp)}
                className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                {t("buttons.edit")}
              </button>
              <button
                onClick={() => deleteEmployee(emp.id)}
                className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                {t("buttons.delete")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar o editar empleado */}
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
