import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";

import Input from "../../../global/components/Input";
import Button from "../../../global/components/Button";
import Dropdown from "../../../global/components/Dropdown"

import { useForm } from "react-hook-form"
import useMaterials from "../hooks/useMaterials";

const RegisterMaterial = ({ onClose }) => {

  const methods = useForm();
  const { register, handleSubmit, errors } = useMaterials(methods);

  {/*
             setCategories(catData.map(cat => ({ _id: cat._id, label: cat.name })));
              */ }

  const opcionesProveedor = [
    { _id: 'M', label: 'MacCompany' },
    { _id: 'F', label: 'Intel' }
  ];

  const opcionesUnidad = [
    { _id: 'M', label: 'Gramo' },
    { _id: 'M', label: 'Onza' },
    { _id: 'M', label: 'Ml' },
    { _id: 'F', label: 'Libra' }
  ];

  const opcionesCategoria = [
    { _id: 'M', label: 'Cera' },
    { _id: 'F', label: 'Mechas' }
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form headerLabel={"Agregar Nuevo Material"} onSubmit={handleSubmit(onSubmit)} onClose={onClose}>
      <FormInputs>
        <Input
          label={"Materia Prima"}
          type="text"
          name={"name"}
          register={register}
          errors={errors}
        />
        <div className="flex justify-center items-center gap-4 w-full">
          <Dropdown
            options={opcionesCategoria}
            label={"Categoría"}
            name={"categoria"}
            register={register}
            errors={errors}
          />
          <Dropdown
            options={opcionesUnidad}
            label={"Unidad"}
            name={"unidad"}
            register={register}
            errors={errors}
          />
          <Dropdown
            options={opcionesProveedor}
            label={"Proveedor"}
            name={"proveedor"}
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex justify-center items-center gap-4 w-full">
          <Input
            label={"Stock Inicial"}
            type="number"
            name={"initialStock"}
            register={register}
            errors={errors}
          />
          <Input
            label={"Precio de compra"}
            type="number"
            name={"currentPrice"}
            register={register}
            errors={errors}
          />
        </div>
      </FormInputs>
      <FormButton>
        <Button
          buttonText={"Agregar Materia Prima"}
          type={"submit"}
          showIcon={true}
        />
      </FormButton>
    </Form>
  )
}
export default RegisterMaterial;