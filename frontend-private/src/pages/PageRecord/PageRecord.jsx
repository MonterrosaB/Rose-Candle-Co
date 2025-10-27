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

// 💡 ASUME que tienes un hook para la traducción, por ejemplo, de react-i18next:
import { useTranslation } from "react-i18next"; // Añade esta línea

const PageRecord = () => {
  // 💡 Usa el hook de traducción
  const { t } = useTranslation("record");

  // 💡 Usa la clave de traducción en el efecto de título
  useEffect(() => {
    document.title = t("page_title");
  }, [t]);

  const {
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
    if (materialsBalance?.length && selectedMaterial) {
      const data = materialsBalance
        // 1. Filtra por el material seleccionado
        .filter(
          (item) =>
            item.idMaterial &&
            item.idMaterial._id === selectedMaterial &&
            // 2. FILTRAR SOLO POR MOVIMIENTOS DE "entrada"
            item.movement === "entrada"
        )
        // 3. Ordenar por fecha, crucial para gráficos de tiempo
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        // 4. Mapear al formato esperado por el gráfico
        .map((item) => ({
          // Usar la fecha del movimiento para el eje X
          date: item.date,
          // Usar la fecha de creación/actualización para el eje X si es más precisa
          // o usar solo 'date' o 'createdAt' dependiendo de lo que uses en <XAxis>
          createdAt: item.createdAt,
          // 5. Establecer el Precio de Compra (asumiendo que está en 'unitPrice')
          currentPrice: item.unitPrice,
          // 6. Puedes incluir la cantidad de la entrada como contexto si lo deseas
          amount: item.amount,
        }));

      // Usar 'date' o 'createdAt' en dataKey de <XAxis> según tu necesidad:
      // Actualmente, el gráfico usa 'updatedAt' en el ejemplo, revisa cuál es el campo de fecha correcto
      // para tu objeto 'materialsBalance'. Usaré 'date' aquí.

      setFilteredData(data);
      // console.log(data); // Para verificar los datos
    } else {
      // Manejar el caso de que no haya datos o no haya material seleccionado
      setFilteredData([]);
    }
  }, [selectedMaterial, materialsBalance]); // Asegúrate de que materialsBalance sea la dependencia

  // Filtrado de balance de material
  useEffect(() => {
    try {
      if (materialsBalance?.length && selectedMaterial) {
        let runningTotal = 0;
        const data = materialsBalance
          .filter((item) => {
            //  CORRECCIÓN CLAVE: Verifica que item.idMaterial no sea null/undefined
            return item.idMaterial && item.idMaterial._id === selectedMaterial;
          })
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
      } else if (
        selectedMaterial &&
        !materialsBalance.some(
          (item) => item.idMaterial && item.idMaterial._id === selectedMaterial
        )
      ) {
        // Opcional: Manejar el caso donde no hay balance para el material seleccionado
        setFilteredBalance([]);
        // Puedes agregar aquí un toast o un log si necesitas notificar al usuario
        console.error(
          `No se encontró balance para el material ID: ${selectedMaterial}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedMaterial, materialsBalance]);

  // Calcular producción y precios de producto al cambiar selección
  useEffect(() => {
    if (selectedProduct) {
      getProducctionProducts(selectedProduct);
      getProductPriceHistorial(selectedProduct);
    }
  }, [selectedProduct]);

  // 💡 Columnas de la tabla con traducción
  const tableColumns = {
    [t("datagrid_col_product")]: "product",
    [t("datagrid_col_variant")]: "variantName",
    [t("datagrid_col_raw_material")]: "material",
    [t("datagrid_col_quantity")]: "quantity",
    [t("datagrid_col_cost")]: "cost",
  };

  const productTableColumns = {
    [t("datagrid_col_product")]: "name",
    [t("datagrid_col_quantity")]: "totalQuantity", // Usamos Cantidad como 'Unidades'
    [t("datagrid_col_cost")]: "totalRevenue", // Usamos Costo como 'Ingresos Generados'
  };

  if (isLoading) {
    return (
      <PrincipalDiv>
        {/* 💡 Traducción del estado de carga */}
        <p className="text-center text-lg text-gray-500">{t("loading_data")}</p>
      </PrincipalDiv>
    );
  }

  return (
    <PrincipalDiv>
      {/* 📦 Materia Prima - Título principal con traducción */}
      <h2 className="text-center text-3xl font-bold mb-4">
        {t("section_material")}
      </h2>

      {/* DropDownFilter - Etiqueta con traducción */}
      <DropDownFilter
        options={materials.map((m) => ({ _id: m._id, name: m.name }))}
        value={selectedMaterial}
        onChange={(e) => setSelectedMaterial(e.target.value)}
        label={t("label_material")}
        all={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Gráfico 1: Precio de Compra - Título con traducción */}
        <ChartCard title={t("chart_title_purchase_price")}>
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
              {/* Tooltip - Contenido de tooltip puede requerir traducción interna */}
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="currentPrice"
                stroke="#C2A878"
                // Nombre de la línea con traducción
                name={t("line_name_unit_price")}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Gráfico 2: Balance de Materia - Título con traducción */}
        <ChartCard title={t("chart_title_material_balance")}>
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
              {/* Tooltip - Contenido de tooltip puede requerir traducción interna */}
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="amount" stroke="#C2A878" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-center">
          {/*  Título de la tabla de costos */}
          {t("datagrid_title_material_cost_breakdown")}
        </h3>
        <DataGrid columns={tableColumns}
          rows={materialCost || []}
          editable={false}
          rowsPerPage={6} />
      </div>

      <div className="flex justify-center items-center">
        <Widget
          bgColor="#F7F5EE"
          textColor="#333"
          // Título del Widget con traducción
          title={t("widget_title_current_inventory")}
          value={`$${inventoryValue?.toFixed(2) || 0}`}
          variant="compact"
        />
      </div>

      {/*  Productos - Título principal con traducción */}
      <h2 className="text-center text-3xl font-bold mt-10 mb-4">
        {t("section_products")}
      </h2>

      {/* DropDownFilter - Etiqueta con traducción */}
      <DropDownFilter
        options={optionProducts}
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        label={t("label_product")}
        all={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gráfica de línea de precio del producto - Título con traducción */}
        <div className="bg-white p-4 rounded-xl shadow col-span-1 lg:col-span-2 min-h-66">
          <h3 className="text-md font-semibold mb-2">
            {t("chart_title_product_price")}
          </h3>
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
                      stroke={
                        ["#C2A878", "#8884d8", "#82ca9d", "#FF8042"][idx % 4]
                      }
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-md text-gray-500 text-center">
              {/*  Mensaje sin historial de precios con traducción */}
              {t("no_price_historial")}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col justify-center items-center gap-4">
          <Widget
            bgColor="#F7F5EE"
            textColor="#333"
            // Título del Widget con traducción
            title={t("widget_title_product_production")}
            value={production || 0}
            variant="compact"
          />
        </div>
      </div>
    </PrincipalDiv>
  );
};

export default PageRecord;