import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
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

export default function OrdersSection() {

  const { ordersClient, isLoading } = useClientOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");

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


  // ✅ Estadísticas
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
          return lastState === "pendiente" || lastState === "en proceso";
        }).length,
        icon: Truck,
        color: "from-yellow-500 to-orange-500",
      },
      {
        label: "Completados",
        value: ordersClient.filter((p) => {
          const lastState = p.shippingState?.at(-1)?.state.toLowerCase() || "";
          return lastState === "entregado";
        }).length,
        icon: CheckCircle,
        color: "from-green-500 to-green-600",
      },
    ],
    [ordersClient]
  );


  // ✅ Render principal
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
              <option value="entregado">Entregado</option>
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
    </div>
  );
}
