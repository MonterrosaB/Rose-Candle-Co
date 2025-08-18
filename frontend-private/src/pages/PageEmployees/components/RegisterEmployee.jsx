import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import InputsInline from "../../../global/components/InputsInline";
import Input from "../../../global/components/Input";
import Button from "../../../global/components/Button";
import Dropdown from "../../../global/components/Dropdown";
import useDataEmployee from "../hooks/useEmployees";  
import useDropDown from "../hooks/useDropDowns";

import { useForm } from "react-hook-form";

const RegisterEmployee = ({ onClose, defaultValues }) => {

  const methods = useForm({
    defaultValues: defaultValues || {}, // Prellenar si hay datos
  });

  const {
    register,
    handleSubmit,
    errors,
    loading,
    saveEmployeeForm,
    editEmployee
  } = useDataEmployee(methods);

  const {
    opcionesEstado, opcionesRol
  } = useDropDown(methods);


  const onSubmit = async (data) => {
    try {
      if (defaultValues) {
        await editEmployee(defaultValues._id, data);
      } else {
        await saveEmployeeForm(data);
      }

      onClose(); // cerrar y limpiar solo si todo sale bien
    } catch (error) {
      console.error("Error al guardar el empleado:", error);
      // Aquí podrías usar toast.error o similar
    }
  };


  return (
    <Form
      headerLabel={defaultValues ? "Editar Empleado" : "Agregar Empleado"}
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
            options={{
              required: "El DUI es requerido",
              pattern: {
                value: /^[0-9]{8}-[0-9]{1}$/,
                message: "El DUI debe tener el formato 12345678-9",
              },
            }}
          />

          {defaultValues && (
            <Dropdown
              name="isActive"
              label="Estado"
              register={register}
              error={errors.isActive?.message}
              hideIcon={true}
              options={opcionesEstado}
            />
          )}
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

          <Dropdown
            name={"role"}
            label={"Rol"}
            register={register}
            errors={errors}
            hideIcon={true}
            options={opcionesRol}
          />
        </InputsInline>


        {!defaultValues && (
          <>
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

            <Input
              name="confirmPassword"
              label="Confirmar Contraseña"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
              options={{
                validate: (value) =>
                  value === methods.getValues("password") ||
                  "Las contraseñas no coinciden",
              }}
            />
          </>
        )}




      </FormInputs>

      <FormButton>
        <Button
          buttonText={defaultValues ? "Guardar Cambios" : "Agregar Empleado"}
          type="submit"
          disabled={loading}
        />
      </FormButton>
    </Form>
  );
};

export default RegisterEmployee;