import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import Input from "../../../global/components/Input";
import Dropdown from "../../../global/components/Dropdown";
import Button from "../../../global/components/Button";

import useSuppliers from "../../PageSuppliers/hooks/useSuppliers";
import useCategories from "../../PageCategoriesMateria/hooks/useCategoriesMateria";
import useMaterials from "../hooks/useMaterials";

const RegisterMaterial = ({ onClose, defaultValues }) => {

  const methods = useForm({
    defaultValues
  });

  const { register, handleSubmit, errors, reset, createMaterial, updateMaterial, categories } = useMaterials(methods);
  const { suppliers } = useSuppliers(methods);

  const unidades = [
    { _id: "g", label: "Gramo" },
    { _id: "ml", label: "Mililitro" },
    { _id: "unit", label: "Unidad" },
  ];


  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        idRawMaterialCategory: defaultValues.idRawMaterialCategory?._id,
        idSupplier: defaultValues.idSupplier?._id,
      });
    } else {
      reset({});
    }
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    if (defaultValues?._id) {
      updateMaterial(defaultValues._id, data);
    } else {
      createMaterial(data);
    }
    onClose();
  };

  return (
    <Form headerLabel={defaultValues ? "Editar Materia Prima" : "Agregar Materia Prima"} onSubmit={handleSubmit(onSubmit)} onClose={onClose}>
      <FormInputs>
        <Input label="Nombre" name="name" register={register} errors={errors} />
        <div className="flex flex-col xl:flex-row justify-center items-center gap-4 w-full">
          <Dropdown
            options={categories || []}
            label="Categoría"
            name="idRawMaterialCategory"
            register={register}
            errors={errors}
          />
          <Dropdown
            options={unidades}
            label="Unidad"
            name="unit"
            register={register}
            errors={errors}
          />
          <Dropdown
            options={suppliers || []}
            label="Proveedor"
            name="idSupplier"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex gap-4 w-full">
          <Input label="Stock" type="number" name="currentStock" step={0.01} min={0} register={register} errors={errors} />
          <Input label="Stock Minimo" type="number" name="minimunStock" step={0.01} min={0.01} register={register} errors={errors} />
        </div>
        <Input label="Precio" type="number" name="currentPrice" step={0.01} min={0} register={register} errors={errors} />
      </FormInputs>
      <FormButton>
        <Button buttonText={defaultValues ? "Actualizar" : "Guardar"} type="submit" showIcon />
      </FormButton>
    </Form>
  );
};

export default RegisterMaterial;
