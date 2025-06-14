const CardWidgets = ({bgColor, textColor, icon, tittle, value, increment}) => {

    return (
        <>
                <div className="rounded-2xl shadow-2xl w-72 h-32 flex flex-col justify-between p-4"
                style={{backgroundColor: bgColor, color : textColor}}>
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-semibold tracking-wide">{tittle}</h2>                    
                        {icon}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold">{value}</span>
                        <span className="text-xl font-light">+{increment}</span>
                    </div>
                </div>

        </>
    )
}
export default CardWidgets;