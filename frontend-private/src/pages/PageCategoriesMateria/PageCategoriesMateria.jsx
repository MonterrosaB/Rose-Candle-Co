import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';

import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import FormOneInput from "../../global/components/FormOneInput";
import Dialog from "../../global/components/Dialog";
import TitleH1 from "../../global/components/TitleH1";

import useCategoriesMateria from "./hooks/useCategoriesMateria";

const PageCategoriesMateria = () => {
  const { t } = useTranslation("categoriesMateria"); // Hook de traducción i18next con namespace

  // Establecer el título del documento al cargar el componente
  useEffect(() => {
    document.title = `${t("title")} | Rosé Candle Co.`;
  }, [t]);

  // Estado para controlar la visibilidad del modal
  const [openDialogCategories, setOpenDialogCategories] = useState(false);

  // Estado para almacenar la categoría seleccionada (al editar)
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Inicialización del formulario con react-hook-form
  const methods = useForm({
    defaultValues: selectedCategory || {}, // Si se selecciona una categoría, se rellenan sus datos
  });

  // Custom hook para manejar lógica de categorías
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
  } = useCategoriesMateria(methods);

  // Actualiza el formulario cuando cambia la categoría seleccionada
  useEffect(() => {
    if (selectedCategory) {
      reset(selectedCategory); // Editar: rellenar el formulario con los datos existentes
    } else {
      reset({ name: "" }); // Nuevo: limpiar el formulario
    }
  }, [selectedCategory, reset]);

  // Abrir el diálogo para crear una nueva categoría
  const handleAdd = () => {
    setSelectedCategory(null);
    setOpenDialogCategories(true);
  };

  // Abrir el diálogo para editar una categoría existente
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenDialogCategories(true);
  };

  // Eliminar una categoría con confirmación de usuario
  const handleDelete = async (category) => {
    const result = await Swal.fire({
      title: t("confirmDeleteTitle", { name: category.name }), // Añadido el nombre aquí
      text: t("confirmDeleteText"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: t("confirmDeleteButton"),
      cancelButtonText: t("cancelButton")
    });

    if (result.isConfirmed) {
      await deleteCategory(category._id);
      Swal.fire({
        title: t("deletedTitle"),
        text: t("deletedText", { name: category.name }), // Añadido el nombre aquí
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  // Eliminar lógicamente una categoría con confirmación de usuario
  const handleSoftDelete = async (category) => {
    const result = await Swal.fire({
      // Utiliza mensajes para Archivar (Soft Delete)
      title: t("confirmSoftDeleteTitle", { name: category.name }),
      text: t("confirmSoftDeleteText"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b', // Naranja para Archivar
      cancelButtonColor: '#3085d6',
      confirmButtonText: t("confirmSoftDeleteButton"),
      cancelButtonText: t("cancelButton")
    });

    if (result.isConfirmed) {
      await softDeleteCategory(category._id);
      Swal.fire({
        // Utiliza mensajes de éxito para Archivar
        title: t("softDeletedTitle"),
        text: t("softDeletedText", { name: category.name }),
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  // Restaurar una categoría con confirmación de usuario
  const handleRestore = async (category) => {
    const result = await Swal.fire({
      // Utiliza mensajes para Restaurar
      title: t("confirmRestoreTitle", { name: category.name }),
      text: t("confirmRestoreText"),
      icon: 'question', // Pregunta/Info en lugar de Warning
      showCancelButton: true,
      confirmButtonColor: '#10b981', // Verde para Restaurar
      cancelButtonColor: '#d33',
      confirmButtonText: t("confirmRestoreButton"),
      cancelButtonText: t("cancelButton")
    });

    if (result.isConfirmed) {
      await restoreCategory(category._id);
      Swal.fire({
        // Utiliza mensajes de éxito para Restaurar
        title: t("restoredTitle"),
        text: t("restoredText", { name: category.name }),
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };



  // Enviar el formulario para crear o actualizar una categoría
  const onSubmit = async (data) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory._id, data); // Actualización
    } else {
      await createCategory(data); // Creación
    }
    setOpenDialogCategories(false);
    setSelectedCategory(null); // Resetear selección
  };

  // Definición de columnas para la tabla de escritorio
  const columns = {
    [t("categoryLabel")]: "name",
  };

  return (
    <PrincipalDiv>
      {/* Título principal de la página */}
      <TitleH1 title={t("title")} />

      {/* Vista de tabla para dispositivos de escritorio */}
      <div className="hidden md:block overflow-x-auto">
        <DataGrid
          columns={columns}
          rows={categories}
          primaryBtnText={t("addCategory")}
          onClickPrimaryBtn={handleAdd}
          updateRow={handleEdit}
          deleteRow={handleDelete}
          softDelete={handleSoftDelete}
          restoreRow={handleRestore}
          showStatus={true}
        />
      </div>

      {/* Vista de tarjetas para dispositivos móviles */}
      <div className="md:hidden pt-13 space-y-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t("title")}</h2>
          <button
            onClick={handleAdd}
            className="bg-[#C2A878] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#a98c6a] transition"
          >
            {t("add")}
          </button>
        </div>

        {/* Renderizado de las tarjetas de categorías */}
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(category)}
                className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                {t("edit")}
              </button>
              <button
                onClick={() => handleDelete(category)}
                className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear o editar categoría */}
      {openDialogCategories && (
        <Dialog open={openDialogCategories} onClose={() => setOpenDialogCategories(false)}>
          <FormOneInput
            headerLabel={selectedCategory ? t("editCategory") : t("addCategory")}
            onSubmit={handleSubmit(onSubmit)}
            name="name"
            label={t("categoryLabel")}
            register={register}
            error={errors.name?.message}
            btnTxt={selectedCategory ? t("saveChanges") : t("addCategory")}
            onClose={() => {
              setOpenDialogCategories(false);
              setSelectedCategory(null);
            }}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageCategoriesMateria;
