import { useEffect } from "react";
import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import InputsInline from "../../../global/components/InputsInline";

import Input from "../../../global/components/Input";
import Button from "../../../global/components/Button";
import Dropdown from "../../../global/components/Dropdown";

import { useForm } from "react-hook-form";
import useEmployees from "../hooks/useEmployees";

const RegisterEmployee = ({ onClose, defaultValues }) => {
    const methods = useForm({
        defaultValues: defaultValues || {}, // Prellenar si hay datos
    });
    const { register, handleSubmit, errors, reset } = useEmployees(methods);

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

    const opcionesEstado = [
        { _id: true, label: "Activo" },
        { _id: false, label: "Inactivo" },
    ];

    const isEditMode = !!defaultValues;

    return (
        <Form
            headerLabel={isEditMode ? "Editar Empleado" : "Agregar Empleado"}
            onSubmit={handleSubmit(onSubmit)}
            onClose={onClose}
        >
            <FormInputs>
                <InputsInline>
                    <Input
                        name={"name"}
                        label={"Nombres"}
                        type="text"
                        register={register}
                        error={errors.name?.message}
                    />
                    <Input
                        name={"surnames"}
                        label={"Apellidos"}
                        type="text"
                        register={register}
                        error={errors.surnames?.message}
                    />
                </InputsInline>
                <Input
                    name={"email"}
                    label={"Correo"}
                    type="email"
                    register={register}
                    error={errors.email?.message}
                />
                <InputsInline>
                    <Input
                        name={"phone"}
                        label={"Número de teléfono"}
                        type="text"
                        register={register}
                        error={errors.phone?.message}
                    />
                    <Input
                        name={"dui"}
                        label={"DUI"}
                        type="text"
                        register={register}
                        error={errors.dui?.message}
                    />
                </InputsInline>
                <InputsInline>
                    <Input
                        name={"user"}
                        label={"Usuario"}
                        type="text"
                        register={register}
                        error={errors.user?.message}
                    />

                    {!isEditMode && (
                        <Input
                            name={"password"}
                            label={"Contraseña"}
                            type="text"
                            register={register}
                            error={errors.password?.message}
                        />
                    )}

                    {isEditMode && (
                        <Dropdown
                            name={"isActive"}
                            label={"Estado"}
                            register={register}
                            errors={errors}
                            hideIcon={true}
                            options={opcionesEstado}
                        />
                    )}
                </InputsInline>
            </FormInputs>

            <FormButton>
                <Button
                    buttonText={isEditMode ? "Guardar Cambios" : "Agregar Empleado"}
                    type={"submit"}
                />
            </FormButton>
        </Form>
    );
};

export default RegisterEmployee;
