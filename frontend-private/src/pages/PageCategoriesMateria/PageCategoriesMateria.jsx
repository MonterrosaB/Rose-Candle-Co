import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import FormOneInput from "../../global/components/FormOneInput";
import Dialog from "../../global/components/Dialog";

import useCategoriesMateria from "./hooks/useCategoriesMateria";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const PageCategoriesMateria = () => {
  const [openDialogCategories, setOpenDialogCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Inicializar formulario con valores por defecto o vacíos
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
  } = useCategoriesMateria(methods);

  // Sincroniza el formulario con la categoría seleccionada para editar o limpiar para nueva
  useEffect(() => {
    if (selectedCategory) {
      reset(selectedCategory);
    } else {
      reset({ name: "" });
    }
  }, [selectedCategory, reset]);

  // Abrir diálogo para agregar categoría nueva
  const handleAdd = () => {
    setSelectedCategory(null);
    setOpenDialogCategories(true);
  };

  // Abrir diálogo para editar categoría existente
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenDialogCategories(true);
  };

  // Confirmar y eliminar categoría seleccionada
  const handleDelete = async (category) => {
    if (confirm(`¿Eliminar categoría "${category.name}"?`)) {
      await deleteCategory(category._id);
    }
  };

  // Enviar formulario para crear o actualizar categoría
  const onSubmit = async (data) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory._id, data);
    } else {
      await createCategory(data);
    }
    setOpenDialogCategories(false);
  };

  const columns = {
    Categoría: "name",
  };

  const rows = categories;

  return (
    <PrincipalDiv>
      <DataGrid
        title={"Categorías de Materia Prima"}
        columns={columns}
        rows={rows}
        primaryBtnText={"Agregar Categoría"}
        onClickPrimaryBtn={handleAdd}
        updateRow={handleEdit}
        deleteRow={handleDelete}
      />

      {openDialogCategories && (
        <Dialog open={openDialogCategories} onClose={() => setOpenDialogCategories(false)}>
          <FormOneInput
            headerLabel={selectedCategory ? "Editar Categoría" : "Agregar Categoría"}
            onSubmit={handleSubmit(onSubmit)}
            name={"name"}
            label={"Categoría"}
            register={register}
            error={errors.name?.message}
            btnTxt={selectedCategory ? "Guardar Cambios" : "Agregar Categoría"}
            onClose={() => setOpenDialogCategories(false)}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageCategoriesMateria;
