const Widget = ({
    bgColor = "#fff",
    textColor = "#000",
    icon = null,
    title = "Título",
    value = "0",
}) => {
    return (
        <div
            className="rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-32 flex flex-col justify-center p-4 gap-2"
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            <div className="flex justify-between items-center">
                <h2 className="text-sm sm:text-md md:text-lg lg:text-xl tracking-wide">
                    {title}
                </h2>
                {icon && <div className="text-2xl sm:text-3xl md:text-4xl">{icon}</div>}
            </div>
            <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center">
                    {value}
                </span>
            </div>
        </div>
    );
};

export default Widget;
