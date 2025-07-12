import { Boxes, DollarSign, User } from "lucide-react";
import CardWidgets from "./components/CardWidgets";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import PopularProducts from "./components/PopularProducts";
import DataGrid from "../../global/components/DataGrid";

const Home = () => {
    const columnsMaterial = {
        "Materia": "Materia",
        "Cantidad": "Cantidad"
    };

    const rowsMaterial = [
        { Materia: "Cera de Soja", Cantidad: "1500g" },
        { Materia: "Fragancía Chocolate", Cantidad: "15ml" },
        { Materia: "Fragancía Vainilla", Cantidad: "15ml" },
        { Materia: "Mechas LX 24 6", Cantidad: "25u" }
    ];

    const columnsOrders = {
        "Nombre": "Nombre",
        "Fecha Pedido": "Orders",
        "Ubicación": "Ubicacion",
        "Productos Totales": "Productos"
    };

    const rowsOrders = [
        {
            Nombre: "Rodrigo Monterrosa",
            Orders: "1 May, 2025 : 15:12",
            Ubicacion: "La Libertad",
            Productos: "10",
        },
        {
            Nombre: "Rodrigo Monterrosa",
            Orders: "1 May, 2025 : 15:12",
            Ubicacion: "La Libertad",
            Productos: "10",
        },
        {
            Nombre: "Rodrigo Monterrosa",
            Orders: "1 May, 2025 : 15:12",
            Ubicacion: "La Libertad",
            Productos: "10",
        },
        {
            Nombre: "Rodrigo Monterrosa",
            Orders: "1 May, 2025 : 15:12",
            Ubicacion: "La Libertad",
            Productos: "10",
        },
    ];

    return (
        <PrincipalDiv>
            <h1 className="text-2xl font-semibold mb-4 ml-15">Bienvenida de nuevo, Eli</h1>

            {/* Widgets */}
            <div className="w-full flex flex-wrap justify-center gap-x-14 gap-y-8">
                <CardWidgets
                    bgColor={"#F7F5EE"}
                    textColor={"#333"}
                    tittle={"Pedidos Totales"}
                    value={"100"}
                    increment={"5"}
                    icon={<Boxes size={32} strokeWidth={2.5} />}
                />
                <CardWidgets
                    bgColor={"#C2A878"}
                    textColor={"#FFFFFF"}
                    tittle={"Ingresos Totales"}
                    value={"$100"}
                    increment={"5"}
                    icon={<DollarSign size={32} strokeWidth={3} />}
                />
                <CardWidgets
                    bgColor={"#F7F5EE"}
                    textColor={"#333"}
                    tittle={"Pedidos Totales"}
                    value={"100"}
                    increment={"5"}
                    icon={<User size={32} strokeWidth={3} />}
                />
            </div>

            {/* Grid responsive */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center">
                <div className="w-full lg:w-2/3">
                    <DataGrid
                        title={"Valores bajos de materia prima"}
                        columns={columnsMaterial}
                        rows={rowsMaterial}
                        editable={false}
                    />
                </div>
                <div className="w-full flex justify-center lg:w-1/3 lg:flex lg:justify-center">
                    <PopularProducts />
                </div>
            </div>

            <div className="w-full">
                <DataGrid
                    title={"Últimos pedidos"}
                    columns={columnsOrders}
                    rows={rowsOrders}
                    editable={false}
                />
            </div>
        </PrincipalDiv>
    );
};
export default Home;
