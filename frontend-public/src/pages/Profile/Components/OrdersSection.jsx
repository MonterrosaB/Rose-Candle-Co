import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  Star
} from "lucide-react";
import { Link } from "react-router";

import useClientOrders from "../hooks/useClientOrders.jsx";

// 🔘 Reusable Button
const Button = ({ children, className = "", onClick, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

// 🔘 Reusable Input
const Input = ({ className = "", ...props }) => (
  <input
    className={`flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  const lastState = order.shippingState?.at(-1)?.state.toLowerCase() || "desconocido";
  //  Importante: Asume que 'isValued' es un campo que viene de tu backend
  const canBeValued = lastState === "completado" && !order.isValued;
  const isValued = order.isValued;

  //  Función que redirige al formulario de valoración (tu frontend)
  // El token debería ser recuperado desde el objeto de la orden de tu backend
  const handleValuationClick = () => {
    //  RECUERDA: Necesitas que tu backend devuelva el token al frontend
    // para que puedas construir esta URL. Si no tienes el token aquí,
    // puedes redirigir a una ruta simple, ej: /valoracion/:order_id, y que la
    // página de valoración genere el token en ese momento (menos seguro) o
    // lo pida al backend.

    // Por simplicidad en el frontend, asumiremos que tienes el token disponible:
    const token = order.valuationToken || "FALLBACK_TOKEN_TEST";

    // Redirige a la ruta de valoración con el token único
    window.location.href = `/valorar-experiencia?token=${token}`;
  };

  return (
    // Backdrop del modal
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Contenedor principal del modal */}
      <div
        className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl transition-all duration-300 transform scale-100 opacity-100 border-t-4 border-rose-500"
        onClick={(e) => e.stopPropagation()} // Evita que al hacer clic dentro se cierre
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Detalles del Pedido <span className="text-rose-500">#{order._id.slice(-8).toUpperCase()}</span>
          </h2>
          <Button
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full h-8 w-8"
            onClick={onClose}
          >
            &times;
          </Button>
        </div>

        <div className="space-y-3 mb-6 border-t pt-4">
          <p className="text-gray-700">
            <strong className="font-semibold">Estado Actual:</strong>{" "}
            <span className={`capitalize font-medium ${lastState === 'entregado' ? 'text-green-600' : 'text-orange-600'}`}>
              {lastState}
            </span>
          </p>
          <p className="text-gray-700">
            <strong className="font-semibold">Total Pagado:</strong> <span className="text-lg text-rose-600 font-bold">${order.total}</span>
          </p>
          <p className="text-gray-700">
            <strong className="font-semibold">Productos:</strong> {order.idShoppingCart.products.length} artículos
          </p>

          {/* Aquí podrías mapear la lista completa de productos */}
          <ul className="list-disc list-inside text-sm text-gray-600 max-h-32 overflow-y-auto">
            {order.idShoppingCart.products.map((p, i) => (
              <li key={i}>{p.idProduct.name} (x{p.quantity})</li>
            ))}
          </ul>

        </div>

        {/* Lógica y Botón de Valoración */}
        {/*
        {canBeValued && (
          <Button
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl shadow-lg transition-all duration-300"
            onClick={handleValuationClick}
          >
            <Star className="w-5 h-5 mr-2" />
            ¡Valora tu Experiencia y Gana un Descuento!
          </Button>
        )}

        {isValued && (
          <div className="flex items-center justify-center p-3 bg-gray-100 text-gray-600 rounded-xl">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Gracias, este pedido ya ha sido valorado.
          </div>
        )}

        {!canBeValued && !isValued && (
          <div className="flex items-center justify-center p-3 bg-yellow-50 text-yellow-700 rounded-xl">
            <Truck className="w-5 h-5 mr-2" />
            El pedido debe estar en estado 'Entregado' para poder valorarlo.
          </div>
        )}
         */}
      </div>
    </div>
  );
};

export default function OrdersSection() {

  const { ordersClient, isLoading } = useClientOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filtrado por búsqueda y estado
  const filteredOrders = useMemo(() => {
    return ordersClient.filter((order) => {
      const lastState = order.shippingState?.at(-1)?.state.toLowerCase() || "";
      const matchesStatus =
        filterStatus === "todos" ? true : lastState === filterStatus.toLowerCase();

      const search = searchTerm.toLowerCase();

      const matchesSearch =
        order._id.slice(-8).toLowerCase().includes(search) ||
        order.idShoppingCart.products.some((p) =>
          p.idProduct.name.toLowerCase().includes(search)
        ) ||
        lastState.includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [ordersClient, filterStatus, searchTerm]);


  //  Estadísticas
  const stats = useMemo(
    () => [
      {
        label: "Total Pedidos",
        value: ordersClient.length,
        icon: Package,
        color: "from-blue-500 to-blue-600",
      },
      {
        label: "En Proceso",
        value: ordersClient.filter((p) => {
          const lastState = p.shippingState?.at(-1)?.state.toLowerCase() || "";
          return lastState === "pendiente" || lastState === "en proceso" || lastState === "enviado";
        }).length,
        icon: Truck,
        color: "from-yellow-500 to-orange-500",
      },
      {
        label: "Completados",
        value: ordersClient.filter((p) => {
          const lastState = p.shippingState?.at(-1)?.state.toLowerCase() || "";
          return lastState === "completado";
        }).length,
        icon: CheckCircle,
        color: "from-green-500 to-green-600",
      },
    ],
    [ordersClient]
  );


  //  Render principal
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="text-center lg:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Pedidos
        </h1>
        <p className="text-gray-600">Gestiona y revisa todos tus pedidos</p>
      </header>

      {/* Search & Filter */}
      <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100">
        <form
          className="flex flex-col lg:flex-row gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Buscar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar pedido"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-rose-200 focus:border-rose-400 focus:ring-rose-200 rounded-xl"
            />
          </div>

          {/* Filtro */}
          <div className="relative w-full lg:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none w-full h-12 pl-10 pr-4 rounded-xl border border-rose-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <option value="todos">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="en proceso">En Proceso</option>
              <option value="enviado">Enviado</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </form>
      </section>

      {/* Contenido */}
      {isLoading ? (
        <div className="text-center text-gray-500 text-lg font-medium py-10">
          Cargando pedidos...
        </div>
      ) : (
        <>
          {/* Lista */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-rose-100 min-h-96">
            {filteredOrders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="w-3xs bg-white rounded-2xl overflow-hidden shadow-md border border-rose-100 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 max-w-md"
                    // 💡 EVENTO CLIC: Abre el detalle al hacer clic en cualquier parte del card
                    onClick={() => setSelectedOrder(order)}
                  >
                    <img
                      src={order.idShoppingCart.products?.[0]?.idProduct?.images?.[0]}
                      alt={order.idShoppingCart.products?.[0]?.idProduct?.name || "Producto"}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        ORD: {order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">
                        Estado: {order.shippingState?.at(-1)?.state || "Desconocido"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: ${order.total}
                      </p>
                      <p className="text-sm text-gray-500">
                        Método de pago: {order.paymentMethod}
                      </p>
                      {/* <Button
                        className={`w-full mt-3 py-2 text-white text-xs ${order.isValued // Asume que este campo existe
                          ? "bg-gray-400 hover:bg-gray-500 cursor-default"
                          : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                          }`}
                        disabled={order.isValued}
                        onClick={(e) => {
                          e.stopPropagation(); // Evita que se dispare el onClick del div
                          setSelectedOrder(order); // Abrir el modal para confirmar la valoración
                        }}
                      >
                        <Star className="w-4 h-4 mr-2" />
                        {order.isValued ? "Ya Valorado" : "Valorar Servicio"}
                      </Button>
                       */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center shadow-2xl mb-6">
                  <ShoppingCart className="w-12 h-12 text-rose-500 animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  ¡No se encontraron pedidos!
                </h3>
                <p className="text-gray-600 mb-8">
                  Intenta cambiar el filtro o buscar otro nombre.
                </p>
                <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Link to="/products">Explorar Productos</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {stats.map(({ label, value, icon: Icon, color }, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{label}</p>
                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${color} shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 💡 RENDER DEL MODAL DE DETALLE */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

    </div>
  );
}
