import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import FormOneInput from "../../global/components/FormOneInput";
import Dialog from "../../global/components/Dialog";

import useCategories from "./hooks/useCategories";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const PageCategories = () => {

    const [openDialogCategories, setOpenDialogCategories] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(null);

    const methods = useForm({
        defaultValues: selectedCategories || {},
    });

    const { register, handleSubmit, errors, reset } = useCategories(methods);

    useEffect(() => {
        if (selectedCategories) {
            reset(selectedCategories);
        } else {
            reset({ name: "" }); // limpiar al agregar
        }
    }, [selectedCategories, reset]);

    const columns = {
        Categorías: "name",
    };

    const rows = [
        {
            _id: '684c50e8aba6ea57507d5363',
            name: 'Vela',
            createdAt: '2025-06-13T16:25:12.561+00:00',
            updatedAt: '2025-06-13T16:25:12.561+00:00',
            __v: 0
        },
        {
            _id: '684c50e8aba6ea57507d5364',
            name: 'Incienso',
            createdAt: '2025-06-13T16:30:00.000+00:00',
            updatedAt: '2025-06-13T16:30:00.000+00:00',
            __v: 0
        }
    ];

    const handleAdd = () => {
        setSelectedCategories(null); // Form vacío (agregar)
        setOpenDialogCategories(true);
    };

    const handleEdit = (categorie) => {
        setSelectedCategories(categorie); // Form con datos (editar)
        setOpenDialogCategories(true);
    };

    const onSubmit = (data) => {
        console.log("Categoría enviada:", data);
        setOpenDialogCategories(false);
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
            />
            {openDialogCategories && (
                <Dialog open={openDialogCategories} onClose={() => setOpenDialogCategories(false)}>
                    <FormOneInput
                        headerLabel={selectedCategories ? "Editar Categoría" : "Agregar Categoría"}
                        onSubmit={handleSubmit(onSubmit)}
                        onClose={() => setOpenDialogCategories(false)}
                        name={"name"}
                        label={"Categoría"}
                        register={register}
                        error={errors.name?.message}
                        btnTxt={selectedCategories ? "Guardar Cambios" : "Agregar Categoría"}
                    />
                </Dialog>
            )}
        </PrincipalDiv>
    );
};

export default PageCategories;
