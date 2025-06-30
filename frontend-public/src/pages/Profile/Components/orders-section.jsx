import { useState } from "react"
import {
  Search,
  Filter,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
} from "lucide-react"

const Button = ({ children, className = "", onClick, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
)

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

// DATOS DE PRUEBA 
const pedidos = [
  {
    id: 1,
    nombre: "Vela Aromática Rosada",
    estado: "pendiente",
    imagen: "https://media1.luminalpark.com/rt:fit/w:768/h:0/g:sm/plain/https://media1.luminalpark.com/media/52/b0/5f/1724340561/76044_C01.jpg?ts=1724340561",
  },
  {
    id: 2,
    nombre: "Vela de Lavanda",
    estado: "enviado",
    imagen: "https://mejorconsalud.as.com/wp-content/uploads/2015/05/velas-en-casa.jpg",
  },
  {
    id: 3,
    nombre: "Vela de Vainilla",
    estado: "entregado",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfRYCGMldXK9x8Z5ZCmBU8-639ZT4iCCy4pQ&s",
  },
  {
    id: 4,
    nombre: "Set de Velas Navideñas",
    estado: "cancelado",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqNXwz_9odjW0a-2VhPjMRO6c9n97Pvyl5kQ&s",
  },
]

export default function OrdersSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideBusqueda = pedido.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const coincideEstado =
      filterStatus === "todos" || pedido.estado === filterStatus
    return coincideBusqueda && coincideEstado
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Pedidos
        </h1>
        <p className="text-gray-600">Gestiona y revisa todos tus pedidos</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar Pedido"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-rose-200 focus:border-rose-400 focus:ring-rose-200 rounded-xl"
            />
          </div>

          <div className="relative w-full lg:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none w-full h-12 pl-10 pr-4 rounded-xl border border-rose-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <option value="todos">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="enviado">Enviado</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          <Button className="h-12 px-8 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            BUSCAR
          </Button>
        </div>
      </div>

      {/* Cards de pedidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pedidosFiltrados.length > 0 ? (
          pedidosFiltrados.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-rose-100 hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
            >
              <img
                src={pedido.imagen}
                alt={pedido.nombre}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{pedido.nombre}</h3>
                <p className="text-sm text-gray-600 capitalize">
                  Estado: {pedido.estado}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-rose-100 col-span-full">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center shadow-2xl mb-6">
              <ShoppingCart className="w-12 h-12 text-rose-500 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">¡No se encontraron pedidos!</h3>
            <p className="text-gray-600 mb-8">Intenta cambiar el filtro o buscar otro nombre.</p>
            <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Explorar Productos
            </Button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Pedidos", value: pedidos.length, icon: Package, color: "from-blue-500 to-blue-600" },
          { label: "En Proceso", value: pedidos.filter(p => p.estado === "pendiente" || p.estado === "enviado").length, icon: Truck, color: "from-yellow-500 to-orange-500" },
          { label: "Completados", value: pedidos.filter(p => p.estado === "entregado").length, icon: CheckCircle, color: "from-green-500 to-green-600" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
