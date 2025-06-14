import RegisterOrder from "./components/RegisterOrder"
import CardProduct from "./components/CardProductOrder";
import CardMaterials from "./components/CardMaterials";
import Card from "../../assets/calmness.jpg";


const PageOrders = () => {

    const accordionData = [
        {
            ordenVenta: [{ img: Card, producto: "Cera de Soja", variante: "4oz" }],
            material: [{ material: "Cera de Soja", cantidad: "100g" }, { material: "Mechas 6 inch", cantidad: "20u" }]

        },
        {
            ordenVenta: [{ img: Card, producto: "Cera de Soja", variante: "9oz" }],
            material: [{ material: "Cera de Soja", cantidad: "100g" }, { material: "Mechas 6 inch", cantidad: "20u" }]
        },
        {
            ordenVenta: [{ img: Card, producto: "Cera de Soja", variante: "4oz" }],
            material: [{ material: "Cera de Soja", cantidad: "100g" }, { material: "Mechas 6 inch", cantidad: "100u" }]

        }
    ];





    return (
        <>
            <RegisterOrder />
        </>
    )
}
export default PageOrders;