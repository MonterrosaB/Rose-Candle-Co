import { Boxes, DollarSign, User } from "lucide-react";
import CardWidgets from "./components/CardWidgets";
import TextAreaToArray from "../../global/components/TextAreaArray";

const Home = () => {

    return (
        <>
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

        </>
    )
}
export default Home;