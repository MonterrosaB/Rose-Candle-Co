// Libreria de express
import express from "express"

// Routes
import customersRoutes from "./src/routes/customers.js"
import employeesRoutes from "./src/routes/employees.js"
import historyRawMaterialsRoutes from "./src/routes/historyRawMaterials.js";
import productPriceHistoryRoutes from "./src/routes/productPriceHistory.js";
import collectionsRoutes from "./src/routes/collections.js";
import shoppingCartRoutes from "./src/routes/shoppingcart.js"
import salesOrderRoutes from "./src/routes/salesOrder.js"
// Constante para la libreria que importé
const app = express();

// Que acepte datos json
app.use(express.json());

// Rutas de las funciones
app.use("/api/customers", customersRoutes)
app.use("/api/employees", employeesRoutes)
//app.use("/api/historyRawMaterials", historyRawMaterialsRoutes)
//app.use("/api/productPriceHistory",productPriceHistoryRoutes)
//app.use("/api/shoppingCart", shoppingCartRoutes)
//app.use("/api/collections", collectionsRoutes)
//app.use("/api/salesOrder", salesOrderRoutes)


// Exportar
export default app;