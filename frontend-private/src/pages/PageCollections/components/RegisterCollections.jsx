import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Componentes globales
import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import InputsInline from "../../../global/components/InputsInline";
import Textarea from "../../../global/components/TextArea";
import Input from "../../../global/components/Input";
import Button from "../../../global/components/Button";

const RegisterCollections = ({ onClose, defaultValues, onSubmit, methods }) => {

  const { t } = useTranslation("collections"); // Namespace: collection

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
      reset({ name: "", description: "" });
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
        </InputsInline>
        <Textarea
            label={t("description")}
            name="description"
          register={register}
          errors={errors}
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

export default RegisterCollections;
