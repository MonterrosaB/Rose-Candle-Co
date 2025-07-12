import RegisterOrder from "./components/RegisterOrder"
import CardProduct from "./components/CardProductOrder";
import CardMaterials from "./components/CardMaterials";
import Card from "../../assets/calmness.jpg";

import DataGrid from "../../global/components/DataGrid";


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

    const salesOrdersMock = [
        {
            idShoppingCart: "60fd58c1f49a3c2dc8ab9d23",
            paymentMethod: "paypal",
            address: "123 Main Street, San Salvador",
            saleDate: new Date("2025-07-11T10:30:00"),
            shippingTotal: 5.99,
            total: 59.99,
            shippingState: [
                {
                    state: "pending",
                    fecha: new Date("2025-07-11T11:00:00")
                },
                {
                    state: "shipped",
                    fecha: new Date("2025-07-12T14:00:00")
                }
            ],
            createdAt: new Date("2025-07-11T10:30:00"),
            updatedAt: new Date("2025-07-12T14:00:00")
        },
        {
            idShoppingCart: "60fd58c1f49a3c2dc8ab9d24",
            paymentMethod: "credit card",
            address: "456 Avenue Libertad, Santa Tecla",
            saleDate: new Date("2025-07-10T09:15:00"),
            shippingTotal: 3.5,
            total: 42.75,
            shippingState: [
                {
                    state: "pending",
                    fecha: new Date("2025-07-10T09:30:00")
                },
                {
                    state: "processing",
                    fecha: new Date("2025-07-11T08:00:00")
                },
                {
                    state: "delivered",
                    fecha: new Date("2025-07-12T16:45:00")
                }
            ],
            createdAt: new Date("2025-07-10T09:15:00"),
            updatedAt: new Date("2025-07-12T16:45:00")
        }
    ];


    const columns = {
        Productos: "idShoppingCart",
        Cliente: "idShoppingCart",
        Fecha: "createdAt",
        Monto: "total",
        Método: "paymentMethod",
        Estado: "shippingState[last].state"
    };






    return (
        <>

            <DataGrid
                title={"Ordenes"}
                columns={columns}
                rows={salesOrdersMock}

            />
        </>
    )
}
export default PageOrders;