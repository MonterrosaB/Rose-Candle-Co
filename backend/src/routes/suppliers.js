// Librerias
import express from "express";
import authEmployees from "../middlewares/authEmployees.js";

// Controlador
import suppliersControllers from "../controllers/suppliersControllers.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router
  .route("/")
  .get(suppliersControllers.getSuppliers)
  .post(authEmployees, suppliersControllers.createSuppliers);

router
  .route("/:id")
  .get(suppliersControllers.getSupplierById)
  .put(authEmployees, suppliersControllers.updateSuppliers)
  .delete(authEmployees, suppliersControllers.hardDeleteSuppliers);

// Rutas específicas
router
  .route("/restore/:id")
  .patch(authEmployees, suppliersControllers.restoreSuppliers); // restaurar por id
router
  .route("/softdelete/:id")
  .patch(authEmployees, suppliersControllers.softDeleteSuppliers); // eliminar por id

export default router;
