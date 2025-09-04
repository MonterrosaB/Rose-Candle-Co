import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

import PrincipalDiv from "../../global/components/PrincipalDiv";
import TitleH1 from "../../global/components/TitleH1";
import DataGrid from "../../global/components/DataGrid";
import FormOneInput from "../../global/components/FormOneInput";
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
    register,
    handleSubmit,
    errors,
    reset,
    collections,
    createCollection,
    updateCollection,
    deleteCollection,
  } = useCollections(methods);

  // Sincronizar formulario con los datos seleccionados
  useEffect(() => {
    if (selectedCollection) {
      reset(selectedCollection);
    } else {
      reset({ name: "" });
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

  const handleDelete = async (collection) => {
    if (!collection?._id) return;

    const result = await Swal.fire({
      title: t("confirmDeleteTitle", { name: collection.name }),
      text: t("confirmDeleteText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("confirmDeleteButton"),
      cancelButtonText: t("cancelButton"),
    });

    if (result.isConfirmed) {
      await deleteCollection(collection._id);
      Swal.fire({
        title: t("deletedTitle"),
        text: t("deletedText", { name: collection.name }),
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
    [t("nameLabel")]: "name",
  };

  return (
    <PrincipalDiv>
      <TitleH1 title={t("title")} />

      {/* Vista de tabla para escritorio */}
      <div className="hidden md:block overflow-x-auto">
        <DataGrid
          columns={columns}
          rows={collections}
          primaryBtnText={t("addCollection")}
          onClickPrimaryBtn={handleAdd}
          updateRow={handleEdit}
          deleteRow={handleDelete}
        />
      </div>

      {/* Vista en tarjetas para móviles */}
      <div className="md:hidden pt-13 space-y-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t("mobileTitle")}</h2>
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
            <h3 className="text-lg font-semibold text-gray-800">{collection.name}</h3>
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
        <Dialog open={openDialogCollections} onClose={() => setOpenDialogCollections(false)}>
          <FormOneInput
            headerLabel={selectedCollection ? t("editCollection") : t("addCollection")}
            onSubmit={handleSubmit(onSubmit)}
            name="name"
            label={t("nameLabel")}
            register={register}
            onClose={() => {
              setOpenDialogCollections(false);
              setSelectedCollection(null);
            }}
            error={errors.name?.message}
            btnTxt={selectedCollection ? t("saveChanges") : t("addCollection")}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageCollections;
