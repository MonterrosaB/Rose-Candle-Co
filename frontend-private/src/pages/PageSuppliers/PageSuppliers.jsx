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
      {/* Tabla para md+ */}
      <div className="hidden md:block overflow-x-auto">
        <DataGrid
          title="Proveedores"
          columns={columns}
          rows={rows}
          primaryBtnText="Agregar Proveedor"
          onClickPrimaryBtn={handleAdd}
          updateRow={handleEdit}
          deleteRow={handleDelete}
        />
      </div>

      {/* Vista cards para móvil */}
      <div className="md:hidden pt-13 space-y-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Proveedores</h2>
          <button
            onClick={handleAdd}
            className="bg-[#C2A878] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#a98c6a] transition"
          >
            Agregar
          </button>
        </div>

        {suppliers.map((supplier) => (
          <div
            key={supplier._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800">{supplier.name}</h3>
            <p className="text-sm text-gray-600"><strong>Contacto:</strong> {supplier.contact}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(supplier)}
                className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(supplier)}
                className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                Eliminar
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
