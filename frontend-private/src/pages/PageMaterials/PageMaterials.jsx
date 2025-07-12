import { useState, useEffect } from "react";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import Dialog from "../../global/components/Dialog";
import RegisterMaterial from "./components/RegisterMaterial";
import RegisterSupplies from "./components/RegisterSupplies";
import useMaterials from "./hooks/useMaterials";
import { useForm } from "react-hook-form";

const PageMaterials = () => {
  const [openDialogMaterial, setOpenDialogMaterial] = useState(false);
  const [openDialogSupplies, setOpenDialogSupplies] = useState(false);
  const [registroActual, setRegistroActual] = useState(null); // 🟡 Para editar

  const methods = useForm();

  const { materials, loading, deleteMaterial } = useMaterials(methods);

  const columns = {
    Nombre: "name",
    Stock: "currentStock",
    Unidad: "unit",
    Precio: "currentPrice",
    Categoria: "idRawMaterialCategory.name",
    Proveedor: "idSupplier.name",
  };

  return (
    <PrincipalDiv>
      <DataGrid
        title="Materia Prima"
        columns={columns}
        rows={materials}
        loading={loading}
        primaryBtnText="Agregar Materia Prima"
        onClickPrimaryBtn={() => {
          setRegistroActual(null); // ➕ nuevo
          setOpenDialogMaterial(true);
        }}
        secondaryBtnText="Agregar Insumos"
        onClickSecondaryBtn={() => setOpenDialogSupplies(true)}
        updateRow={(row) => {
          setRegistroActual(row); // ✏️ editar
          setOpenDialogMaterial(true);
        }}
        deleteRow={(row) => {
          if (confirm(`¿Eliminar "${row.name}"?`)) {
            deleteMaterial(row._id);
          }
        }}
      />

      {openDialogMaterial && (
        <Dialog open={openDialogMaterial} onClose={() => setOpenDialogMaterial(false)}>
          <RegisterMaterial
            defaultValues={registroActual} // ✅ Aquí va lo editable
            onClose={() => setOpenDialogMaterial(false)}
          />
        </Dialog>
      )}

      {openDialogSupplies && (
        <Dialog open={openDialogSupplies} onClose={() => setOpenDialogSupplies(false)}>
          <RegisterSupplies onClose={() => setOpenDialogSupplies(false)} />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageMaterials;
