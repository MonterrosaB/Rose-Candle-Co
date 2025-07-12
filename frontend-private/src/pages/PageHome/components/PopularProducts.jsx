import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const PopularProducts = () => {

    // Colores suaves como en la imagen
    const COLORS = ['#E8DCC3', '#C2A878', '#A3A380'];

    const data = [
        { name: "Velas", students: 400 },
        { name: "Wax Melts", students: 300 },
        { name: "Aromatizadores", students: 300 }
    ];

    return (
        <div className="w-80 h-64 shadow-xl rounded-2xl p-4 flex flex-col justify-center min-w-80">
            <h2 className="text-md font-semibold text-center pt-5">Productos Populares</h2>
            <div className="flex items-center justify-center h-full">
                <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                        <Tooltip />
                        <Pie
                            data={data}
                            dataKey="students"
                            nameKey="name"
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
                        <li key={entry.name} className="flex items-center space-x-2">
                            <span
                                className="w-3 h-3 rounded-full inline-block"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></span>
                            <span>{entry.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default PopularProducts;