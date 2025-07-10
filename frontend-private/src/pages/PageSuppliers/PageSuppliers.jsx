import { useState, useEffect } from "react";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import Dialog from "../../global/components/Dialog";
import RegisterSuppliers from "./components/RegisterSuppliers";
import { useForm } from "react-hook-form";
import useSuppliers from "./hooks/useSuppliers";

const PageSuppliers = () => {
  const [openDialogSuppliers, setOpenDialogSuppliers] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // ✅ Solo se crea UNA VEZ
  const methods = useForm({
    defaultValues: { name: "", contact: "" },
  });

  const { reset } = methods;

  const {
    suppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  } = useSuppliers();

  useEffect(() => {
    if (selectedSupplier) {
      reset(selectedSupplier);
    } else {
      reset({ name: "", contact: "" });
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

  const handleDelete = async (supplier) => {
    if (confirm(`¿Eliminar proveedor "${supplier.name}"?`)) {
      await deleteSupplier(supplier._id);
    }
  };

  const onSubmit = async (data) => {
    if (selectedSupplier) {
      await updateSupplier(selectedSupplier._id, data);
    } else {
      await createSupplier(data);
    }
    setOpenDialogSuppliers(false);
  };

  const columns = {
    Nombre: "name",
    Contacto: "contact",
  };

  const rows = suppliers;

  return (
    <PrincipalDiv>
      <DataGrid
        title={"Proveedores"}
        columns={columns}
        rows={rows}
        primaryBtnText={"Agregar Proveedor"}
        onClickPrimaryBtn={handleAdd}
        updateRow={handleEdit}
        deleteRow={handleDelete}
      />

      {openDialogSuppliers && (
        <Dialog
          open={openDialogSuppliers}
          onClose={() => setOpenDialogSuppliers(false)}
        >
          <RegisterSuppliers
            defaultValues={selectedSupplier}
            methods={methods} // ✅ pasa el form completo
            onClose={() => setOpenDialogSuppliers(false)}
            onSubmit={onSubmit}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageSuppliers;
