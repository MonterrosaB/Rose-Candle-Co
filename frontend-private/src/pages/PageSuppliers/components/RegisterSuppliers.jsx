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
  } = methods;

  // Al montar o actualizar el modal, establecer valores por defecto
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset({ name: "", contact: "" });
    }
  }, [defaultValues, reset]);

  const isEditMode = !!defaultValues;

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
            name="contact"
            label={t("contact")}
            type="text"
            register={register}
            options={{
              required: t("form.validation.contact_required"),
              pattern: {
                value: /^\d{4}-\d{4}$/,
                message: t("form.validation.contact_format"),
              },
            }}
            error={errors.contact?.message}
          />
        </InputsInline>
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
