import { useEffect } from "react";
import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import InputsInline from "../../../global/components/InputsInline";

import Input from "../../../global/components/Input";
import Button from "../../../global/components/Button";
import Dropdown from "../../../global/components/Dropdown";

import { useForm } from "react-hook-form";
import useSuppliers from "../hooks/useSuppliers";

const RegisterEmployee = ({ onClose, defaultValues }) => {
    const methods = useForm({
        defaultValues: defaultValues || {}, // Prellenar si hay datos
    });
    const { register, handleSubmit, errors, reset } = useSuppliers(methods);

    // Para actualizar defaultValues cuando se edita
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const onSubmit = (data) => {
        console.log(data);
        alert("Verificar la consola");
    };

    const isEditMode = !!defaultValues;

    return (
        <Form
            headerLabel={isEditMode ? "Editar Proveedor" : "Agregar Proveedor"}
            onSubmit={handleSubmit(onSubmit)}
            onClose={onClose}
        >
            <FormInputs>
                <InputsInline>
                    <Input
                        name={"name"}
                        label={"Proveedor"}
                        type="text"
                        register={register}
                        error={errors.name?.message}
                    />
                    <Input
                        name={"contact"}
                        label={"Contacto"}
                        type="text"
                        register={register}
                        error={errors.contact?.message}
                    />
                </InputsInline>
            </FormInputs>

            <FormButton>
                <Button
                    buttonText={isEditMode ? "Guardar Cambios" : "Agregar Proveedor"}
                    type={"submit"}
                />
            </FormButton>
        </Form>
    );
};

export default RegisterEmployee;
