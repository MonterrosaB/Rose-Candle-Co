const CardWidgets = ({ bgColor, textColor, tittle, value }) => {

    return (
        <>
            <div className="rounded-2xl shadow-2xl w-80 h-64 flex flex-col gap-6 p-4 min-w-80 items-center"
                style={{ backgroundColor: bgColor, color: textColor }}>
                <h2 className="text-xl font-medium tracking-wide text-center">{tittle}</h2>
                <span className="text-7xl font-bold">{value}</span>
            </div>


        </>
    )
}
export default CardWidgets;