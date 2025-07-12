// CardWidgets.jsx actualizado
const CardWidgets = ({ bgColor, textColor, icon, tittle, value, increment, className }) => {
    return (
        <div
            className={`
              rounded-2xl shadow-2xl flex flex-col justify-between p-4
              w-full max-w-[280px] md:max-w-[420px]
              min-h-[140px] md:min-h-[180px]
              ${className || ""}
            `}
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            <div className="flex justify-between items-start">
                <h2 className="text-xl md:text-2xl font-semibold tracking-wide">{tittle}</h2>
                <div>{icon}</div>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold">{value}</span>
                <span className="text-lg md:text-xl font-light">+{increment}</span>
            </div>
        </div>
    )
}

export default CardWidgets;
