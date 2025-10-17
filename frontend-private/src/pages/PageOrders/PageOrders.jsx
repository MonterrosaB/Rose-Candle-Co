import RegisterOrder from "./components/RegisterOrder";
import { useState, useEffect } from "react";
import Dialog from "../../global/components/Dialog";
import DataGrid from "../../global/components/DataGrid";
import TitleH1 from "../../global/components/TitleH1"
import CardOrdersMobile from "./components/CardOrdersMobile";
import MiFactura from "./components/InvoiceModal";

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
  const { salesOrders } = useOrders(methods);

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
  };

  // Abrir modal para editar
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setOpenDialogOrders(true);
  };

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);

  const showRecipe = (order) => {
    // 'order' is the data for the row clicked in the DataGrid
    setSelectedOrderForInvoice(order); // Store the order data
    setShowInvoiceModal(true); // Open the modal/dialog
  };

  // Función de utilidad para verificar el estado de cancelación
  const isCancelled = (order) => {
    // AJUSTA: Verifica que "CANCELADO" sea el valor exacto de tu estado
    return order.shippingState === "Cancelado";
  };

  // Envoltorio para la Edición
  const conditionalHandleEditOrder = (order) => {
    if (isCancelled(order)) {
      // Opcional: Mostrar una notificación o mensaje al usuario (ej: toast)
      console.warn("No se puede editar una orden con estado CANCELADO.");
      return; // Detiene la ejecución
    }
    // Si no está cancelada, llama a la función original de edición
    handleEditOrder(order);
  };

  // Envoltorio para Mostrar la Factura
  const conditionalShowRecipe = (order) => {
    if (isCancelled(order)) {
      // Opcional: Mostrar una notificación o mensaje al usuario
      console.warn("No se puede ver la factura de una orden con estado CANCELADO.");
      return; // Detiene la ejecución
    }
    // Si no está cancelada, llama a la función original para mostrar la factura
    showRecipe(order);
  };


  return (
    <>
      <PrincipalDiv>
        <TitleH1 title={t("title")} />
        <div className="hidden lg:block">
          <DataGrid
            columns={columns}
            rows={salesOrders}
            primaryBtnText={t("add_order")}
            onClickPrimaryBtn={handleAddOrder}
            updateRow={conditionalHandleEditOrder} //  Aquí pasamos la función
            showDelete={false}
            showMore={conditionalShowRecipe}
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


        <div className="lg:hidden pt-4 space-y-4 px-4 pb-16">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Órdenes ({salesOrders.length})
          </h2>

          {salesOrders.map((order) => (
            <CardOrdersMobile
              key={order._id}
              order={order}
              onEdit={conditionalHandleEditOrder}
              t={t} // Pasa la función de traducción
            />
          ))}
        </div>

        {showInvoiceModal && selectedOrderForInvoice && (
          <Dialog
            open={showInvoiceModal}
            onClose={() => setShowInvoiceModal(false)}
          >
            <MiFactura
              order={selectedOrderForInvoice}
              onClose={() => setShowInvoiceModal(false)}
            // You'd need to create this InvoiceModal component
            />
          </Dialog>
        )}
      </PrincipalDiv>



    </>
  );
};

export default PageOrders;
