// Libreria de express
import express from "express"

// Routes
import customersRoutes from "./src/routes/customers.js"

// Constante para la libreria que importé
const app = express();

// Que acepte datos json
app.use(express.json());

// Rutas de las funciones
app.use("/api/customers", customersRoutes)

// Exportar
export default app;