import React from 'react';
// Asumiendo que 't' viene de alguna librería de i18n
// y que Order se refiere a la estructura de tu JSON de orden.

/**
 * Define los estilos de color basados en el estado de envío.
 * @param {string} state - El estado de la orden.
 * @returns {string} Clases de Tailwind CSS para el badge.
 */
const getStatusStyles = (state) => {
    switch (state) {
        case "Completado":
            return "bg-green-100 text-green-800 border-green-300";
        case "En Proceso":
            return "bg-blue-100 text-blue-800 border-blue-300";
        case "Pendiente":
            return "bg-yellow-100 text-yellow-800 border-yellow-300";
        case "Cancelado":
            return "bg-red-100 text-red-800 border-red-300";
        case "Enviado":
            return "bg-indigo-100 text-indigo-800 border-indigo-300";
        default:
            return "bg-gray-100 text-gray-800 border-gray-300";
    }
};

/**
 * Componente de tarjeta de orden optimizado para móviles.
 * @param {object} props
 * @param {object} props.order - El objeto de la orden de venta.
 * @param {function} props.onEdit - Handler para editar/ver detalles de la orden.
 * @param {function} props.t - Función de traducción (i18n).
 */
const OrderCardMobile = ({ order, onEdit, t }) => {

    // Obtener el estado, cayendo a un valor por defecto si es necesario
    const shippingState = order.shippingState || "Sin estado";
    const statusClass = getStatusStyles(shippingState);

    // Formatear la fecha
    const orderDate = new Date(order.saleDate || order.createdAt).toLocaleDateString("es-ES", {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    // Traducciones (o etiquetas por defecto)
    const orderIdLabel = t ? t("order_id") : "Orden #";
    const dateLabel = t ? t("date") : "Fecha";
    const totalLabel = t ? t("amount") : "Total";
    const clientLabel = t ? t("client") : "Cliente";

    // Lista de nombres de productos para mostrar en la tarjeta
    const productNames = order.products.map(p => p.name).join(', ');

    return (
        <div
            key={order._id}
            className="bg-white rounded-lg shadow-lg p-5 border-l-4 border-amber-600 transition duration-300 hover:shadow-xl cursor-pointer"
            onClick={() => onEdit(order)}
        >
            {/* Fila superior: ID de la orden y Estado (Badge) */}
            <div className="flex justify-between items-start mb-3">
                <p className="text-base font-semibold text-amber-700">
                    {orderIdLabel}: {order.orderId || order.idShoppingCart}
                </p>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusClass} flex-shrink-0`}>
                    {shippingState}
                </span>
            </div>

            {/* Cliente y Total (Información Principal) */}
            <div className="mb-3 space-y-1">
                <p className="text-xl font-extrabold text-gray-900">
                    {totalLabel}: ${order.total?.toFixed(2) || '0.00'}
                </p>
                <p className="text-sm text-gray-700">
                    {clientLabel}: <span className="font-medium">{order.name}</span>
                </p>
            </div>

            {/* Detalles Adicionales (Fecha y Productos) */}
            <div className="border-t border-gray-100 pt-3 text-sm space-y-1">
                <p className="text-gray-500 flex items-center">
                    <span className="mr-2"></span> {dateLabel}: {orderDate}
                </p>
                <p className="text-gray-500 truncate flex items-center">
                    <span className="mr-2"></span> {t("products")}: {productNames}
                </p>
            </div>
        </div>
    );
};

export default OrderCardMobile;