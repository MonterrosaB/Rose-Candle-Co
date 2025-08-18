import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const OrdersByCategory = ({ data }) => {

    // Colores suaves como en la imagen
    const COLORS = ['#E8DCC3', '#C2A878', '#A3A380'];

    return (
        <div className="w-80 h-64 shadow-xl rounded-2xl p-4 flex flex-col justify-center min-w-80">
            <h2 className="text-md font-semibold text-center pt-5">Porcentaje de ventas por categoría</h2>
            <div className="flex items-center justify-center h-full">
                <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                        <Tooltip />
                        <Pie
                            data={data}
                            dataKey="totalVentas"
                            nameKey="categoria"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={5}
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <ul className="ml-4 space-y-2 text-sm">
                    {data.map((entry, index) => (
                        <li key={entry.categoria} className="flex items-center space-x-2">
                            <span
                                className="w-3 h-3 rounded-full inline-block"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></span>
                            <span>{entry.categoria}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default OrdersByCategory;