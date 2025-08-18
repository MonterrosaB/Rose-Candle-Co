import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import Input from "../../../global/components/Input";
import Dropdown from "../../../global/components/Dropdown";
import Button from "../../../global/components/Button";
import useSupplies from "../hooks/useSupplies";

const RegisterSupplies = ({ onClose }) => {

  const methods = useForm();
  const { createMaterial, materials, register, handleSubmit, errors } = useSupplies(methods);


  const onSubmit = (data) => {
    createMaterial(data)
    onClose();
  };

  return (
    <Form headerLabel={"Agregar Suministros"} onSubmit={handleSubmit(onSubmit)} onClose={onClose}>
      <FormInputs>
        <Dropdown
          options={materials}
          label={"Materia Prima"}
          name={"idMaterial"}
          register={register}
          errors={errors}
          hideIcon={true}
        />
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
          <Input
            label={"Stock Agregado"}
            type="number"
            name={"amount"}
            register={register}
            errors={errors}
            step={0.01} min={0.01}
          />
          <Input
            label={"Precio de compra"}
            type="number"
            name={"unitPrice"}
            register={register}
            errors={errors}
            step={0.01} min={0.01}
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
  );
};

export default RegisterSupplies;
