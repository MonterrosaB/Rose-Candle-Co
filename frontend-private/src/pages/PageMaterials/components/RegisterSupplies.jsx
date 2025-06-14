import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import InputsInline from "../../../global/components/InputsInline";

import Input from "../../../global/components/Input";
import Dropdown from "../../../global/components/Dropdown"
import Button from "../../../global/components/Button";

import { useForm } from "react-hook-form"
import useMaterials from "../hooks/useMaterials";

const RegisterSupplies = ({ onClose }) => {

    const methods = useForm();
    const { register, handleSubmit, errors } = useMaterials(methods);

    const opcionesMateria = [
        { _id: 'M', label: 'Cera' },
        { _id: 'F', label: 'Mechas' }
    ];

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form headerLabel={"Agregar Suministros"} onSubmit={handleSubmit(onSubmit)} onClose={onClose}>
            <FormInputs>
                <Dropdown
                    options={opcionesMateria}
                    label={"Materia Prima"}
                    name={"rawMateria"}
                    register={register}
                    errors={errors}
                    hideIcon={true}
                />
                <div className="flex justify-center items-center gap-4 w-full">
                    <Input
                        label={"Stock Agregado"}
                        type="number"
                        name={"stockAdded"}
                        register={register}
                        errors={errors}
                    />
                    <Input
                        label={"Precio de compra"}
                        type="number"
                        name={"buyPrice"}
                        register={register}
                        errors={errors}
                    />
                </div>
            </FormInputs>
            <FormButton>
                <Button
                    buttonText={"Agregar Suministros"}
                    type={"submit"}
                    showIcon={true}
                />
            </FormButton>
        </Form>
    )
}
export default RegisterSupplies;