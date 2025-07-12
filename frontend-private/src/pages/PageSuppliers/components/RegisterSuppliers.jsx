import { useEffect } from "react";
import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import InputsInline from "../../../global/components/InputsInline";
import Input from "../../../global/components/Input";
import Button from "../../../global/components/Button";

const RegisterSuppliers = ({ onClose, defaultValues, onSubmit, methods }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset({ name: "", contact: "" });
    }
  }, [defaultValues, reset]);

  const isEditMode = !!defaultValues;

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4);
    }
    setPhone(value);
  };

  const handleDuiChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 9) value = value.slice(0, 9);
    if (value.length > 8) {
      value = value.slice(0, 8) + "-" + value.slice(8);
    }
    setDui(value);
  };

  return (
    <Form
      headerLabel={isEditMode ? "Editar Proveedor" : "Agregar Proveedor"}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    >
      <FormInputs>
        <InputsInline>
          <Input
            name="name"
            label="Proveedor"
            type="text"
            register={register}
            options={{ required: "El nombre es requerido" }}
            error={errors.name?.message}
          />
          <Input
            name="contact"
            label="Contacto"
            type="text"
            register={register}
            options={{
              required: "El contacto es requerido",
              pattern: {
                value: /^\d{4}-\d{4}$/,
                message: "El formato debe ser 0000-0000",
              },
            }}
            error={errors.contact?.message}
          />
        </InputsInline>
      </FormInputs>

      <FormButton>
        <Button
          buttonText={isEditMode ? "Guardar Cambios" : "Agregar Proveedor"}
          type="submit"
        />
      </FormButton>
    </Form>
  );
};

export default RegisterSuppliers;
