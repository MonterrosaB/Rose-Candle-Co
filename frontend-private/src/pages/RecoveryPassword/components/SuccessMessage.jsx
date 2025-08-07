// Mensaje de éxito que aparece al actualizar la contraseña
import { useNavigate } from "react-router-dom";

const SuccessMessage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-[#7D7954] text-2xl font-semibold mb-4">
        ¡Contraseña actualizada!
      </h2>
      <p className="text-[#86918C]">
        Ya puedes iniciar sesión con tu nueva contraseña.
      </p>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="py-2 px-6 mt-5 border border-[#C2A878] rounded-lg text-[#C2A878] font-medium cursor-pointer transition duration-200 hover:bg-[#C2A878] hover:text-[#F7F5EE]"
      >
        Iniciar sesión
      </button>
    </div>
  );
};

export default SuccessMessage;
