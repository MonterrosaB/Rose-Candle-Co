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
      {/* Tabla visible en md+ */}
      <div className="hidden md:block overflow-x-auto">
        <DataGrid
          title="Categorías de Materia Prima"
          columns={columns}
          rows={rows}
          primaryBtnText="Agregar Categoría"
          onClickPrimaryBtn={handleAdd}
          updateRow={handleEdit}
          deleteRow={handleDelete}
        />
      </div>

      {/* Cards para móviles */}
      <div className="md:hidden pt-13 space-y-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Categorías de Materia Prima</h2>
          <button
            onClick={handleAdd}
            className="bg-[#C2A878] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#a98c6a] transition"
          >
            Agregar
          </button>
        </div>

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
                Editar
              </button>
              <button
                onClick={() => handleDelete(category)}
                className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openDialogCategories && (
        <Dialog open={openDialogCategories} onClose={() => setOpenDialogCategories(false)}>
          <FormOneInput
            headerLabel={selectedCategory ? "Editar Categoría" : "Agregar Categoría"}
            onSubmit={handleSubmit(onSubmit)}
            name="name"
            label="Categoría"
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
