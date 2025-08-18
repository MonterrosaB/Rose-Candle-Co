import { useState, useEffect } from "react";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import Widget from "../../global/components/Widget";

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

  const { bestSellers, worstSellers, dataM, materialsBalance, materials } = useRecord();

  const [selectedMaterial, setSelectedMaterial] = useState(
    materials?.[0]?.idMaterial?._id || ""
  );
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (materials?.length) {
      const data = materials
        .filter((item) => item.idMaterial._id === selectedMaterial)
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // orden por fecha
      setFilteredData(data);
    }
  }, [selectedMaterial, materials]);




  // 📊 Datos demo
  const chartData = [
    { name: "Ene", value: 200 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 250 },
    { name: "Abr", value: 400 },
    { name: "May", value: 350 },
  ];

  // 📊 Datos Stock vs Mínimo
  const stockMinData = [
    { name: "Calmness", stock: 150, minimo: 100 },
    { name: "Vela Aromática", stock: 80, minimo: 50 },
    { name: "Difusor", stock: 50, minimo: 40 },
    { name: "Gorra", stock: 20, minimo: 10 },
  ];

  const tableData = [
    {
      producto: "Calmness",
      materia: "Cera de Soja",
      unidad: "kg",
      cantidad: 300,
      costoUnitario: "$2.50",
      costoTotal: "$750",
    },
    {
      producto: "Calmness",
      materia: "Cera de Soja",
      unidad: "kg",
      cantidad: 150,
      costoUnitario: "$5.00",
      costoTotal: "$750",
    },
  ];

  const tableColumns = {
    Producto: "producto",
    "Materia Prima": "materia",
    Unidad: "unidad",
    "Cantidad Utilizada": "cantidad",
    "Costo Unitario": "costoUnitario",
    "Costo Total": "costoTotal",
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
      <DataGrid columns={tableColumns} rows={tableData} editable={false} />

      {/* Widgets y gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-md font-semibold mb-2">Precio de Compra</h3>
          <DropDownFilter
            options={materials.map((m) => ({
              _id: m.idMaterial._id,
              name: m.idMaterial.name,
            }))}
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            label="Material"
            all={false} // ya no hay opción "Todos"
          />
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(tick) =>
                  new Date(tick).toLocaleDateString("es-ES")
                }
              />
              <YAxis />
              <Tooltip
                labelFormatter={(label) =>
                  `Fecha: ${new Date(label).toLocaleString()}`
                }
              />
              <Line
                type="monotone"
                dataKey="unitPrice"
                stroke="#C2A878"
                name="Precio Unitario"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center items-center">
          <Widget
            bgColor="#F7F5EE"
            textColor="#333"
            tittle="Inventario Anual"
            value="$750"
            variant="compact"
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-md font-semibold mb-2">Balance de Materia</h3>
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
