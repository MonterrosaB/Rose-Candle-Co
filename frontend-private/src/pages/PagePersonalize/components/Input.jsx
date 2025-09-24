// Componente para los campos de entrada, incluye label
const Input = ({ label, type = "text", placeholder, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 outline-none"
        {...props}
      />
    </div>
  );
};

export default Input;