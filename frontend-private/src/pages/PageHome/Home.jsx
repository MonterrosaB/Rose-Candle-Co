import { Boxes, DollarSign, User } from "lucide-react";
import CardWidgets from "./components/CardWidgets";
import PrincipalDiv from "../../global/components/PrincipalDiv";

import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const Home = () => {

    const data = [
        { name: "Ocean Breeze", students: 400 },
        { name: "Fresh Love", students: 700 },
        { name: "Treasure", students: 200 },
        { name: "Into the Woods", students: 1000 },
    ];
    return (
        <>
            <PrincipalDiv>
                <h1 className="text-2xl text">Welcome back, Eli {/* User traido al hacer login ${userName} */}</h1>

                <div className="container flex justify-around items-center p-8">
                    <CardWidgets
                        bgColor={"#F7F5EE"}
                        textColor={"#333"}
                        tittle={"Pedidos Totales"}
                        value={"100"}
                        increment={"5"}
                        icon={<Boxes size={32} strokeWidth={2.5} />} />

                    <CardWidgets
                        bgColor={"#C2A878"}
                        textColor={"#FFFFFF"}
                        tittle={"Ingresos Totales"}
                        value={"$100"}
                        increment={"5"}
                        icon={<DollarSign size={32} strokeWidth={3} />} />

                    <CardWidgets
                        bgColor={"#F7F5EE"}
                        textColor={"#333"}
                        tittle={"Pedidos Totales"}
                        value={"100"}
                        increment={"5"}
                        icon={<User size={32} strokeWidth={3} />} />
                </div>

                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip />
                            <Pie
                                data={data}
                                dataKey="students"
                                outerRadius={150}
                                innerRadius={80}
                                fill="green"
                                label={({ name, students }) => `${name}: ${students}`}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </PrincipalDiv>
        </>
    )
}
export default Home;