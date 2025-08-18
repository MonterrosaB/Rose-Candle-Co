import { useState, useEffect } from "react";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import Dialog from "../../global/components/Dialog";
import RegisterMaterial from "./components/RegisterMaterial";
import RegisterSupplies from "./components/RegisterSupplies";
import useMaterials from "./hooks/useMaterials";
import { useForm } from "react-hook-form";
import TitleH1 from "../../global/components/TitleH1";
import Swal from "sweetalert2"

const PageMaterials = () => {
  const [openDialogMaterial, setOpenDialogMaterial] = useState(false);
  const [openDialogSupplies, setOpenDialogSupplies] = useState(false);
  const [registroActual, setRegistroActual] = useState(null); // 🟡 Para editar

  const methods = useForm();

  const { materials, materialsBalance, loading, deleteMaterial } = useMaterials(methods);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  }

  const handleDelete = async (item, deleteFunction, itemType = "elemento") => {
    const result = await Swal.fire({
      title: `¿Eliminar "${item.name}"?`,
      text: `Esta acción eliminará el ${itemType} permanentemente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteFunction(item._id);
      Swal.fire({
        title: "Eliminado",
        text: `"${item.name}" ha sido eliminado correctamente.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  const columns = isChecked
    ? {
      Nombre: "idMaterial.name",
      Movimiento: "movement",
      Cantidad: "amount",
      Precio: "unitPrice",
      Referencia: "reference",
      Fecha: "date",
    }

    : {
      Nombre: "name",
      Stock: "currentStock",
      "Stock Minimo": "minimunStock",
      Unidad: "unit",
      Precio: "currentPrice",
      Categoria: "idRawMaterialCategory.name",
      Proveedor: "idSupplier.name",
    };

  return (
    <PrincipalDiv>
      {/* Tabla para md+ */}
      <TitleH1 title={"materia prima"} />
      <div className="hidden md:block overflow-x-auto">
        <DataGrid
          title="Materia Prima"
          columns={columns}
          rows={isChecked ? materialsBalance : materials}
          loading={loading}
          checkbox={true}
          checkboxText={"Mostar movimientos"}
          primaryBtnText="Agregar Materia Prima"
          checkboxChecked={isChecked}
          onCheckboxChange={handleCheckboxChange}
          editable={isChecked ? false : true}
          onClickPrimaryBtn={() => {
            setRegistroActual(null);
            setOpenDialogMaterial(true);
          }}
          secondaryBtnText="Agregar Insumos"
          onClickSecondaryBtn={() => setOpenDialogSupplies(true)}
          updateRow={(row) => {
            setRegistroActual(row);
            setOpenDialogMaterial(true);
          }}
          deleteRow={(row) => handleDelete(row, deleteMaterial, "material")}
        />
      </div>

      {/* Cards para móvil */}
      <div className="md:hidden pt-13 space-y-4 px-4">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Materia Prima</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setRegistroActual(null);
                setOpenDialogMaterial(true);
              }}
              className="flex-1 bg-[#C2A878] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#a98c6a] transition"
            >
              Agregar Materia Prima
            </button>
            <button
              onClick={() => setOpenDialogSupplies(true)}
              className="flex-1 bg-[#8a8a8a] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#6e6e6e] transition"
            >
              Agregar Insumos
            </button>
          </div>
        </div>

        {materials.map((mat) => (
          <div
            key={mat._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800">{mat.name}</h3>
            <p className="text-sm text-gray-600"><strong>Stock:</strong> {mat.currentStock}</p>
            <p className="text-sm text-gray-600"><strong>Unidad:</strong> {mat.unit}</p>
            <p className="text-sm text-gray-600"><strong>Precio:</strong> ${mat.currentPrice}</p>
            <p className="text-sm text-gray-600"><strong>Categoría:</strong> {mat.idRawMaterialCategory?.name || "-"}</p>
            <p className="text-sm text-gray-600"><strong>Proveedor:</strong> {mat.idSupplier?.name || "-"}</p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setRegistroActual(mat);
                  setOpenDialogMaterial(true);
                }}
                className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para Materia Prima */}
      {openDialogMaterial && (
        <Dialog open={openDialogMaterial} onClose={() => setOpenDialogMaterial(false)}>
          <RegisterMaterial
            defaultValues={registroActual} // ✅ Aquí va lo editable
            onClose={() => setOpenDialogMaterial(false)}
          />
        </Dialog>
      )}

      {/* Modal para Insumos */}
      {openDialogSupplies && (
        <Dialog open={openDialogSupplies} onClose={() => setOpenDialogSupplies(false)}>
          <RegisterSupplies onClose={() => setOpenDialogSupplies(false)} />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageMaterials;
