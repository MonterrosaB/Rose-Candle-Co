const Widget = ({
    bgColor = "#fff",
    textColor = "#000",
    icon = null,
    title = "Título",
    value = "0",
    variant = "default",
}) => {

    // --- CLASES CONDICIONALES BASADAS EN EL VARIANTE ---

    const isCompact = variant === 'compact';

    // Clases principales del contenedor
    const containerClasses = isCompact
        ? "h-24 p-3" // Altura y padding más pequeños para compacto
        : "h-32 p-4"; // Clases originales para default

    // Clases para el tamaño del valor (el número grande)
    const valueClasses = isCompact
        ? "text-3xl font-bold" // Tamaño y peso más pequeños para compacto
        : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center";

    // Clases para el tamaño del título
    const titleClasses = isCompact
        ? "text-sm font-semibold text-gray-600" // Texto más pequeño y gris, si el textColor no lo sobrescribe
        : "text-sm sm:text-md md:text-lg lg:text-xl tracking-wide";

    return (
        <div
            className={`rounded-xl shadow-md w-full flex flex-col justify-center gap-1 transition duration-200 ${containerClasses}`}
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            {/* Cabecera (Título e Ícono) */}
            <div className="flex justify-between items-start">
                <h2 className={titleClasses}>
                    {title}
                </h2>
                {/* Ícono más discreto en el modo compacto */}
                {icon &&
                    <div className={isCompact ? "text-xl opacity-70" : "text-2xl sm:text-3xl md:text-4xl"}>
                        {icon}
                    </div>
                }
            </div>

            {/* Valor */}
            <div className="flex flex-col">
                <span className={valueClasses}>
                    {value || 0}
                </span>
            </div>
        </div>
    );
};

export default Widget;