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
.put(employeesController.updateEmployees)
.delete(employeesController.deleteEmployees)

export default router;