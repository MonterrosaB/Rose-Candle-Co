import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Importar hook para traducciones
import RegisterEmployee from "../components/RegisterEmployee";
import Dialog from "../../../global/components/Dialog";
import PrincipalDiv from "../../../global/components/PrincipalDiv";
import DataGrid from "../../../global/components/DataGrid";
import useEmployeeAction from "../hooks/useEmployeeAction";
import TitleH1 from "../../../global/components/TitleH1";
import useFetchEmployees from "../hooks/useFetchEmployees";
import toast from "react-hot-toast";
import { useAuth } from "../../../global/hooks/useAuth";

const PageEmployees = () => {
  const { t } = useTranslation("employees"); // Inicializar traducción con el namespace 'employees'

  // Cambiar el título del documento al montar el componente con texto traducido
  useEffect(() => {
    document.title = t("title");
  }, [t]);

  const { user } = useAuth();

  // Obtener empleados y función para refrescar lista desde hook personalizado
  const { employees, getEmployees } = useFetchEmployees();

  // Obtener función para eliminar empleado, pasando el refresco de lista
  const { deleteEmployee } = useEmployeeAction(getEmployees);

  // Estado para controlar apertura/cierre del diálogo modal
  const [openDialogEmployees, setOpenDialogEmployees] = useState(false);

  // Estado para almacenar el empleado seleccionado para edición
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Función para abrir el modal en modo "agregar"
  const handleAdd = (e) => {

    e.preventDefault();    //  Detener el comportamiento por defecto (evitar el submit/refresco)

    setSelectedEmployee(null); // Limpiar selección previa
    setOpenDialogEmployees(true); // Abrir diálogo
  };

  const userRole = user.role; //
  const handleUpdate = (employee) => {
    // Aseguramos que el rol del empleado a editar esté en minúsculas y sin espacios
    const employeeRole = employee.role.toLowerCase().replace(/\s/g, '_');

    // 1. Un Super Admin puede editar a cualquiera (incluidos otros Admins, pero no a sí mismo si está en la lista)
    // 2. Un Admin NO puede editar a otro Admin.
    // 3. NADIE (excepto el Super Admin logueado, que se maneja fuera de esta lista) puede editar a un Super Admin.

    const canEdit =
      userRole === "super_admin" && employeeRole !== "super_admin" || // Super Admin puede editar Admins/Empleados, pero no a OTRO Super Admin (si estuviera en la lista)
      (userRole !== "super_admin" && employeeRole !== "admin" && employeeRole !== "super_admin"); // Cualquier otro rol solo puede editar 'empleados' (ni admin ni super_admin)

    // Simplificando la intención (evitar que un userRole < super_admin edite a admin/super_admin):
    const isTargetAdminOrSuper = employeeRole === "admin" || employeeRole === "super_admin";

    const canProceed = userRole === "super_admin" || !isTargetAdminOrSuper;


    if (canProceed) {
      setSelectedEmployee(employee);
      setOpenDialogEmployees(true);
    } else {
      // Si el usuario logueado no es super_admin e intenta editar un admin/super_admin
      toast.error(t("messages.editAdminRestriction"));
    }
  };

  // Definición de columnas para la tabla, usando textos traducidos
  const columns = {
    [t("columns.dui")]: "dui",
    [t("columns.firstName")]: "name",
    [t("columns.lastName")]: "surnames",
    [t("columns.email")]: "email",
    [t("columns.phone")]: "phone",
    [t("columns.role")]: "role",
  };

  // Función para cerrar el modal y refrescar la lista de empleados
  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setOpenDialogEmployees(false);
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
