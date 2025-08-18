// Lógica para la página de home
import React, { useState, useEffect, useContext } from "react";
import { Boxes, DollarSign, User, CircleUser } from "lucide-react";
import CardWidgets from "./components/CardWidgets";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import PopularProducts from "./components/PopularProducts";
import DataGrid from "./components/DataGrid.jsx";
import { AuthContext } from "../../global/context/AuthContext"; // Para el nombre del usuario
import useHome from "./hooks/useHome"; // Hook
import { Link } from "react-router-dom";

const Home = () => {
  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = "Home | Rosé Candle Co.";
  }, []);

  const { user } = useContext(AuthContext); // Nombre del usuario

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

  // Columnas del stock
  const columnsMaterial = {
    Materia: "name",
    "Stock Actual": "stockWithUnit",
    Diferencia: "diffToMinimum",
  };

  // Columnas de ùltimos pedidos
  const columnsOrders = {
    Nombre: "customerName",
    "Fecha Pedido": "purchaseDate",
    Ubicación: "shippingAddress",
    Total: "totalAmount",
    "Productos Totales": "itemsOrdered",
  };

  return (
    <PrincipalDiv>
      <Link to="/profile">
        <div className="flex flex-wrap mb-1 items-center">
          <CircleUser strokeWidth={2.5} className="cursor-pointer" />
          <h1 className="text-2xl font-semibold ml-2">
            Hola de nuevo, {user?.name || "usuario"}
          </h1>
        </div>
      </Link>

      {/* Widgets */}
      <div className="w-full flex flex-wrap justify-center gap-x-14 gap-y-8 mb-1">
        <CardWidgets
          bgColor={"#F7F5EE"}
          textColor={"#333"}
          tittle={"Pedidos Totales"}
          value={totalOrders.toString()}
          increment={currentMonthOrders.toString()}
          icon={<Boxes size={32} strokeWidth={2.5} />}
        />
        <CardWidgets
          bgColor={"#C2A878"}
          textColor={"#FFFFFF"}
          tittle={"Ingresos Totales"}
          value={`$${totalEarnings.toString()}`}
          increment={`$${monthlyEarnings.toString()}`}
          icon={<DollarSign size={32} strokeWidth={3} />}
        />
        <CardWidgets
          bgColor={"#F7F5EE"}
          textColor={"#333"}
          tittle={"Usuarios Totales"}
          value={customerCount.toString()}
          increment={latestCustomerCount.toString()}
          icon={<User size={32} strokeWidth={3} />}
        />
      </div>

      {/* Grid responsive */}
      <div className="flex flex-col lg:flex-row gap-4 mb-1 items-center">
        <div className="w-full lg:w-2/3">
          <DataGrid
            title={"Valores bajos de materia prima"}
            columns={columnsMaterial}
            rows={lowStockMaterials}
            editable={false}
            rowsPerPage={3} // Se limita la cantidad de materia prima
          />
        </div>

        <div className="w-full flex justify-center lg:w-1/3 lg:flex lg:justify-center">
          <PopularProducts data={bestSellingProducts} />
        </div>
      </div>

      <div className="w-full lg:w-14/15">
        <DataGrid
          title={"Últimos pedidos"}
          columns={columnsOrders}
          rows={latestOrders}
          editable={false}
          rowsPerPage={3} // Se limita la cantidad de pedidos
        />
      </div>
    </PrincipalDiv>
  );
};
export default Home;
