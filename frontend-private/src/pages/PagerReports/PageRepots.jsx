import PrincipalDiv from "../../global/components/PrincipalDiv";
import { Link } from "react-router";
import { useEffect } from "react";
import useSales from "./hooks/useSales";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import Widget from "../../global/components/Widget";
import OrdersByCategory from "./components/OrdersByCategory";
import AverageSellByOrders from "./components/AverageSellByOrders";
import DataGrid from "../../global/components/DataGrid";

const PageReports = () => {
  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = "Reportes | Rosé Candle Co.";
  }, []);

  const {
    loading,
    orders,
    carts,
    data6M,
    dataD,
    dataM,
    productProfit,
    bestSellers,
    worstSellers,
    soldByCategory,
  } = useSales();

  const columns = {
    Producto: "Product",
    "Precio de Venta": "salePrice",
    "Costo de Producción": "productionCost",
    "%": "Earnigs",
  };

  const productTableColumns = {
    Producto: "name",
    Unidades: "totalQuantity",
    "Ingresos Generados": "totalRevenue",
  };

  return (
    <PrincipalDiv>
      {loading ? (
        <p className="text-center text-gray-400">
          No hay movimientos para esta materia
        </p>
      ) : (
        <div className="pt-15">
          {/* Widgets superiores */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <Widget
                title="Pedidos del Mes"
                value={orders.cantidadPedidos}
                bgColor="#F7F5EE"
                textColor="#333"
                variant="compact"
              />
              <Widget
                title="Tasa de Carritos Abandonados"
                value={carts}
                bgColor="#F7F5EE"
                textColor="#333"
                variant="compact"
              />
              <Widget
                title="Ingresos del Mes"
                value={`$${orders.totalVentas}`}
                bgColor="#F7F5EE"
                textColor="#333"
                variant="compact"
              />
              <Widget
                title="Ganancias del Mes"
                value={`$${dataM.ganancias}`}
                bgColor="#F7F5EE"
                textColor="#333"
                variant="compact"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-6">
            <div className="w-full lg:w-1/2 mb-4 xl:mb-0">
              <OrdersByCategory data={soldByCategory} />
            </div>
            <div className="w-full">
              <div className="bg-[#C2A878] h-full rounded-2xl p-6 flex flex-col justify-between text-white shadow-lg">
                <h2 className="text-2xl font-semibold mb-2">
                  Ganancia del Día
                </h2>
                <p className="text-6xl font-bold text-center">
                  ${dataD.ganancias}
                </p>
                <div className="flex justify-center">
                  <Link
                    to="/order"
                    className="border border-white rounded-md px-4 py-2 hover:bg-white hover:text-[#C2A878] transition"
                  >
                    Ver Ventas
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mb-4 xl:mb-0">
              <AverageSellByOrders
                tittle="Tamaño Promedio de Compras"
                value={`$${parseFloat(orders.averageOrderValue).toFixed(2)}`}
                bgColor="#F7F5EE"
                textColor="#333"
                variant="compact"
              />
            </div>
          </div>

          {/* Gráficos superiores */}
          <div className="flex flex-col xl:flex-row gap-6 mb-6">
            <div className="w-full  bg-white rounded-2xl shadow-md p-6 h-80 ">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Ingresos vs Ganancias
              </h2>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data6M} barCategoryGap={10} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      borderColor: "#e5e7eb",
                    }}
                    labelStyle={{ color: "#374151" }}
                  />
                  <Legend
                    wrapperStyle={{
                      top: 0,
                      right: 0,
                      fontSize: "14px",
                      color: "#374151",
                    }}
                  />
                  <Bar
                    dataKey="ingresos"
                    fill="#C2A878"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="ganancias"
                    fill="#9E9E9E"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <DataGrid
              title="Ganancias por producto"
              columns={columns}
              rows={productProfit}
              editable={false}
            />
          </div>
          {/* Más y menos vendidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Productos Más Vendidos
              </h3>
              <DataGrid
                columns={productTableColumns}
                rows={bestSellers}
                editable={false}
              />
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Productos Menos Vendidos
              </h3>
              <DataGrid
                columns={productTableColumns}
                rows={worstSellers}
                editable={false}
              />
            </div>
          </div>
        </div>
      )}
    </PrincipalDiv>
  );
};

export default PageReports;
