import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import FormOneInput from "../../global/components/FormOneInput";
import Dialog from "../../global/components/Dialog";

import useCategoriesMateria from "./hooks/useCategoriesMateria";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const PageCategoriesMateria = () => {

    const [openDialogCategories, setOpenDialogCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // singular por claridad

    const methods = useForm({
        defaultValues: selectedCategory || {},
    });

    const { register, handleSubmit, errors, reset } = useCategoriesMateria(methods);

    useEffect(() => {
        if (selectedCategory) {
            reset(selectedCategory); // rellenar datos para editar
        } else {
            reset({ name: "" }); // limpiar para agregar
        }
    }, [selectedCategory, reset]);

    const columns = {
        Categoría: "name",
    };

    const rows = [
        {
            _id: "684c50e8aba6ea57507d5363",
            name: "Cera",
            createdAt: "2025-06-13T16:25:12.561+00:00",
            updatedAt: "2025-06-13T16:25:12.561+00:00",
        },
        {
            _id: "684c50e8aba6ea57507d5364",
            name: "Fragancia natural",
            createdAt: "2025-06-13T16:30:00.000+00:00",
            updatedAt: "2025-06-13T16:30:00.000+00:00",
        },
    ];

    const handleAdd = () => {
        setSelectedCategory(null);
        setOpenDialogCategories(true);
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setOpenDialogCategories(true);
    };

    const onSubmit = (data) => {
        console.log(selectedCategory ? "Editando categoría:" : "Agregando categoría:", data);
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
