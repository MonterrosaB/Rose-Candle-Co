import { useState, useEffect } from "react";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import FormOneInput from "../../global/components/FormOneInput";
import Dialog from "../../global/components/Dialog";
import { useForm } from "react-hook-form";
import useCollections from "./hooks/useCollections";

const PageCollections = () => {
  const [openDialogCollections, setOpenDialogCollections] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Inicializa react-hook-form con valores por defecto
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

  // Sincroniza formulario con la colección seleccionada para edición
  useEffect(() => {
    if (selectedCollection) {
      reset(selectedCollection);
    } else {
      reset({ name: "" });
    }
  }, [selectedCollection, reset]);

  // Abrir diálogo para agregar nueva colección
  const handleAdd = () => {
    setSelectedCollection(null);
    setOpenDialogCollections(true);
  };

  // Abrir diálogo para editar colección existente
  const handleEdit = (collection) => {
    setSelectedCollection(collection);
    setOpenDialogCollections(true);
  };

  // Confirmar y eliminar colección seleccionada
  const handleDelete = async (collection) => {
    if (confirm(`¿Eliminar la colección "${collection.name}"?`)) {
      await deleteCollection(collection._id);
    }
  };

  // Enviar formulario para crear o actualizar colección
  const onSubmit = async (data) => {
    if (selectedCollection) {
      await updateCollection(selectedCollection._id, data);
    } else {
      await createCollection(data);
    }
  };

  const columns = {
    Nombre: "name",
  };

  const rows = collections;

  return (
    <PrincipalDiv>
      <DataGrid
        title={"Colecciones"}
        columns={columns}
        rows={rows}
        primaryBtnText={"Agregar Colección"}
        onClickPrimaryBtn={handleAdd}
        updateRow={handleEdit}
        deleteRow={handleDelete}
      />

      {openDialogCollections && (
        <Dialog
          open={openDialogCollections}
          onClose={() => setOpenDialogCollections(false)}
        >
          <FormOneInput
            headerLabel={selectedCollection ? "Editar Colección" : "Agregar Colección"}
            onSubmit={handleSubmit(onSubmit)}
            name={"name"}
            label={"Colección"}
            register={register}
            onClose={() => setOpenDialogCollections(false)}
            error={errors.name?.message}
            btnTxt={selectedCollection ? "Guardar Cambios" : "Agregar Colección"}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageCollections;
