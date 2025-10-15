import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Componentes globales
import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import InputsInline from "../../../global/components/InputsInline";
import Input from "../../../global/components/Input";
import Button from "../../../global/components/Button";

const RegisterSuppliers = ({ onClose, defaultValues, onSubmit, methods }) => {
  const { t } = useTranslation("suppliers"); // Namespace: suppliers

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = methods;

  // Al montar o actualizar el modal, establecer valores por defecto
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset();
    }
  }, [defaultValues, reset]);

  const isEditMode = !!defaultValues;

  // En RegisterOrder.jsx

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/[^\d]/g, '');

    let formattedValue = '';
    if (numericValue.length > 4) {
      formattedValue = numericValue.slice(0, 4) + '-' + numericValue.slice(4, 8);
    } else {
      formattedValue = numericValue;
    }

    // Limitar a 9 caracteres (8 dígitos + guion)
    const finalValue = formattedValue.slice(0, 9);

    // Usar setValue de React Hook Form para actualizar el valor con el formato
    setValue('phoneNumber', finalValue, { shouldValidate: true });

    // OJO: Es crucial llamar a setValue aquí porque el valor
    // de entrada no se actualizaría automáticamente con el guion.
  };

  return (
    <Form
      headerLabel={
        isEditMode ? t("form.edit_title") : t("form.add_title")
      }
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    >
      <FormInputs>
        <InputsInline>
          <Input
            name="name"
            label={t("name")}
            type="text"
            register={register}
            options={{ required: t("form.validation.name_required") }}
            error={errors.name?.message}
          />
          <Input
            name="phoneNumber"
            label={t("phone_number")}
            type="tel"
            register={register}
            options={{
              required: t("form.validation.contact_required"),
              pattern: {
                value: /^\d{4}-\d{4}$/, // Valida el formato final
                message: t("form.validation.contact_format"),
              },
            }}
            // Pasa tu manejador de cambio personalizado a la nueva prop
            onChange={handlePhoneChange}
            error={errors.phoneNumber?.message}
          />
        </InputsInline>
        <Input
          name="email"
          label={t("email")}
          type="text"
          register={register}
          options={{
            required: t("form.validation.contact_required"),
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: t("form.validation.contact_format"),
            },
          }}
          error={errors.email?.message}
        />
      </FormInputs>

      <FormButton>
        <Button
          buttonText={
            isEditMode ? t("form.submit_edit") : t("form.submit_add")
          }
          type="submit"
        />
      </FormButton>
    </Form>
  );
};

export default RegisterSuppliers;
