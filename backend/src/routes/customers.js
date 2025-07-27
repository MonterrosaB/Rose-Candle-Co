// Librerias
import express from "express";

// Controlador
import customersController from "../controllers/customersController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(customersController.getCustomers)

router.route("/:id")
.put(customersController.updateCustomers)
.delete(customersController.deleteCustomers)

// Rutas específicas
router.route("/restore/:id")
  .put(customersController.restoreCustomers); // restaurar por id

export default router;