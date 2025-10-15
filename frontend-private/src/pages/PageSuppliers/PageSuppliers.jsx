// Lógica para la página de proveedores
import { useState, useEffect } from "react";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import Dialog from "../../global/components/Dialog";
import RegisterSuppliers from "./components/RegisterSuppliers";
import { useForm } from "react-hook-form";
import useSuppliers from "./hooks/useSuppliers";
import TitleH1 from "../../global/components/TitleH1"
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next"; // Soporte para i18n
import toast from "react-hot-toast";

const PageSuppliers = () => {
  const { t } = useTranslation("suppliers"); // Namespace del archivo suppliers.json

  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = `${t("document_title")} | Rosé Candle Co.`;
  }, [t]);

  const [openDialogSuppliers, setOpenDialogSuppliers] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const methods = useForm({
    defaultValues: { name: "", email: "", phoneNumber: "" },
  });

  const { reset, setValue } = methods;

  const {
    suppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    softDeleteSupplier,
    restoreSupplier
  } = useSuppliers();

  useEffect(() => {
    if (selectedSupplier) {
      reset(selectedSupplier);
    } else {
      reset({ name: "", email: "", phoneNumber: "" });
    }
  }, [selectedSupplier, reset]);

  const handleAdd = () => {
    setSelectedSupplier(null);
    setOpenDialogSuppliers(true);
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setOpenDialogSuppliers(true);
  };

  // Eliminación Permanente
  const handleDelete = async (supplier) => {
    const result = await Swal.fire({
      title: t("confirm_delete_title", { name: supplier.name }),
      text: t("confirm_delete_text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Rojo
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("confirm_delete_confirm"),
      cancelButtonText: t("confirm_delete_cancel"),
    });

    if (result.isConfirmed) {
      await deleteSupplier(supplier._id);
      Swal.fire({
        title: t("deleted_title"),
        text: t("deleted_text", { name: supplier.name }),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Eliminación Lógica (Archivar)
  const handleSoftDelete = async (supplier) => {
    const result = await Swal.fire({
      // Usar claves de SOFT DELETE
      title: t("confirm_soft_delete_title", { name: supplier.name }),
      text: t("confirm_soft_delete_text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b", // Naranja para archivar
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("confirm_soft_delete_confirm"),
      cancelButtonText: t("confirm_delete_cancel"),
    });

    if (result.isConfirmed) {
      await softDeleteSupplier(supplier._id);

      Swal.fire({
        // Usar claves de éxito de SOFT DELETE
        title: t("soft_deleted_title"),
        text: t("soft_deleted_text", { name: supplier.name }),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Restauración
  const handleRestore = async (supplier) => {
    const result = await Swal.fire({
      // Usar claves de RESTAURACIÓN
      title: t("confirm_restore_title", { name: supplier.name }),
      text: t("confirm_restore_text"),
      icon: "question", // Cambio a 'question' o 'info'
      showCancelButton: true,
      confirmButtonColor: "#10b981", // Verde para restaurar
      cancelButtonColor: "#d33",
      confirmButtonText: t("confirm_restore_confirm"),
      cancelButtonText: t("confirm_delete_cancel"),
    });

    if (result.isConfirmed) {
      await restoreSupplier(supplier._id);
      Swal.fire({
        // Usar claves de éxito de RESTAURACIÓN
        title: t("restored_title"),
        text: t("restored_text", { name: supplier.name }),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };



  const onSubmit = async (data) => {
    try {
      if (selectedSupplier) {
        await updateSupplier(selectedSupplier._id, data);
        toast.success("Proveedor actualizado exitosamente.");
      } else {
        await createSupplier(data);
        toast.success("Proveedor creado exitosamente.");
      }

      // ÉXITO: Cerramos el diálogo SOLO si todo salió bien.
      setOpenDialogSuppliers(false);

    } catch (error) {
      // ERROR: El diálogo NO se cierra.

      // Muestra el mensaje de error de forma limpia.
      // El objeto 'error' tendrá la propiedad 'message' si se lanzó con 'throw new Error(message)'.
      console.error("Error capturado en onSubmit:", error.message);
      toast.error(error.message || "Error desconocido al guardar el proveedor.");
    }
  };

  const columns = {
    [t("name")]: "name",
    [t("phone_number")]: "phoneNumber",
    [t("email")]: "email",
  };

  const rows = suppliers;

  return (
    <PrincipalDiv>
      <TitleH1 title={t("title")} />
      {/* Tabla para md+ */}
      <div className="hidden md:block overflow-x-auto">
        <DataGrid
          columns={columns}
          rows={rows}
          primaryBtnText={t("add")}
          onClickPrimaryBtn={handleAdd}
          updateRow={handleEdit}
          deleteRow={handleDelete}
          softDelete={handleSoftDelete}
          restoreRow={handleRestore}
          showStatus={true}
        />
      </div>

      {/* Vista cards para móvil */}
      <div className="md:hidden pt-13 space-y-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t("title")}</h2>
          <button
            onClick={handleAdd}
            className="bg-[#C2A878] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#a98c6a] transition"
          >
            {t("add_short")}
          </button>
        </div>

        {suppliers.map((supplier) => (
          <div
            key={supplier._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800">{supplier.name}</h3>
            <p className="text-sm text-gray-600"><strong>{t("phone_number")}:</strong> {supplier.phoneNumber}</p>
            <p className="text-sm text-gray-600"><strong>{t("email")}:</strong> {supplier.email}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(supplier)}
                className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                {t("edit")}
              </button>
              <button
                onClick={() => handleDelete(supplier)}
                className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openDialogSuppliers && (
        <Dialog open={openDialogSuppliers} onClose={() => setOpenDialogSuppliers(false)}>
          <RegisterSuppliers
            defaultValues={selectedSupplier}
            methods={methods}
            onClose={() => setOpenDialogSuppliers(false)}
            onSubmit={onSubmit}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageSuppliers;
