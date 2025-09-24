// Componente para los botones
const variants = {
  primary: "bg-pink-500 hover:bg-pink-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white",
};

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-xl transition cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
