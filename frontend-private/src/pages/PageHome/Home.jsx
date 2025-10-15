// Lógica para la página de home
import React, { useEffect, useContext } from "react";
import { Boxes, DollarSign, User, CircleUser, Settings } from "lucide-react";
import CardWidgets from "./components/CardWidgets";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import PopularProducts from "./components/PopularProducts";
import DataGrid from "./components/DataGrid.jsx";
import { AuthContext } from "../../global/context/AuthContext";
import useHome from "./hooks/useHome";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Soporte para i18n

const Home = () => {
  const { t } = useTranslation("home"); // Namespace del archivo home.json
  const { user } = useContext(AuthContext);

  const {
    customerCount,
    latestCustomerCount,
    totalOrders,
    currentMonthOrders,
    totalEarnings,
    monthlyEarnings,
    lowStockMaterials,
    bestSellingProducts,
    latestOrders,
  } = useHome();

  // Cambiar título del documento dinámicamente según el idioma
  useEffect(() => {
    document.title = `${t("document_title")} | Rosé Candle Co.`;
  }, [t]);

  // Columnas para la tabla de materia prima
  const columnsMaterial = {
    [t("column_material_name")]: "name",
    [t("column_stock_current")]: "stockWithUnit",
    [t("column_diff_to_minimum")]: "diffToMinimum",
  };

  // Columnas para la tabla de últimos pedidos
  const columnsOrders = {
    [t("column_customer_name")]: "customerName",
    [t("column_order_date")]: "purchaseDate",
    [t("column_shipping_address")]: "shippingAddress",
    [t("column_total_amount")]: "totalAmount",
    [t("column_items_ordered")]: "itemsOrdered",
  };

  return (
    <PrincipalDiv>
      {/* Encabezado con enlace al perfil */}
      <div className="flex mb-1 justify-between items-center">
        <Link to="/profile" className="flex flex-wrap mb-1 items-center max-w-max">

          <CircleUser strokeWidth={2.5} className="cursor-pointer" />
          <h1 className="text-2xl font-semibold ml-2">
            {t("welcome_back")} {user?.name || "usuario"}
          </h1>
        </Link>
        <Link to="/profile" className="flex flex-wrap mb-1 items-center max-w-max">
          <Settings strokeWidth={2.5} className="cursor-pointer" />
        </Link>





      </div>

      {/* Tarjetas de widgets */}
      <div className="w-full flex flex-wrap justify-center gap-x-14 gap-y-8 mb-1">
        <CardWidgets
          bgColor={"#F7F5EE"}
          textColor={"#333"}
          tittle={t("total_orders")}
          value={totalOrders.toString()}
          increment={`${currentMonthOrders} ${t("last_month_orders")}`}
          icon={<Boxes size={32} strokeWidth={2.5} />}
        />
        <CardWidgets
          bgColor={"#C2A878"}
          textColor={"#FFFFFF"}
          tittle={t("total_earnings")}
          value={`$${totalEarnings}`}
          increment={`$${monthlyEarnings} ${t("monthly_earnings")}`}
          icon={<DollarSign size={32} strokeWidth={3} />}
        />
        <CardWidgets
          bgColor={"#F7F5EE"}
          textColor={"#333"}
          tittle={t("total_users")}
          value={customerCount}
          increment={`${latestCustomerCount} ${t("latest_users")}`}
          icon={<User size={32} strokeWidth={3} />}
        />
      </div>

      {/* Tablas responsivas */}
      <div className="flex flex-col lg:flex-row gap-4 mb-1 items-center">
        {/* Tabla de materiales */}
        <div className="w-full lg:w-2/3">
          <DataGrid
            title={t("low_stock_title")}
            columns={columnsMaterial}
            rows={lowStockMaterials}
            editable={false}
            rowsPerPage={3}
          />
        </div>

        {/* Productos más vendidos */}
        <div className="w-full flex justify-center lg:w-1/3 lg:flex lg:justify-center">
          <PopularProducts data={bestSellingProducts} />
        </div>
      </div>

      {/* Últimos pedidos */}
      <div className="w-full lg:w-14/15">
        <DataGrid
          title={t("recent_orders_title")}
          columns={columnsOrders}
          rows={latestOrders}
          editable={false}
          rowsPerPage={3}
        />
      </div>
    </PrincipalDiv>
  );
};

export default Home;
