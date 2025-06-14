import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import FormOneInput from "../../global/components/FormOneInput";
import Dialog from "../../global/components/Dialog";

import useCollections from "./hooks/useCollections";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const PageCollection = () => {
    const [openDialogCollections, setOpenDialogCollections] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState(null);

    const methods = useForm({
        defaultValues: selectedCollection || {},
    });

    const { register, handleSubmit, errors, reset } = useCollections(methods);

    useEffect(() => {
        if (selectedCollection) {
            reset(selectedCollection);
        } else {
            reset({ collection: "" }); // limpiar al agregar
        }
    }, [selectedCollection, reset]);

    const columns = {
        Colección: "collection",
    };

    const rows = [
        {
            _id: "122",
            collection: "González",
        },
        {
            _id: "111",
            collection: "Carlos",
        },
    ];

    const handleAdd = () => {
        setSelectedCollection(null); // Form vacío (agregar)
        setOpenDialogCollections(true);
    };

    const handleEdit = (collection) => {
        setSelectedCollection(collection); // Form con datos (editar)
        setOpenDialogCollections(true);
    };

    const onSubmit = (data) => {
        console.log("Colección enviada:", data);
        setOpenDialogCollections(false);
    };

    return (
        <PrincipalDiv>
            <DataGrid
                title={"Colecciones"}
                columns={columns}
                rows={rows}
                primaryBtnText={"Agregar Colección"}
                onClickPrimaryBtn={handleAdd}
                updateRow={handleEdit} // <-- Lo importante: pasar handleEdit
            />
            {openDialogCollections && (
                <Dialog open={openDialogCollections} onClose={() => setOpenDialogCollections(false)}>
                    <FormOneInput
                        headerLabel={selectedCollection ? "Editar Colección" : "Agregar Colección"}
                        onSubmit={handleSubmit(onSubmit)}
                        name={"collection"}
                        label={"Colección"}
                        register={register}
                        onClose={() => setOpenDialogCollections(false)}
                        error={errors.collection?.message}
                        btnTxt={selectedCollection ? "Guardar Cambios" : "Agregar Colección"}
                    />
                </Dialog>
            )}
        </PrincipalDiv>
    );
};

export default PageCollection;
