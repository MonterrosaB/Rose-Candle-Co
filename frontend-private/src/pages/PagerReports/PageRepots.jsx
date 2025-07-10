import PrincipalDiv from "../../global/components/PrincipalDiv"

import { Link } from "react-router";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import {
    LineChart,
    Line
} from "recharts";


import Widget from "../../global/components/Widget";
import OrdersByCategory from "./components/OrdersByCategory";
import AverageSellByOrders from "./components/AverageSellByOrders";
import DataGrid from "../../global/components/DataGrid"
const PageReports = () => {

    const data = [
        { name: "Ene", ingresos: 4000, ganancias: 2400 },
        { name: "Feb", ingresos: 3000, ganancias: 1398 },
        { name: "Mar", ingresos: 2000, ganancias: 980 },
        { name: "Abr", ingresos: 2780, ganancias: 2000 },
        { name: "May", ingresos: 1890, ganancias: 1500 },
        { name: "Jun", ingresos: 2390, ganancias: 1700 },
        { name: "Jul", ingresos: 3490, ganancias: 2100 },
    ];

    const dataT = [
        { name: "Lun", balance: 200 },
        { name: "Mar", balance: 350 },
        { name: "Mié", balance: 300 },
        { name: "Jue", balance: 400 },
        { name: "Vie", balance: 370 },
        { name: "Sáb", balance: 420 },
        { name: "Dom", balance: 390 },
    ];

    const columns = {
        "Producto": "product",
        "Precio de venta": "salePrice",
        "Consto de producción": "productionCost",
        "%": "%",
    };

    const rows = [
        {
            productionCost: 3,
            salePrice: 9,
            "%": "66.66%",
            product: "Calmnes",
        },
        {
            productionCost: 3,
            salePrice: 9,
            "%": "66.66%",
            product: "Calmnes 2"
        },
        {
            productionCost: 3,
            salePrice: 9,
            "%": "66.66%",
            product: "Calmnes",
        },
        {
            productionCost: 3,
            salePrice: 9,
            "%": "66.66%",
            product: "Calmnes 2"
        }
    ];

    return (
        <>
            <PrincipalDiv>
                <div className="flex">
                    <div className="flex w-1/2 justify-center items-center">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <Widget
                                bgColor={"#F7F5EE"}
                                textColor={"#333"}
                                tittle={"Pedidos del mes"}
                                value={"100"}
                                variant="compact"
                            />
                            <Widget
                                bgColor={"#F7F5EE"}
                                textColor={"#333"}
                                tittle={"Tasa de carritos abandonados"}
                                value={"5.4%"}
                                variant="compact"
                            />
                            <Widget
                                bgColor={"#F7F5EE"}
                                textColor={"#333"}
                                tittle={"Ingresos del mes"}
                                value={"$150"}
                                variant="compact"
                            />
                            <Widget
                                bgColor={"#F7F5EE"}
                                textColor={"#333"}
                                tittle={"Ganancias del mes"}
                                value={"$60"}
                                variant="compact"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-1/2">
                        <div className="bg-[#C2A878] h-full w-80 rounded-2xl p-6 flex flex-col justify-between text-white shadow-lg">
                            <h2 className="text-2xl font-semibold mb-2">Ganancia del día</h2>
                            <p className="text-6xl font-bold text-center">$80</p>

                            <div className="flex justify-center">
                                <Link
                                    to="/ventas"
                                    className="border border-white rounded-md px-4 py-2 hover:bg-white hover:text-[#C2A878] transition"
                                >
                                    Ver Ventas
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex gap-8">
                    <OrdersByCategory />
                    <div className="h-64 w-full bg-white rounded-2xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Ingresos vs Ganancias
                        </h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                barCategoryGap={20}
                                barSize={30}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", borderColor: "#e5e7eb" }}
                                    labelStyle={{ color: "#374151" }}
                                />
                                <Legend
                                    wrapperStyle={{
                                        top: 0,
                                        right: 0,
                                        fontSize: "14px",
                                        color: "#374151",
                                    }}
                                />
                                <Bar dataKey="ingresos" fill="#C2A878" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="ganancias" fill="#9E9E9E" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <AverageSellByOrders
                        bgColor={"#F7F5EE"}
                        textColor={"#333"}
                        tittle={"Tamaño promedio de compras"}
                        value={"$75"}
                        variant="compact"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <DataGrid
                            title={"Ganancias por producto"}
                            columns={columns}
                            rows={rows}
                            editable={false}
                        />
                    </div>
                    <div className="w-1/2">
                        <div className="w-full h-full p-4 bg-white rounded-xl shadow-md">
                            <h2 className="text-md font-semibold mb-2">Balance semanal</h2>
                            <ResponsiveContainer width="100%" height="80%">
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={dataT}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />

                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", borderColor: "#e5e7eb" }}
                                        labelStyle={{ color: "#374151" }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="balance"
                                        stroke="#C2A878"
                                        strokeWidth={2}
                                        dot={{ r: 2 }}
                                        activeDot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around">
                    <Widget
                        bgColor={"#F7F5EE"}
                        textColor={"#333"}
                        tittle={"Ingresos Totales"}
                        value={"$5000"}
                        variant="compact"
                    />
                    <Widget
                        bgColor={"#F7F5EE"}
                        textColor={"#333"}
                        tittle={"Ingresos del mes"}
                        value={"$150"}

                    />
                    <Widget
                        bgColor={"#F7F5EE"}
                        textColor={"#333"}
                        tittle={"Costo promedio por unidad"}
                        value={"$6.20"}
                        variant="compact"
                    />
                    <Widget
                        bgColor={"#F7F5EE"}
                        textColor={"#333"}
                        tittle={"Costos totales"}
                        value={"$3000"}
                        variant="compact"
                    />
                </div>


            </PrincipalDiv>

        </>
    )
}
export default PageReports;