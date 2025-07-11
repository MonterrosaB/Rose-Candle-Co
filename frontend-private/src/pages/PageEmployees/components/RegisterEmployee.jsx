import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import InputsInline from "../../../global/components/InputsInline";
import Input from "../../../global/components/Input";
import Button from "../../../global/components/Button";
import Dropdown from "../../../global/components/Dropdown";

import useEmployees from "../hooks/useEmployees";

const RegisterEmployee = ({ onClose, defaultValues }) => {
  const {
    handleSubmit: createEmployee,
    handleUpdate,
    loading,
  } = useEmployees();

  const isEditMode = !!defaultValues;

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  });

  useEffect(() => {
    if (defaultValues) {
      const updatedDefaults = {
        ...defaultValues,
        isActive: defaultValues.isActive === "true" ? true : false, 
      };
      reset(updatedDefaults);
    }
  }, [defaultValues, reset]);

  const opcionesEstado = [
    { _id: "true", label: "Activo" },
    { _id: "false", label: "Inactivo" },
  ];

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    if (value.length > 8) value = value.slice(0, 8); 
    if (value.length > 4) value = value.slice(0, 4) + "-" + value.slice(4); 
    setValue("phone", value);
  };

  const handleDuiChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    if (value.length > 9) value = value.slice(0, 9); 
    if (value.length > 8) value = value.slice(0, 8) + "-" + value.slice(8); 
    setValue("dui", value);
  };

  const validatePasswords = (data) => {
    if (data.password !== data.confirmPassword) {
      return "Las contraseñas no coinciden";
    }
  };

  const onSubmit = async (data) => {
    console.log("Formulario enviado con datos:", data);

    const passwordError = validatePasswords(data);
    if (passwordError) {
      console.log("Error en las contraseñas:", passwordError);
      setValue("confirmPassword", passwordError);
      return;
    }

    // Asignar valores predeterminados
    data.isActive = data.isActive === "false" ? false : true;
    data.role = data.role || "employee"; // el rol es "employee"

    console.log("Enviando datos a crear o actualizar:", data);

    const success = isEditMode
      ? await handleUpdate(data)
      : await createEmployee(data);

    console.log("Resultado del envío:", success);

    if (success) {
      onClose();
    } else {
      console.log("Hubo un problema con el envío de datos");
    }
  };

  return (
    <Form
      headerLabel={isEditMode ? "Editar Empleado" : "Agregar Empleado"}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    >
      <FormInputs>
        <InputsInline>
          <Input
            name="name"
            label="Nombres"
            type="text"
            register={register}
            error={errors.name?.message}
            options={{
              required: "El nombre es requerido",
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, 
                message: "El nombre solo puede contener letras",
              },
            }}
          />
          <Input
            name="surnames"
            label="Apellidos"
            type="text"
            register={register}
            error={errors.surnames?.message}
            options={{
              required: "El apellido es requerido",
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,  
                message: "El apellido solo puede contener letras",
              },
            }}
          />
        </InputsInline>

        <Input
          name="email"
          label="Correo"
          type="email"
          register={register}
          error={errors.email?.message}
          options={{
            required: "El correo es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Ingrese un correo electrónico válido",
            },
          }}
        />

        <InputsInline>
          <Input
            name="phone"
            label="Número de teléfono"
            type="text"
            register={register}
            error={errors.phone?.message}
            onChange={handlePhoneChange}
            options={{
              required: "El teléfono es requerido",
              pattern: {
                value: /^[0-9]{4}-[0-9]{4}$/, 
                message: "El teléfono debe tener el formato 1234-5678",
              },
            }}
          />
          <Input
            name="dui"
            label="DUI"
            type="text"
            register={register}
            error={errors.dui?.message}
            onChange={handleDuiChange}
            options={{
              required: "El DUI es requerido",
              pattern: {
                value: /^[0-9]{8}-[0-9]{1}$/, 
                message: "El DUI debe tener el formato 12345678-9",
              },
            }}
          />
        </InputsInline>

        <InputsInline>
          <Input
            name="user"
            label="Usuario"
            type="text"
            register={register}
            error={errors.user?.message}
            options={{
              required: "El usuario es requerido",
              pattern: {
                value: /^[a-zA-Z0-9_]*$/,  
                message: "El usuario solo puede contener letras, números y guion bajo",
              },
            }}
          />

          {!isEditMode && (
            <Input
              name="password"
              label="Contraseña"
              type="password"
              register={register}
              error={errors.password?.message}
              options={{
                required: "La contraseña es requerida",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              }}
            />
          )}

          {!isEditMode && (
            <Input
              name="confirmPassword"
              label="Confirmar Contraseña"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
            />
          )}

          {isEditMode && (
            <Dropdown
              name="isActive"
              label="Estado"
              register={register}
              error={errors.isActive?.message}
              hideIcon={true}
              options={opcionesEstado}
              setValue={setValue}
            />
          )}
        </InputsInline>
      </FormInputs>

      <FormButton>
        <Button
          buttonText={isEditMode ? "Guardar Cambios" : "Agregar Empleado"}
          type="submit"
          disabled={loading}
        />
      </FormButton>
    </Form>
  );
};

export default RegisterEmployee;
