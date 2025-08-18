import RegisterOrder from "./components/RegisterOrder";
import { useState, useEffect } from "react";
import Dialog from "../../global/components/Dialog";
import DataGrid from "../../global/components/DataGrid";
import TitleH1 from "../../global/components/TitleH1"



import PrincipalDiv from "../../global/components/PrincipalDiv";

const PageOrders = () => {
  const [openDialogOrders, setOpenDialogOrders] = useState(false);
  const [salesOrders, setSalesOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // 🔹 Para editar

  useEffect(() => {
    fetch("http://localhost:4000/api/salesOrder")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(order => {
          const products = order.idShoppingCart?.products || [];

          const totalQuantity = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
          const totalPrice = products.reduce((sum, p) => sum + (p.subtotal || 0), 0);

          return {
            _id: order._id,
            idShoppingCart: order.idShoppingCart?._id || "",
            name: order.idShoppingCart?.idUser?.name || "Sin cliente",
            paymentMethod: order.paymentMethod || "No especificado",
            address: order.address || "Sin dirección",
            saleDate: order.saleDate,
            shippingTotal: order.shippingTotal,
            total: order.total,
            shippingState: order.shippingState || [],
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            products,
            totalQuantity,
            totalPrice
          };
        });
        console.log(formatted);

        setSalesOrders(formatted);

      })
      .catch(err => console.error("Error al traer órdenes:", err));
  }, []);


  const columns = {
    Cliente: "name",
    Productos: "idShoppingCart",
    Fecha: "saleDate",
    Monto: "total",
    Método: "paymentMethod",
    Estado: "shippingState[last].state"
  };

  //  Abrir modal para agregar
  const handleAddOrder = () => {
    setSelectedOrder(null);
    setOpenDialogOrders(true);
  };

  // Abrir modal para editar
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setOpenDialogOrders(true);
  };

  return (
    <>
      {/* Tabla desktop */}
      <TitleH1 title="Órdenes" />
      <div className="hidden md:block">
        <DataGrid
          columns={columns}
          rows={salesOrders}
          primaryBtnText={"Add Order"}
          onClickPrimaryBtn={handleAddOrder}
          updateRow={handleEditOrder} //  Aquí pasamos la función
          deleteRow={(order) => console.log("Eliminar", order)}
        />

        {openDialogOrders && (
          <Dialog
            open={openDialogOrders}
            onClose={() => setOpenDialogOrders(false)}
          >
            <RegisterOrder
              initialData={selectedOrder} //  Le pasamos la orden si es edición
              onClose={() => setOpenDialogOrders(false)}
              onOrderCreated={(newOrder) => {
                const formatted = {
                  _id: newOrder._id,
                  idShoppingCart: newOrder.idShoppingCart?._id || "",
                  cliente: newOrder.idShoppingCart?.idUser?.name || "Sin cliente",
                  paymentMethod: newOrder.paymentMethod || "No especificado",
                  address: newOrder.address || "Sin dirección",
                  saleDate: newOrder.saleDate,
                  shippingTotal: newOrder.shippingTotal,
                  total: newOrder.total,
                  shippingState: newOrder.shippingState || [],
                  createdAt: newOrder.createdAt,
                  updatedAt: newOrder.updatedAt
                };
                setSalesOrders(prev => [...prev, formatted]);
              }}
              onOrderUpdated={(updatedOrder) => {
                setSalesOrders(prev =>
                  prev.map(o => o._id === updatedOrder._id ? updatedOrder : o)
                );
              }}
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
      {/* Tabla desktop */}

    </>
  );
};

export default PageOrders;
