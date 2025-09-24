import { useState, useEffect } from "react";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import Widget from "../../global/components/Widget";

import CustomTooltip from "./components/CustomTooltip";
import ChartCard from "./components/ChartCard";

import DropDownFilter from "../../global/components/DropDownFilter";

import useRecord from "./hooks/useRecord";
import useOptions from "./hooks/useOptions";

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
  useEffect(() => {
    document.title = "Historial | Rosé Candle Co.";
  }, []);

  const {
    bestSellers,
    worstSellers,
    dataM,
    materialsBalance,
    materials,
    materialCost,
    inventoryValue,
    production,
    getProducctionProducts,
    priceHistorial,
    getProductPriceHistorial,
    isLoading,
  } = useRecord();

  const { optionProducts } = useOptions();

  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [filteredBalance, setFilteredBalance] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Inicializar selectedMaterial
  useEffect(() => {
    if (materials?.length && !selectedMaterial) {
      setSelectedMaterial(materials[0]._id);
    }
  }, [materials, selectedMaterial]);

  // Inicializar selectedProduct
  useEffect(() => {
    if (optionProducts?.length && !selectedProduct) {
      setSelectedProduct(optionProducts[0]._id);
    }
  }, [optionProducts, selectedProduct]);

  // Filtrado de precios por material
  useEffect(() => {
    if (materials?.length && selectedMaterial) {
      const data = materials
        .filter((item) => item._id === selectedMaterial)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredData(data);
    }
  }, [selectedMaterial, materials]);

  // Filtrado de balance de material
  useEffect(() => {
    if (materialsBalance?.length && selectedMaterial) {
      let runningTotal = 0;
      const data = materialsBalance
        .filter((item) => item.idMaterial._id === selectedMaterial)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((item) => {
          if (item.movement === "entrada") runningTotal += item.amount;
          else if (item.movement === "salida") runningTotal -= item.amount;
          return {
            date: item.date,
            createdAt: item.createdAt,
            amount: runningTotal,
          };
        });

      setFilteredBalance(data);
    }
  }, [selectedMaterial, materialsBalance]);

  // Calcular producción y precios de producto al cambiar selección
  useEffect(() => {
    if (selectedProduct) {
      getProducctionProducts(selectedProduct);
      getProductPriceHistorial(selectedProduct);
    }
  }, [selectedProduct]);

  const tableColumns = {
    Producto: "product",
    Variante: "variantName",
    "Materia Prima": "material",
    Cantidad: "quantity",
    Costo: "cost",
  };

  const productTableColumns = {
    Producto: "name",
    Unidades: "totalQuantity",
    "Ingresos Generados": "totalRevenue",
  };

  if (isLoading) {
    return (
      <PrincipalDiv>
        <p className="text-center text-lg text-gray-500">Cargando datos...</p>
      </PrincipalDiv>
    );
  }

  return (
    <PrincipalDiv>
      {/* 📦 Materia Prima */}
      <h2 className="text-center text-3xl font-bold mb-4">Materia Prima</h2>

      <DropDownFilter
        options={materials.map((m) => ({ _id: m._id, name: m.name }))}
        value={selectedMaterial}
        onChange={(e) => setSelectedMaterial(e.target.value)}
        label="Material"
        all={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <ChartCard title="Precio de Compra">
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

      <DataGrid columns={tableColumns} rows={materialCost || []} editable={false} />

      <div className="flex justify-center items-center">
        <Widget
          bgColor="#F7F5EE"
          textColor="#333"
          title="Inventario Actual"
          value={`$${inventoryValue?.toString() || 0}`}
          variant="compact"
        />
      </div>

      {/* 📦 Productos */}
      <h2 className="text-center text-3xl font-bold mt-10 mb-4">Productos</h2>

      <DropDownFilter
        options={optionProducts}
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        label="Producto"
        all={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gráfica de línea de precio del producto */}
        <div className="bg-white p-4 rounded-xl shadow col-span-1 lg:col-span-2 min-h-66">
          <h3 className="text-md font-semibold mb-2">Precio de Producto</h3>
          {priceHistorial?.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={priceHistorial}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {Object.keys(priceHistorial[0])
                  .filter((key) => key !== "name")
                  .map((variant, idx) => (
                    <Line
                      key={variant}
                      type="monotone"
                      dataKey={variant}
                      stroke={["#C2A878", "#8884d8", "#82ca9d", "#FF8042"][idx % 4]}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-md text-gray-500 text-center">
              No hay historial de precios
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col justify-center items-center gap-4">
          <Widget
            bgColor="#F7F5EE"
            textColor="#333"
            title="Producción de Producto"
            value={production || 0}
            variant="compact"
          />
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
            rows={bestSellers || []}
            editable={false}
          />
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Productos menos vendidos
          </h3>
          <DataGrid
            columns={productTableColumns}
            rows={worstSellers || []}
            editable={false}
          />
        </div>
      </div>
    </PrincipalDiv>
  );
};

export default PageRecord;
