import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import Input from "../../../global/components/Input";
import Dropdown from "../../../global/components/Dropdown";
import Button from "../../../global/components/Button";

import useSuppliers from "../../PageSuppliers/hooks/useSuppliers";
import useCategories from "../../PageCategories/hooks/useCategories";
import useMaterials from "../hooks/useMaterials";

const RegisterMaterial = ({ onClose, defaultValues }) => {

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      idRawMaterialCategory:
        defaultValues?.idRawMaterialCategory?._id || defaultValues?.idRawMaterialCategory,
      idSupplier:
        defaultValues?.idSupplier?._id || defaultValues?.idSupplier,
      unit: defaultValues?.unit,
    },
  });

  const { register, handleSubmit, errors, reset, createMaterial, updateMaterial } = useMaterials(methods);
  const { suppliers } = useSuppliers(methods);
  const { categories } = useCategories(methods);

  const unidades = [
    { _id: "kg", label: "Kilogramo" },
    { _id: "g", label: "Gramo" },
    { _id: "l", label: "Litro" },
    { _id: "ml", label: "Mililitro" },
    { _id: "piece", label: "Pieza" },
  ];

  // ✅ Al montar o al cambiar defaultValues
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
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
        <div className="flex gap-4 w-full">
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
          <Input label="Stock" type="number" name="currentStock" register={register} errors={errors} />
          <Input label="Precio" type="number" name="currentPrice" register={register} errors={errors} />
        </div>
      </FormInputs>
      <FormButton>
        <Button buttonText={defaultValues ? "Actualizar" : "Guardar"} type="submit" showIcon />
      </FormButton>
    </Form>
  );
};

export default RegisterMaterial;
