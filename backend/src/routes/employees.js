// Librerias
import express from "express";

// Controlador
import employeesController from "../controllers/employeesController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.get("/count", employeesController.countEmployees);

router.route("/")
.get(employeesController.getEmployees)

router.route("/:id")
.get(employeesController.getEmployeesById)
.put(employeesController.updateEmployees)
.delete(employeesController.deleteEmployees)

// Rutas específicas
router.route("/restore/:id")
  .put(employeesController.restoreEmployees); // restaurar por id

export default router;