import { useState, useEffect } from "react";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import Widget from "../../global/components/Widget";

import CustomTooltip from "./components/CustomTooltip";
import ChartCard from "./components/ChartCard";

import DropDownFilter from "../../global/components/DropDownFilter"

import useRecord from "./hooks/useRecord";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const PageRecord = () => {
  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = "Historial | Rosé Candle Co.";
  }, []);

  const { bestSellers, worstSellers, dataM, materialsBalance, materials, materialCost, inventoryValue } = useRecord();

  const [selectedMaterial, setSelectedMaterial] = useState(
    materials.length > 0 ? materials[0]._id : ''
  ); const [filteredBalance, setFilteredBalance] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    if (materials?.length) {
      const data = materials
        .filter((item) => item._id === selectedMaterial)
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // orden por fecha
      setFilteredData(data);
    }
  }, [selectedMaterial, materials]);

  useEffect(() => {
    if (materialsBalance?.length && selectedMaterial) {
      // 1. Filtrar solo movimientos del material seleccionado
      const data = materialsBalance
        .filter((item) => item.idMaterial._id === selectedMaterial)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      // 2. Calcular saldo acumulado
      let runningTotal = 0;
      const balanceData = data.map((item) => {
        if (item.movement === "entrada") {
          runningTotal += item.amount;
        } else if (item.movement === "salida") {
          runningTotal -= item.amount;
        }

        return {
          date: item.date, // eje X
          createdAt: item.createdAt, // si prefieres este campo para el eje X
          amount: runningTotal, // saldo acumulado
        };
      });

      setFilteredBalance(balanceData);
    }
  }, [selectedMaterial, materialsBalance]);

  useEffect(() => {
    if (materials?.length && !selectedMaterial) {
      setSelectedMaterial(materials[0]._id);
    }
  }, [materials]);




  // 📊 Datos demo
  const chartData = [
    { name: "Ene", value: 200 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 250 },
    { name: "Abr", value: 400 },
    { name: "May", value: 350 },
  ];

  const tableColumns = {
    "Producto": "product",
    "Variante": "variantName",
    "Materia Prima": "material",
    "Cantidad": "quantity",
    "Costo": "cost"
  };

  const productTableColumns = {
    Producto: "name",
    Unidades: "totalQuantity",
    "Ingresos Generados": "totalRevenue",
  };

  return (
    <PrincipalDiv>
      {/* 📦 Materia Prima */}
      <h2 className="text-center text-3xl font-bold mb-4">Materia Prima</h2>
      {/* Widgets y gráficas */}
      <div>
        <DropDownFilter
          options={materials.map((m) => ({ _id: m._id, name: m.name }))}
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
          label="Material"
          all={false}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <ChartCard
            title="Precio de Compra"
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="updatedAt"
                  tickFormatter={(tick) =>
                    new Date(tick).toLocaleDateString("es-ES")
                  }
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="line"
                  dataKey="currentPrice"
                  stroke="#C2A878"
                  name="Precio Unitario"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Balance de Materia">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={filteredBalance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="createdAt"
                  tickFormatter={(tick) =>
                    new Date(tick).toLocaleDateString("es-ES")
                  }
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="amount" stroke="#C2A878" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

      </div>
      <DataGrid columns={tableColumns} rows={materialCost} editable={false} />

      <div className="flex justify-center items-center">
        <Widget
          bgColor="#F7F5EE"
          textColor="#333"
          title="Inventario Actual"
          value={`$${inventoryValue.toString()}`}
          variant="compact"
        />
      </div>


      {/* 📦 Productos */}
      <h2 className="text-center text-3xl font-bold mt-10 mb-4">Productos</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gráfica de línea ocupa 2 columnas en pantallas grandes */}
        <div className="bg-white p-4 rounded-xl shadow col-span-1 lg:col-span-2">
          <h3 className="text-md font-semibold mb-2">Precio de Producto</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#C2A878" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Widgets en vertical para pantallas pequeñas y en columna en pantallas grandes */}
        <div className="flex flex-col sm:flex-row lg:flex-col justify-center items-center gap-4">
          <Widget
            bgColor="#F7F5EE"
            textColor="#333"
            tittle="Producción de Producto"
            value="250p"
            variant="compact"
          />
          <Widget
            bgColor="#F7F5EE"
            textColor="#333"
            tittle="Margen de Ganancia"
            value="25%"
            variant="compact"
          />
        </div>
      </div>


      {/* 📊 Evolución de Ventas + Stock vs Mínimo */}
      <div className="w-full gap-4 my-6">
        {/* Evolución de Ventas */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-md font-semibold mb-2">Evolución de Ventas</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dataM}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ingresos" stroke="#C2A878" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📊 Más y menos vendidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Productos más vendidos
          </h3>
          <DataGrid
            columns={productTableColumns}
            rows={bestSellers}
            editable={false}
          />
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Productos menos vendidos
          </h3>
          <DataGrid
            columns={productTableColumns}
            rows={worstSellers}
            editable={false}
          />
        </div>
      </div>
    </PrincipalDiv>
  );
};

export default PageRecord;
