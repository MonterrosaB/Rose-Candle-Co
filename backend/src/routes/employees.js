// Librerias
import express from "express";

// Controlador
import employeesController from "../controllers/employeesController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(employeesController.getEmployees)
.post(employeesController.createEmployees) 

router.route("/:id")
.put(employeesController.updateEmployees)
.delete(employeesController.deleteEmployees)

export default router;