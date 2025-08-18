// Librerias
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Swagger
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

// Constante para la librería de express
const app = express(); // <-- Inicializar app primero

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://rose-candle-co-t1as.vercel.app",
      "https://rose-candle-co-imt9.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

// Cargar Swagger después de inicializar app
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./rose-67d-Rose-1.0.0-resolved.json"), "utf-8")
);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
import loginRoutes from "./src/routes/login.js";
import customersRoutes from "./src/routes/customers.js";
import employeesRoutes from "./src/routes/employees.js";
import historyRawMaterialsRoutes from "./src/routes/historyRawMaterials.js";
import productPriceHistoryRoutes from "./src/routes/productPriceHistory.js";
import collectionsRoutes from "./src/routes/collections.js";
import shoppingCartRoutes from "./src/routes/shoppingCart.js";
import salesOrderRoutes from "./src/routes/salesOrder.js";
import productCategoriesRoutes from "./src/routes/productCategories.js";
import productsRoutes from "./src/routes/products.js";
import suppliers from "./src/routes/suppliers.js";
import rawMaterialCategories from "./src/routes/rawMaterialCategories.js";
import rawMaterials from "./src/routes/rawMaterial.js";
import materialBalance from "./src/routes/materialBalance.js";
import productionCostHistoryRoutes from "./src/routes/productionCostHistory.js";
import registerEmployeesRoutes from "./src/routes/registerEmployees.js";
import registerCustomersRoutes from "./src/routes/registerCustomers.js";
import loginCustomerRoutes from "./src/routes/loginCustomer.js";
import logoutCustomerRoutes from "./src/routes/logoutCustomer.js";
import logoutRoutes from "./src/routes/logout.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import paymentsRoutes from "./src/routes/payments.js";
import authRoutes from "./src/routes/auth.js";

// Montar rutas
app.use("/api/customers", customersRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/suppliers", suppliers);
app.use("/api/rawMaterialCategories", rawMaterialCategories);
app.use("/api/rawMaterials", rawMaterials);
app.use("/api/materialBalance", materialBalance);
app.use("/api/historyRawMaterials", historyRawMaterialsRoutes);
app.use("/api/productPriceHistory", productPriceHistoryRoutes);
app.use("/api/cart", shoppingCartRoutes);
app.use("/api/collections", collectionsRoutes);
app.use("/api/salesOrder", salesOrderRoutes);
app.use("/api/productCategories", productCategoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/productionCostHistory", productionCostHistoryRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/loginCustomer", loginCustomerRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/logoutCustomer", logoutCustomerRoutes);
app.use("/api/registerCustomer", registerCustomersRoutes);
app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/recoveryPassword", recoveryPasswordRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/auth", authRoutes);

// Exportar app
export default app;
