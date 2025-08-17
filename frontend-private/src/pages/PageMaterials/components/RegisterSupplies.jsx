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
  const { createMaterial, register, handleSubmit, errors } = useSupplies(methods);

  const [categories, setCategories] = useState([]);

  // 🧠 useEffect con fetch para traer categorías reales
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/rawMaterials");
        const data = await res.json();
        // Formatea para el dropdown
        const formatted = data.map(cat => ({
          _id: cat._id,
          label: cat.name
        }));
        setCategories(formatted);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = (data) => {
    createMaterial(data)
  };

  return (
    <Form headerLabel={"Agregar Suministros"} onSubmit={handleSubmit(onSubmit)} onClose={onClose}>
      <FormInputs>
        <Dropdown
          options={categories}
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
          />
          <Input
            label={"Precio de compra"}
            type="number"
            name={"unitPrice"}
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
  );
};

export default RegisterSupplies;
