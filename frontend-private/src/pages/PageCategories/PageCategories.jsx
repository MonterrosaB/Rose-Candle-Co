import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

import PrincipalDiv from "../../global/components/PrincipalDiv";
import TitleH1 from "../../global/components/TitleH1";
import DataGrid from "../../global/components/DataGrid";
import FormOneInput from "../../global/components/FormOneInput";
import Dialog from "../../global/components/Dialog";
import useCategories from "./hooks/useCategories";

const PageCategories = () => {
  const { t } = useTranslation("categories"); // Hook de traducción

  // Cambiar título del documento al montar
  useEffect(() => {
    document.title = `${t("title")} | Rosé Candle Co.`;
  }, [t]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const methods = useForm({
    defaultValues: selectedCategory || {},
  });

  const {
    register,
    handleSubmit,
    errors,
    reset,
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    softDeleteCategory,
    restoreCategory
  } = useCategories(methods);

  // Sincronizar el formulario con la categoría seleccionada
  useEffect(() => {
    if (selectedCategory) {
      reset(selectedCategory);
    } else {
      reset({ name: "" });
    }
  }, [selectedCategory, reset]);

  const columns = {
    [t("nameLabel")]: "name",
  };

  const rows = categories;

  const handleAdd = () => {
    setSelectedCategory(null);
    setOpenDialog(true);
  };

  const handleEdit = (category) => {
    if (!category?._id) return;
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleDelete = async (category) => {
    if (!category?._id) return;

    const result = await Swal.fire({
      // Usamos las claves originales, pero con el texto de "permanente"
      title: t("confirmDeleteTitle", { name: category.name }),
      text: t("confirmDeleteText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Rojo para eliminar
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("confirmDeleteButton"),
      cancelButtonText: t("cancelButton"),
    });

    if (result.isConfirmed) {
      await deleteCategory(category._id);
      Swal.fire({
        // Mensajes de éxito específicos para la eliminación permanente
        title: t("deletedTitle"),
        text: t("deletedText", { name: category.name }),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleSoftDelete = async (category) => {
    if (!category?._id) return;

    const result = await Swal.fire({
      // Títulos y textos específicos para la eliminación lógica
      title: t("confirmSoftDeleteTitle", { name: category.name }),
      text: t("confirmSoftDeleteText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b", // Color naranja para archivar/soft delete
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("confirmSoftDeleteButton"),
      cancelButtonText: t("cancelButton"),
    });

    if (result.isConfirmed) {
      await softDeleteCategory(category._id);
      Swal.fire({
        // Mensajes de éxito específicos para la eliminación lógica
        title: t("softDeletedTitle"),
        text: t("softDeletedText", { name: category.name }),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleRestore = async (category) => {
    if (!category?._id) return;

    const result = await Swal.fire({
      // Títulos y textos específicos para la restauración
      title: t("confirmRestoreTitle", { name: category.name }),
      text: t("confirmRestoreText"),
      icon: "question", // Cambiado a 'question' o 'info'
      showCancelButton: true,
      confirmButtonColor: "#10b981", // Color verde para restaurar
      cancelButtonColor: "#d33",
      confirmButtonText: t("confirmRestoreButton"),
      cancelButtonText: t("cancelButton"),
    });

    if (result.isConfirmed) {
      await restoreCategory(category._id);
      Swal.fire({
        // Mensajes de éxito específicos para la restauración
        title: t("restoredTitle"),
        text: t("restoredText", { name: category.name }),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };


  const onSubmit = async (data) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory._id, data);
    } else {
      await createCategory(data);
    }
    setOpenDialog(false);
  };

  return (
    <PrincipalDiv>
      <TitleH1 title={t("title")} />

      {/* Tabla para pantallas medianas en adelante */}
      <div className="hidden md:block">
        <DataGrid
          title={t("tableTitle")}
          columns={columns}
          rows={rows}
          primaryBtnText={t("addCategory")}
          onClickPrimaryBtn={handleAdd}
          updateRow={handleEdit}
          deleteRow={handleDelete}
          softDelete={handleSoftDelete}
          restoreRow={handleRestore}
          showStatus={true}
          showDelete={true}
        />
      </div>

      {/* Vista tipo tarjetas para móviles */}
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

        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(cat)}
                className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                {t("edit")}
              </button>
              <button
                onClick={() => handleDelete(cat)}
                className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar/editar categoría */}
      {openDialog && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <FormOneInput
            headerLabel={selectedCategory ? t("editCategory") : t("addCategory")}
            onSubmit={handleSubmit(onSubmit)}
            name="name"
            label={t("nameLabel")}
            register={register}
            onClose={() => setOpenDialog(false)}
            error={errors.name?.message}
            btnTxt={selectedCategory ? t("saveChanges") : t("addCategory")}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageCategories;
