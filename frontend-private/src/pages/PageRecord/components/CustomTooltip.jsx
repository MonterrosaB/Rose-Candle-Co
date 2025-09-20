const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border p-2 rounded shadow">
                <p><strong>Fecha:</strong> {new Date(label).toLocaleString("es-ES")}</p>
                {payload.map((p, i) => (
                    <p key={i}>
                        <strong>{p.name}:</strong> {p.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};
export default CustomTooltip;