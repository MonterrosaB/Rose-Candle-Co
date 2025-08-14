import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Componente que muestra un gráfico circular de los productos más populares
const PopularProducts = ({ data }) => {
  // Colores definidos para las secciones del gráfico
  const COLORS = ["#E8DCC3", "#C2A878", "#A3A380"];

  return (
    // Contenedor principal con estilos de tarjeta
    <div className="w-80 h-64 shadow-xl rounded-2xl p-4 flex flex-col justify-center min-w-80 ">
      {/* Título del gráfico */}
      <h2 className="text-md font-semibold text-center pt-5">
        Productos Populares
      </h2>

      {/* Contenedor del gráfico y la leyenda */}
      <div className="flex items-center justify-center h-full">
        {/* Contenedor responsivo para adaptar el gráfico al tamaño disponible */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Muestra información al pasar el cursor sobre una sección */}
            <Tooltip />

            {/* Configuración del gráfico circular */}
            <Pie
              data={data} // Datos recibidos como prop
              dataKey="totalQuantity" // Valor usado para calcular proporciones
              nameKey="productName" // Nombre mostrado en el tooltip
              innerRadius={40} // Radio interno del gráfico
              outerRadius={60} // Radio externo del gráfico
              paddingAngle={5} // Espaciado entre secciones
              stroke="none" // Elimina el borde entre secciones
            >
              {/* Crea una celda por cada entrada con color asignado */}
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]} // Cicla los colores si hay más datos que colores
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Leyenda al lado del gráfico */}
        <ul className="ml-4 text-sm pr-6">
          {data.map((entry, index) => (
            <li key={entry._id} className="flex items-center space-x-4 ml-4">
              {/* Indicador de color correspondiente al gráfico */}
              <span
                className="w-3 h-3 rounded-full inline-block mr-4 pl-3"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>

              {/* Nombre del producto, truncado si es muy largo */}
              <span> 
                {entry.productName.length > 10
                  ? entry.productName.slice(0, 10) + "..."
                  : entry.productName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopularProducts;
