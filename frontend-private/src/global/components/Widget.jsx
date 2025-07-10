const Widget = ({ bgColor, textColor, icon, tittle, value }) => {

    return (
        <>
            <div className="rounded-2xl shadow-xl w-72 h-32 flex flex-col justify-center p-4 gap-2"
                style={{ backgroundColor: bgColor, color: textColor }}>
                <div className="flex justify-between items-start">
                    <h2 className="text-md tracking-wide">{tittle}</h2>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-5xl font-medium text-center">{value}</span>
                </div>
            </div>

        </>
    )
}
export default Widget;