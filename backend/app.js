// Libreria de express
import express from "express"

// Routes
import customersRoutes from "./src/routes/customers.js"
import employeesRoutes from "./src/routes/employees.js"
import historyRawMaterialsRoutes from "./src/routes/historyRawMaterials.js";
import productPriceHistoryRoutes from "./src/routes/productPriceHistory.js";

// Constante para la libreria que importé
const app = express();

// Que acepte datos json
app.use(express.json());

// Rutas de las funciones
app.use("/api/customers", customersRoutes)
app.use("/api/employees", employeesRoutes)
//app.use("/api/historyRawMaterials", historyRawMaterialsRoutes)
//app.use("/api/productPriceHistory",productPriceHistoryRoutes)

// Exportar
export default app;