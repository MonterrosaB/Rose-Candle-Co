import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import Widget from "../../global/components/Widget";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PageRecord = () => {
  // 📊 Datos demo
  const chartData = [
    { name: "Ene", value: 200 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 250 },
    { name: "Abr", value: 400 },
    { name: "May", value: 350 },
  ];

  const tableData = [
    {
      producto: "Calmness",
      materia: "Cera de Soja",
      unidad: "g",
      cantidad: 100,
      costoUnitario: "$2.00",
      costoTotal: "$20",
    },
    {
      producto: "Calmness",
      materia: "Cera de Soja",
      unidad: "g",
      cantidad: 100,
      costoUnitario: "$2.00",
      costoTotal: "$20",
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

  const productTableData = [
    { producto: "Calmness", unidades: 250, ingresos: "$5000" },
    { producto: "Pantalón", unidades: 100, ingresos: "$3000" },
  ];

  const productTableColumns = {
    Producto: "producto",
    Unidades: "unidades",
    "Ingresos Generados": "ingresos",
  };

  return (
    <PrincipalDiv>
      {/* 📌 Título General */}
      <h1 className="text-center text-2xl font-bold mb-8">Registro General</h1>

      {/* 📦 Materia Prima */}
      <h2 className="text-xl font-semibold mb-4">Materia Prima</h2>
      <DataGrid columns={tableColumns} rows={tableData} editable={false} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-md font-semibold mb-2">Precio de Compra</h3>
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
        <Widget
          bgColor="#F7F5EE"
          textColor="#333"
          tittle="Inventario Anual"
          value="$750"
          variant="compact"
        />
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

      {/* 🏷️ Productos */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-md font-semibold mb-2">Evolución de Ventas</h3>
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
        <DataGrid
          columns={productTableColumns}
          rows={productTableData}
          editable={false}
        />
      </div>
    </PrincipalDiv>
  );
};

export default PageRecord;
