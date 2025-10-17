import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const InvoiceModal = ({ order }) => {
    const invoiceRef = useRef(null);

    const formatCurrency = (amount) => {
        const number = Number(amount);
        if (isNaN(number)) return "$0.00";
        return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
    };

    // ✅ Nueva forma correcta con react-to-print v3+
    const handlePrint = useReactToPrint({
        contentRef: invoiceRef, // 👈 En lugar de content: () => ref.current
        documentTitle: `Factura_${order.orderId}`,
    });

    return (
        <div
            className="
            p-4 
            w-full 
            max-h-[95vh]
            overflow-y-auto
            transform transition-all duration-300 ease-out
            max-w-xs
            sm:max-w-md
            lg:max-w-xl 
            xl:max-w-2xl
        "
        >
            {/* --- Botón para imprimir --- */}
            <div className="flex justify-end mb-4 gap-3 print:hidden top-0 bg-white pt-2">
                <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-150"
                >
                    Imprimir Factura
                </button>
            </div>

            {/* --- Contenido imprimible --- */}
            <div ref={invoiceRef} className="invoice-print-area p-6 rounded-lg bg-white">
                {/* --- Encabezado --- */}
                <header className="text-center mb-6 border-b pb-3">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Orden de Compra #{order.orderId}
                    </h1>
                </header>

                {/* --- Datos del cliente y orden --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-700">Información del Cliente:</h3>
                        <p>
                            <strong>Cliente:</strong> {order.name}
                        </p>
                        <p className="break-all">
                            <strong>Email:</strong> {order.email}
                        </p>
                        <p>
                            <strong>Teléfono:</strong> {order.phone}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-700">Detalles de la Orden:</h3>
                        <p>
                            <strong>ID de Compra:</strong> {order._id}
                        </p>
                        <p>
                            <strong>Fecha:</strong>{" "}
                            {new Date(order.saleDate).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Método de Pago:</strong> {order.paymentMethod}
                        </p>
                        <p>
                            <strong>Estado de Envío:</strong> {order.shippingState || "Pendiente"}
                        </p>
                    </div>
                </div>

                {/* --- Dirección --- */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-1 text-gray-700">Dirección de Envío:</h3>
                    <p>
                        {order.firstName} {order.lastName}
                    </p>
                    <p>
                        {order.address}, {order.city}
                    </p>
                    <p>
                        {order.state}, {order.zipCode}, {order.country}
                    </p>
                </div>

                {/* --- Tabla de productos --- */}
                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">
                    Productos ({order.totalProducts} ítems)
                </h3>
                <div className="overflow-x-auto mb-8">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Producto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cantidad
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subtotal
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {order.products.map((p, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {p.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {p.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                        {formatCurrency(p.subtotal)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- Totales --- */}
                <div className="flex justify-end">
                    <div className="w-full md:w-1/2 p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Subtotal de Productos:</span>
                            <span className="font-medium">
                                {formatCurrency(order.totalPrice)}
                            </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-300">
                            <span className="text-lg font-bold">Total Pagado:</span>
                            <span className="text-xl font-extrabold text-blue-600">
                                {formatCurrency(order.total)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;
