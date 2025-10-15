// Librerias
import express from "express";
import authEmployees from "../middlewares/authEmployees.js";

// Controlador
import employeesController from "../controllers/employeesController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.get("/count", employeesController.countEmployees);

router.route("/").get(employeesController.getEmployees);

router
  .route("/:id")
  .get(authEmployees, employeesController.getEmployeesById)
  .put(authEmployees, employeesController.updateEmployees)
  .delete(authEmployees, employeesController.hardDeleteEmployees);

// Rutas específicas
router
  .route("/softdelete/:id")
  .patch(authEmployees, employeesController.softDeleteEmployees); // eliminar por id
router
  .route("/restore/:id")
  .patch(authEmployees, employeesController.restoreEmployees); // restaurar por id

export default router;
