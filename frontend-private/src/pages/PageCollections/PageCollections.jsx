import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

import PrincipalDiv from "../../global/components/PrincipalDiv";
import TitleH1 from "../../global/components/TitleH1";
import DataGrid from "../../global/components/DataGrid";
import RegisterCollections from "./components/RegisterCollections";
import Dialog from "../../global/components/Dialog";
import useCollections from "./hooks/useCollections";

const PageCollections = () => {
  const { t } = useTranslation("collections"); // Hook de traducción

  // Actualizar el título del documento al montar
  useEffect(() => {
    document.title = `${t("title")} | Rosé Candle Co.`;
  }, [t]);

  const [openDialogCollections, setOpenDialogCollections] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Inicialización del formulario
  const methods = useForm({
    defaultValues: selectedCollection || {},
  });

  const {
    reset,
    collections,
    createCollection,
    updateCollection,
    softDeleteCollection,
    hardDeleteCollection,
    restoreCollection
  } = useCollections(methods);

  // Sincronizar formulario con los datos seleccionados
  useEffect(() => {
    if (selectedCollection) {
      reset(selectedCollection);
    } else {
      reset({ name: "", description: "" });
    }
  }, [selectedCollection, reset]);

  const handleAdd = () => {
    setSelectedCollection(null);
    setOpenDialogCollections(true);
  };

  const handleEdit = (collection) => {
    setSelectedCollection(collection);
    setOpenDialogCollections(true);
  };

  const handleHardDelete = async (collection) => {
    if (!collection?._id) return;

    const result = await Swal.fire({
      // Usar claves de HARD DELETE
      title: t("confirmHardDeleteTitle", { name: collection.name }),
      text: t("confirmHardDeleteText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Rojo para peligro
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("confirmHardDeleteButton"),
      cancelButtonText: t("cancelButton"),
    });

    if (result.isConfirmed) {
      await hardDeleteCollection(collection._id);
      Swal.fire({
        // Usar claves de éxito de HARD DELETE
        title: t("deletedTitle"),
        text: t("deletedText", { name: collection.name }),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleSoftDelete = async (collection) => {
    if (!collection?._id) return;

    const result = await Swal.fire({
      // Usar claves de SOFT DELETE
      title: t("confirmSoftDeleteTitle", { name: collection.name }),
      text: t("confirmSoftDeleteText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b", // Naranja para Archivar
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("confirmSoftDeleteButton"),
      cancelButtonText: t("cancelButton"),
    });

    if (result.isConfirmed) {
      await softDeleteCollection(collection._id);
      Swal.fire({
        // Usar claves de éxito de SOFT DELETE
        title: t("softDeletedTitle"),
        text: t("softDeletedText", { name: collection.name }),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleRestore = async (collection) => {
    if (!collection?._id) return;

    const result = await Swal.fire({
      // Usar claves de RESTAURACIÓN
      title: t("confirmRestoreTitle", { name: collection.name }),
      text: t("confirmRestoreText"),
      icon: "question", // Pregunta o Info
      showCancelButton: true,
      confirmButtonColor: "#10b981", // Verde para Restaurar
      cancelButtonColor: "#d33",
      confirmButtonText: t("confirmRestoreButton"),
      cancelButtonText: t("cancelButton"),
    });

    if (result.isConfirmed) {
      await restoreCollection(collection._id);
      Swal.fire({
        // Usar claves de éxito de RESTAURACIÓN
        title: t("restoredTitle"),
        text: t("restoredText", { name: collection.name }),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };



  const onSubmit = async (data) => {
    if (selectedCollection) {
      await updateCollection(selectedCollection._id, data);
    } else {
      await createCollection(data);
    }
    setOpenDialogCollections(false);
    setSelectedCollection(null);
  };

  const columns = {
    [t("name")]: "name",
  };

  return (
    <PrincipalDiv>
      <TitleH1 title={t("title")} />

      {/* Vista de tabla para escritorio */}
      <div className="hidden md:block overflow-x-auto">
        <DataGrid
          columns={columns}
          rows={collections}
          primaryBtnText={t("form.add_title")}
          onClickPrimaryBtn={handleAdd}
          updateRow={handleEdit}
          deleteRow={handleHardDelete}
          softDelete={handleSoftDelete}
          restoreRow={handleRestore}
          showStatus={true}
        />
      </div>

      {/* Vista en tarjetas para móviles */}
      <div className="md:hidden pt-13 space-y-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {t("mobileTitle")}
          </h2>
          <button
            onClick={handleAdd}
            className="bg-[#C2A878] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#a98c6a] transition"
          >
            {t("add")}
          </button>
        </div>

        {collections.map((collection) => (
          <div
            key={collection._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {collection.name}
            </h3>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(collection)}
                className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                {t("edit")}
              </button>
              <button
                onClick={() => handleDelete(collection)}
                className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Diálogo para agregar o editar colección */}
      {openDialogCollections && (
        <Dialog
          open={openDialogCollections}
          onClose={() => setOpenDialogCollections(false)}
        >
          <RegisterCollections
            defaultValues={selectedCollection}
            methods={methods}
            onClose={() => {
              setOpenDialogCollections(false);
              setSelectedCollection(null);
            }}
            onSubmit={onSubmit}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageCollections;
