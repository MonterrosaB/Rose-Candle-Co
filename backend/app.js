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
import productCategoriesRoutes from "./src/routes/productCategories.js"
import productsRoutes from "./src/routes/products.js"
import suppliers from "./src/routes/suppliers.js";
import rawMaterialCategories from "./src/routes/rawMaterialCategories.js";
import rawMaterials from "./src/routes/rawMaterial.js";
import materialBalance from "./src/routes/materialBalance.js"
import productionCostHistoryRoutes from "./src/routes/productionCostHistory.js"

// Constante para la libreria de express
const app = express();

// Que acepte datos json
app.use(express.json());

// Rutas de las funciones
app.use("/api/customers", customersRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/suppliers", suppliers)
app.use("/api/rawMaterialCategories", rawMaterialCategories)
app.use("/api/rawMaterials", rawMaterials)
app.use("/api/materialBalance", materialBalance)
//app.use("/api/historyRawMaterials", historyRawMaterialsRoutes)
//app.use("/api/productPriceHistory",productPriceHistoryRoutes)
//app.use("/api/shoppingCart", shoppingCartRoutes)
//app.use("/api/collections", collectionsRoutes)
//app.use("/api/salesOrder", salesOrderRoutes)
app.use("/api/productCategories", productCategoriesRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/productionCostHistory", productionCostHistoryRoutes)



// Exportar
export default app;