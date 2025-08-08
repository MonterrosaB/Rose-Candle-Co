// Formulario para solicitar el envío del código de recuperación al correo
const RequestCodeForm = ({
  register, // Función de react-hook-form para registrar el input
  handleSubmit, // Función para manejar el submit con validación
  handleRequest, // Función que se ejecuta al enviar el formulario
  message, // Mensaje de retroalimentación para el usuario
}) => (
  <form onSubmit={handleSubmit(handleRequest)}>
    <h2 className="text-[#7D7954] text-2xl font-semibold mb-4">
      Recuperar contraseña
    </h2>

    {/* Campo de correo electrónico */}
    <input
      type="email"
      placeholder="Correo electrónico"
      {...register("email", { required: true })} // Validación requerida
      className="w-full p-3 border border-[#D3CCBE] rounded-lg mb-4"
    />

    {/* Botón para enviar el código */}
    <button
      type="submit"
      className="py-2 px-6 mt-5 border border-[#C2A878] rounded-lg text-[#C2A878] font-medium cursor-pointer transition duration-200 hover:bg-[#C2A878] hover:text-[#F7F5EE]"
    >
      Enviar código
    </button>

    {/* Mensaje informativo o de error */}
    {message && <p className="text-sm text-[#86918C] mt-3">{message}</p>}
  </form>
);

export default RequestCodeForm;
