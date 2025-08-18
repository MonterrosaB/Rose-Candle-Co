import RegisterOrder from "./components/RegisterOrder";
import { useState, useEffect } from "react";
import Dialog from "../../global/components/Dialog";
import DataGrid from "../../global/components/DataGrid";
import TitleH1 from "../../global/components/TitleH1"

import useOrders from "./hooks/useOrders";
import { useForm } from "react-hook-form";



import PrincipalDiv from "../../global/components/PrincipalDiv";

const PageOrders = () => {

  const methods = useForm();
  const { salesOrders, getSalesOrders } = useOrders(methods);

  const [openDialogOrders, setOpenDialogOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); //  Para editar

  const columns = {
    Cliente: "name",
    Productos: "totalProducts",
    Fecha: "saleDate",
    Monto: "total",
    Método: "paymentMethod",
    Método: "paymentMethod",
    Estado: "shippingState"
  };

  //  Abrir modal para agregar
  const handleAddOrder = () => {
    setSelectedOrder(null);
    setOpenDialogOrders(true);
    getSalesOrders();
  };

  // Abrir modal para editar
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setOpenDialogOrders(true);
    getSalesOrders();
  };

  return (
    <>
      <PrincipalDiv>
        <TitleH1 title="Órdenes" />
        <div className="hidden sm:block">
          <DataGrid
            columns={columns}
            rows={salesOrders}
            primaryBtnText={"Add Order"}
            onClickPrimaryBtn={handleAddOrder}
            updateRow={handleEditOrder} //  Aquí pasamos la función
            showDelete={false}
          />
        </div>
        {openDialogOrders && (
          <Dialog
            open={openDialogOrders}
            onClose={() => setOpenDialogOrders(false)}
          >
            <RegisterOrder
              initialData={selectedOrder} //  Le pasamos la orden si es edición
              onClose={() => setOpenDialogOrders(false)}
            />
          </Dialog>
        )}

        {/* Cards móvil */}
        <div className="sm:hidden pt-17 space-y-4 px-4 py-4">
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
                <strong>Dirección:</strong> {order.address?.address}
              </p>
            </div>
          ))}
        </div>
      </PrincipalDiv>


    </>
  );
};

export default PageOrders;
