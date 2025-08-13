// Lógica para la página de home
import React, { useState, useEffect } from "react";
import { Boxes, DollarSign, User } from "lucide-react";
import CardWidgets from "./components/CardWidgets";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import PopularProducts from "./components/PopularProducts";
import DataGrid from "../../global/components/DataGrid";
import useHome from "./hooks/useHome"; // Hook

const Home = () => {
  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = "Home | Rosé Candle Co.";
  }, []);

  const {
    customerCount,
    latestCustomerCount,
    totalOrders,
    currentMonthOrders,
    totalEarnings,
    monthlyEarnings,
    lowStockMaterials,
    bestSellingProducts,
  } = useHome();

  // Columnas del stock
  const columnsMaterial = {
    Materia: "Materia",
    Cantidad: "Cantidad",
  };

  // Contenido de la tabla del stock
  const rowsMaterial = lowStockMaterials.map((material) => ({
    Materia: material.name,
    Cantidad: `${material.currentStock} ${material.unit}`,
  }));

  const columnsOrders = {
    Nombre: "Nombre",
    "Fecha Pedido": "Orders",
    Ubicación: "Ubicacion",
    "Productos Totales": "Productos",
  };

  const rowsOrders = [
    {
      Nombre: "Rodrigo Monterrosa",
      Orders: "1 May, 2025 : 15:12",
      Ubicacion: "La Libertad",
      Productos: "10",
    },
    {
      Nombre: "Rodrigo Monterrosa",
      Orders: "1 May, 2025 : 15:12",
      Ubicacion: "La Libertad",
      Productos: "10",
    },
    {
      Nombre: "Rodrigo Monterrosa",
      Orders: "1 May, 2025 : 15:12",
      Ubicacion: "La Libertad",
      Productos: "10",
    },
    {
      Nombre: "Rodrigo Monterrosa",
      Orders: "1 May, 2025 : 15:12",
      Ubicacion: "La Libertad",
      Productos: "10",
    },
  ];

  return ( 
    <PrincipalDiv>
      <h1 className="text-2xl font-semibold mb-4 ml-15">
        Bienvenida de nuevo, Eli
      </h1>

      {/* Widgets */}
      <div className="w-full flex flex-wrap justify-center gap-x-14 gap-y-8">
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
      <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center">
        <div className="w-full lg:w-2/3">
          <DataGrid
            title={"Valores bajos de materia prima"}
            columns={columnsMaterial}
            rows={rowsMaterial}
            editable={false}
          />
        </div>
        
        <div className="w-full flex justify-center lg:w-1/3 lg:flex lg:justify-center">
          <PopularProducts data={bestSellingProducts} />
        </div>
      </div>

      <div className="w-full">
        <DataGrid
          title={"Últimos pedidos"}
          columns={columnsOrders}
          rows={rowsOrders}
          editable={false}
        />
      </div>
      
    </PrincipalDiv>
  );
};
export default Home;
