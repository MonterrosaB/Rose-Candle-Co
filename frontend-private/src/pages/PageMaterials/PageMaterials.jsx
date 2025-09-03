import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import Dialog from "../../global/components/Dialog";
import TitleH1 from "../../global/components/TitleH1";
import RegisterMaterial from "./components/RegisterMaterial";
import RegisterSupplies from "./components/RegisterSupplies";
import useMaterials from "./hooks/useMaterials";

const PageMaterials = () => {
  const { t } = useTranslation("materials"); // Traducciones del namespace 'materials'

  // Título dinámico al montar el componente
  useEffect(() => {
    document.title = `${t("title")} | Rosé Candle Co.`;
  }, [t]);

  const [openDialogMaterial, setOpenDialogMaterial] = useState(false);
  const [openDialogSupplies, setOpenDialogSupplies] = useState(false);
  const [registroActual, setRegistroActual] = useState(null);
  const [isChecked, setIsChecked] = useState(false); // Toggle para mostrar movimientos

  const methods = useForm();
  const { materials, materialsBalance, loading, deleteMaterial } = useMaterials(methods);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // Confirmación y eliminación de material
  const handleDelete = async (item, deleteFunction, itemType = "material") => {
    const result = await Swal.fire({
      title: t("confirmDeleteTitle", { name: item.name }),
      text: t("confirmDeleteText", { itemType }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("confirmDeleteButton"),
      cancelButtonText: t("cancelButton"),
    });

    if (result.isConfirmed) {
      await deleteFunction(item._id);
      Swal.fire({
        title: t("deletedTitle"),
        text: t("deletedText", { name: item.name }),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Definición dinámica de columnas según el estado del checkbox
  const columns = isChecked
    ? {
      [t("columns.name")]: "idMaterial.name",
      [t("columns.movement")]: "movement",
      [t("columns.amount")]: "amount",
      [t("columns.price")]: "unitPrice",
      [t("columns.reference")]: "reference",
      [t("columns.date")]: "date",
    }
    : {
      [t("columns.name")]: "name",
      [t("columns.stock")]: "currentStock",
      [t("columns.minStock")]: "minimunStock",
      [t("columns.unit")]: "unit",
      [t("columns.price")]: "currentPrice",
      [t("columns.category")]: "idRawMaterialCategory.name",
      [t("columns.supplier")]: "idSupplier.name",
    };

  return (
    <PrincipalDiv>
      {/* Título principal */}
      <TitleH1 title={t("title")} />

      {/* Vista en tabla para pantallas medianas y grandes */}
      <div className="hidden md:block overflow-x-auto">
        <DataGrid
          title={t("title")}
          columns={columns}
          rows={isChecked ? materialsBalance : materials}
          loading={loading}
          checkbox
          checkboxText={t("showMovements")}
          checkboxChecked={isChecked}
          onCheckboxChange={handleCheckboxChange}
          editable={!isChecked}
          primaryBtnText={t("addMaterial")}
          onClickPrimaryBtn={() => {
            setRegistroActual(null);
            setOpenDialogMaterial(true);
          }}
          secondaryBtnText={t("addSupplies")}
          onClickSecondaryBtn={() => setOpenDialogSupplies(true)}
          updateRow={(row) => {
            setRegistroActual(row);
            setOpenDialogMaterial(true);
          }}
          deleteRow={(row) => handleDelete(row, deleteMaterial, "material")}
        />
      </div>

      {/* Vista tipo tarjetas para móviles */}
      <div className="md:hidden pt-13 space-y-4 px-4">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-gray-800">{t("title")}</h2>
          </div>

          {/* Botones para móviles */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setRegistroActual(null);
                setOpenDialogMaterial(true);
              }}
              className="flex-1 bg-[#C2A878] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#a98c6a] transition"
            >
              {t("addMaterial")}
            </button>
            <button
              onClick={() => setOpenDialogSupplies(true)}
              className="flex-1 bg-[#8a8a8a] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#6e6e6e] transition"
            >
              {t("addSupplies")}
            </button>
          </div>
        </div>

        {/* Renderizado de cada tarjeta de material */}
        {materials.map((mat) => (
          <div
            key={mat._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800">{mat.name}</h3>
            <p className="text-sm text-gray-600">
              <strong>{t("stock")}:</strong> {mat.currentStock}
            </p>
            <p className="text-sm text-gray-600">
              <strong>{t("unit")}:</strong> {mat.unit}
            </p>
            <p className="text-sm text-gray-600">
              <strong>{t("price")}:</strong> ${mat.currentPrice}
            </p>
            <p className="text-sm text-gray-600">
              <strong>{t("category")}:</strong>{" "}
              {mat.idRawMaterialCategory?.name || "-"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>{t("supplier")}:</strong> {mat.idSupplier?.name || "-"}
            </p>

            {/* Botón editar */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setRegistroActual(mat);
                  setOpenDialogMaterial(true);
                }}
                className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                {t("edit")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de formulario para agregar/editar Materia Prima */}
      {openDialogMaterial && (
        <Dialog open={openDialogMaterial} onClose={() => setOpenDialogMaterial(false)}>
          <RegisterMaterial
            defaultValues={registroActual}
            onClose={() => setOpenDialogMaterial(false)}
          />
        </Dialog>
      )}

      {/* Modal para agregar insumos */}
      {openDialogSupplies && (
        <Dialog open={openDialogSupplies} onClose={() => setOpenDialogSupplies(false)}>
          <RegisterSupplies onClose={() => setOpenDialogSupplies(false)} />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageMaterials;
