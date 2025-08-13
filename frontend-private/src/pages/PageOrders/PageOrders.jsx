import RegisterOrder from "./components/RegisterOrder";
import { useState, useEffect } from "react";
import Dialog from "../../global/components/Dialog";
import DataGrid from "../../global/components/DataGrid";

const PageOrders = () => {
  const [openDialogOrders, setOpenDialogOrders] = useState(false);
  const [salesOrders, setSalesOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/salesOrder")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(order => ({
          idShoppingCart: order.idShoppingCart?._id || "",
          cliente: order.idShoppingCart?.idUser?.name || "Sin cliente",
          paymentMethod: order.paymentMethod || "No especificado",
          address: order.address || "Sin dirección",
          saleDate: order.saleDate,
          shippingTotal: order.shippingTotal,
          total: order.total,
          shippingState: order.shippingState || [],
          createdAt: order.createdAt,
          updatedAt: order.updatedAt
        }));
        setSalesOrders(formatted);
      })
      .catch(err => console.error("Error al traer órdenes:", err));
  }, []);

  const columns = {
    Productos: "idShoppingCart",
    Cliente: "cliente",
    Fecha: "saleDate",
    Monto: "total",
    Método: "paymentMethod",
    Estado: "shippingState[last].state"
  };

  return (
    <>
      {/* Tabla desktop */}
      <div className="hidden md:block">
        <DataGrid
          title={"Órdenes"}
          columns={columns}
          rows={salesOrders}
          primaryBtnText={"Add Order"}
          onClickPrimaryBtn={() => setOpenDialogOrders(true)}
        />

        {openDialogOrders && (
          <Dialog
            open={openDialogOrders}
            onClose={() => setOpenDialogOrders(false)}
          >
            <RegisterOrder
              onClose={() => setOpenDialogOrders(false)}
            />
          </Dialog>
        )}
      </div>

      {/* Cards móvil */}
      <div className="md:hidden pt-17 space-y-4 px-4 py-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Órdenes</h2>
        {salesOrders.map((order) => (
          <div
            key={order.idShoppingCart}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <p className="text-sm text-gray-600 mb-1">
              <strong>ID Orden:</strong> {order.idShoppingCart}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Monto:</strong> ${order.total?.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Método de pago:</strong> {order.paymentMethod}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Estado:</strong> {order.shippingState[0]?.state || "Sin estado"}
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
