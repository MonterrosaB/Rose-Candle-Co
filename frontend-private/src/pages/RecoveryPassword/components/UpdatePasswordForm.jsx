// Formulario para actualizar la contraseña del usuario
const UpdatePasswordForm = ({
  register, // Función de react-hook-form para registrar campos
  handleSubmit, // Función para manejar el submit del formulario
  handleUpdate, // Función que se ejecuta al enviar el formulario
  message, // Mensaje de confirmación o error que viene del backend
  watch, // Función de react-hook-form para observar valores de inputs
  formState: { errors }, // Objeto que contiene errores de validación
}) => {
  // Observa el valor actual del campo "newPassword"
  const newPassword = watch("newPassword");

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <h2 className="text-[#7D7954] text-2xl font-semibold mb-4">
        Nueva contraseña
      </h2>

      {/* Campo para ingresar la nueva contraseña */}
      <input
        type="password"
        placeholder="Nueva contraseña"
        {...register("newPassword", {
          required: "Este campo es obligatorio",
          minLength: {
            value: 8,
            message: "Debe tener al menos 8 caracteres",
          },
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).+$/,
            message:
              "Debe incluir una mayúscula, un número y un signo especial",
          },
        })}
        className="w-full p-3 border border-[#D3CCBE] rounded-lg mb-2"
      />
      {/* Mensaje de error para nueva contraseña */}
      {errors.newPassword && (
        <p className="text-sm text-red-500 mb-2">
          {errors.newPassword.message}
        </p>
      )}

      {/* Campo para confirmar la contraseña */}
      <input
        type="password"
        placeholder="Confirmar contraseña"
        {...register("confirmPassword", {
          required: "Este campo es obligatorio",
          validate: (value) =>
            value === newPassword || "Las contraseñas no coinciden",
        })}
        className="w-full p-3 border border-[#D3CCBE] rounded-lg mb-2"
      />
      {/* Mensaje de error para confirmación */}
      {errors.confirmPassword && (
        <p className="text-sm text-red-500 mb-2">
          {errors.confirmPassword.message}
        </p>
      )}

      {/* Botón para enviar el formulario */}
      <button
        type="submit"
        className="py-2 px-6 mt-3 border border-[#C2A878] rounded-lg text-[#C2A878] font-medium cursor-pointer transition duration-200 hover:bg-[#C2A878] hover:text-[#F7F5EE]"
      >
        Actualizar
      </button>

      {/* Mensaje general informativo */}
      {message && <p className="text-sm text-[#86918C] mt-3">{message}</p>}
    </form>
  );
};

export default UpdatePasswordForm;
