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
              <div 
                className="max-w-screen-lg mx-auto px-4 box-border overflow-x-hidden pt-6"
                style={{overflowX: "hidden"}}
              >
                <h1 className="text-xl md:text-2xl mb-6">Welcome back, Eli {/* User traido al hacer login ${userName} */}</h1>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                    <CardWidgets
                        bgColor={"#F7F5EE"}
                        textColor={"#333"}
                        tittle={"Pedidos Totales"}
                        value={"100"}
                        increment={"5"}
                        icon={<Boxes size={28} strokeWidth={2} />} />

                    <CardWidgets
                        bgColor={"#C2A878"}
                        textColor={"#FFFFFF"}
                        tittle={"Ingresos Totales"}
                        value={"$100"}
                        increment={"5"}
                        icon={<DollarSign size={48} strokeWidth={3} />} />

                    <CardWidgets
                        bgColor={"#F7F5EE"}
                        textColor={"#333"}
                        tittle={"Pedidos Totales"}
                        value={"100"}
                        increment={"5"}
                        icon={<User size={28} strokeWidth={2} />} />
                </div>

                <div className="w-full h-56 md:h-96 px-4 box-border mt-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip />
                            <Pie
                                data={data}
                                dataKey="students"
                                outerRadius={window.innerWidth >= 768 ? 130 : 50} // 120 en escritorio, 80 en móvil
                                innerRadius={window.innerWidth >= 768 ? 60 : 40}
                                fill="green"
                                label={({ name, students }) => `${name}: ${students}`}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
              </div>
            </PrincipalDiv>
        </>
    )
}
export default Home;
