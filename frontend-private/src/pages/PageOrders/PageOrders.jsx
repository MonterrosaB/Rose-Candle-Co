import RegisterOrder from "./components/RegisterOrder";
import { useState, useEffect } from "react";
import Dialog from "../../global/components/Dialog";
import DataGrid from "../../global/components/DataGrid";
import TitleH1 from "../../global/components/TitleH1"

import useOrders from "./hooks/useOrders";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next"; // Soporte para i18n

import PrincipalDiv from "../../global/components/PrincipalDiv";

const PageOrders = () => {
  const { t } = useTranslation("orders"); // Namespace del archivo orders.json

  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = `${t("title")} | Rosé Candle Co.`;
  }, [t]);

  const methods = useForm();
  const { salesOrders, getSalesOrders } = useOrders(methods);

  const [openDialogOrders, setOpenDialogOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); //  Para editar

  const columns = {
    [t("client")]: "name",
    [t("products")]: "totalProducts",
    [t("date")]: "saleDate",
    [t("amount")]: "total",
    [t("payment_method")]: "paymentMethod",
    [t("status")]: "shippingState",
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
        <TitleH1 title={t("title")} />
        <div className="hidden sm:block">
          <DataGrid
            columns={columns}
            rows={salesOrders}
            primaryBtnText={t("add_order")}
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
                <strong>{t("order_id")}:</strong> {order.idShoppingCart}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>{t("date")}:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>{t("amount")}:</strong> ${order.total?.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>{t("payment_method")}:</strong> {order.paymentMethod}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>{t("status")}:</strong> {order.shippingState[0]?.state || "Sin estado"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>{t("address")}:</strong> {order.address?.address}
              </p>
            </div>
          ))}
        </div>
      </PrincipalDiv>


    </>
  );
};

export default PageOrders;
