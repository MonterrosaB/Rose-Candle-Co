import PrincipalDiv from "../../global/components/PrincipalDiv";
import TitleH1 from "../../global/components/TitleH1";
import DataGrid from "../../global/components/DataGrid";
import FormOneInput from "../../global/components/FormOneInput";
import Dialog from "../../global/components/Dialog";
import Swal from "sweetalert2";

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
    if (!category?._id) return;
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleDelete = async (category) => {
    if (!category?._id) return;

    const result = await Swal.fire({
      title: `¿Eliminar la categoría "${category.name}"?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteCategory(category._id);
      Swal.fire({
        title: "Eliminado",
        text: `La categoría "${category.name}" ha sido eliminada.`,
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
      <TitleH1 title={"categorias de productos"} />

      {/* Tabla solo visible en pantallas md en adelante */}
      <div className="hidden md:block">
        <DataGrid
          title="Categorías"
          columns={columns}
          rows={rows}
          primaryBtnText="Agregar Categoría"
          onClickPrimaryBtn={handleAdd}
          updateRow={handleEdit}
          deleteRow={handleDelete}
        />
      </div>

      {/* Vista tipo cards para móviles */}
      <div className="md:hidden pt-13 space-y-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Categorías</h2>
          <button
            onClick={handleAdd}
            className="bg-[#C2A878] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#a98c6a] transition"
          >
            Agregar
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
                Editar
              </button>
              <button
                onClick={() => handleDelete(cat)}
                className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openDialog && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <FormOneInput
            headerLabel={
              selectedCategory ? "Editar Categoría" : "Agregar Categoría"
            }
            onSubmit={handleSubmit(onSubmit)}
            name="name"
            label="Nombre de Categoría"
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
