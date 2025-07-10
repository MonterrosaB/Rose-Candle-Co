import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import Input from "../../../global/components/Input";
import Dropdown from "../../../global/components/Dropdown";
import Button from "../../../global/components/Button";

const RegisterSupplies = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);

  // 🧠 useEffect con fetch para traer categorías reales
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/rawMaterialCategories");
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
    console.log("Formulario enviado:", data);
  };

  return (
    <Form headerLabel={"Agregar Suministros"} onSubmit={handleSubmit(onSubmit)} onClose={onClose}>
      <FormInputs>
        <Dropdown
          options={categories}
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
  );
};

export default RegisterSupplies;
