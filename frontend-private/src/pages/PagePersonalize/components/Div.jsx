// Componente para un contenedor con título, descripción e icono
const Div = ({
    bgColor = "#ffffff",
    textColor = "#1f2937",
    title,
    description,
    children,
    className
}) => {
    return (
        <div
            className={`
        rounded-2xl shadow-lg p-6 flex flex-col
        ${className || ""}
      `}
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            <div className="flex flex-col mb-4">
                <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
                {description && (
                    <p className="text-sm md:text-base font-light text-gray-600 mt-1">
                        {description}
                    </p>
                )}
            </div>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default Div;