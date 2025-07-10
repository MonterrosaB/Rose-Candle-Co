import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import FormOneInput from "../../global/components/FormOneInput";
import Dialog from "../../global/components/Dialog";

import useCategories from "./hooks/useCategories";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const PageCategories = () => {
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
  } = useCategories(methods);

  useEffect(() => {
    if (selectedCategory) {
      reset(selectedCategory);
    } else {
      reset({ name: "" });
    }
  }, [selectedCategory, reset]);

  const columns = {
    Nombre: "name",
  };

  const rows = categories;

  const handleAdd = () => {
    setSelectedCategory(null);
    setOpenDialog(true);
  };

  const handleEdit = (category) => {
    if (!category || !category._id) {
      console.error("Categoría inválida para editar", category);
      return;
    }
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleDelete = async (category) => {
    if (!category || !category._id) {
      console.error("Categoría inválida para eliminar", category);
      return;
    }
    const confirmDelete = confirm(`¿Eliminar la categoría "${category.name}"?`);
    if (confirmDelete) {
      await deleteCategory(category._id);
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
      <DataGrid
        title={"Categorías"}
        columns={columns}
        rows={rows}
        primaryBtnText={"Agregar Categoría"}
        onClickPrimaryBtn={handleAdd}
        updateRow={handleEdit}
        deleteRow={handleDelete } 
      />

      {openDialog && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <FormOneInput
            headerLabel={selectedCategory ? "Editar Categoría" : "Agregar Categoría"}
            onSubmit={handleSubmit(onSubmit)}
            name={"name"}
            label={"Nombre de Categoría"}
            register={register}
            onClose={() => setOpenDialog(false)}
            error={errors.name?.message}
            btnTxt={selectedCategory ? "Guardar Cambios" : "Agregar Categoría"}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageCategories;
