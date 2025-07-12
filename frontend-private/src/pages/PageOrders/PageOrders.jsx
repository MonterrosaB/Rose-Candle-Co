import RegisterOrder from "./components/RegisterOrder";
import CardProduct from "./components/CardProductOrder";
import CardMaterials from "./components/CardMaterials";
import Card from "../../assets/calmness.jpg";

import DataGrid from "../../global/components/DataGrid";

const PageOrders = () => {
  const salesOrdersMock = [
    {
      idShoppingCart: "60fd58c1f49a3c2dc8ab9d23",
      paymentMethod: "paypal",
      address: "123 Main Street, San Salvador",
      saleDate: new Date("2025-07-11T10:30:00"),
      shippingTotal: 5.99,
      total: 59.99,
      shippingState: [
        { state: "pending", fecha: new Date("2025-07-11T11:00:00") },
        { state: "shipped", fecha: new Date("2025-07-12T14:00:00") },
      ],
      createdAt: new Date("2025-07-11T10:30:00"),
      updatedAt: new Date("2025-07-12T14:00:00"),
    },
    {
      idShoppingCart: "60fd58c1f49a3c2dc8ab9d24",
      paymentMethod: "credit card",
      address: "456 Avenue Libertad, Santa Tecla",
      saleDate: new Date("2025-07-10T09:15:00"),
      shippingTotal: 3.5,
      total: 42.75,
      shippingState: [
        { state: "pending", fecha: new Date("2025-07-10T09:30:00") },
        { state: "processing", fecha: new Date("2025-07-11T08:00:00") },
        { state: "delivered", fecha: new Date("2025-07-12T16:45:00") },
      ],
      createdAt: new Date("2025-07-10T09:15:00"),
      updatedAt: new Date("2025-07-12T16:45:00"),
    },
  ];

  const columns = {
    Productos: "idShoppingCart",
    Cliente: "idShoppingCart",
    Fecha: "createdAt",
    Monto: "total",
    Método: "paymentMethod",
    Estado: "shippingState[last].state",
  };

  // Helper para obtener último estado del arreglo shippingState
  const getLastShippingState = (order) => {
    if (!order.shippingState || order.shippingState.length === 0) return "N/A";
    return order.shippingState[order.shippingState.length - 1].state;
  };

  // Formato fecha legible
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <>
      {/* Tabla solo md+ */}
      <div className="hidden md:block">
        <DataGrid title={"Ordenes"} columns={columns} rows={salesOrdersMock} />
      </div>

      {/* Cards para móvil */}
      <div className="md:hidden pt-17 space-y-4 px-4 py-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Órdenes</h2>
        {salesOrdersMock.map((order) => (
          <div
            key={order.idShoppingCart}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <p className="text-sm text-gray-600 mb-1">
              <strong>ID Orden:</strong> {order.idShoppingCart}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Fecha:</strong> {formatDate(order.createdAt)}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Monto:</strong> ${order.total.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Método de pago:</strong> {order.paymentMethod}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Estado:</strong> {getLastShippingState(order)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Dirección:</strong> {order.address}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PageOrders;
