import RegisterOrder from "./components/RegisterOrder";
import { useState, useEffect } from "react";
import Dialog from "../../global/components/Dialog";
import DataGrid from "../../global/components/DataGrid";
import TitleH1 from "../../global/components/TitleH1"
import CardOrdersMobile from "./components/CardOrdersMobile";

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
    ["ID"]: "orderId",
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
            showMore={true}
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


        <div className="sm:hidden pt-4 space-y-4 px-4 pb-16">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Órdenes ({salesOrders.length})
          </h2>

          {salesOrders.map((order) => (
            <CardOrdersMobile
              key={order._id}
              order={order}
              onEdit={handleEditOrder}
              t={t} // Pasa la función de traducción
            />
          ))}
        </div>
      </PrincipalDiv>



    </>
  );
};

export default PageOrders;
