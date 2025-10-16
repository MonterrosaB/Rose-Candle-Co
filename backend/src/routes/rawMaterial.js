// Librerias
import express from "express";
import authEmployees from "../middlewares/authEmployees.js";

// Controlador
import rawMaterialsController from "../controllers/rawMaterialControllers.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router
  .route("/")
  .get(rawMaterialsController.getrawMaterial)
  .post(authEmployees, rawMaterialsController.createrRawMaterial);

router
  .route("/:id")
  .put(authEmployees, rawMaterialsController.updaterRawMaterial)
  .delete(authEmployees, rawMaterialsController.hardDeleterRawMaterial);

// Rutas específicas
router
  .route("/restore/:id")
  .patch(authEmployees, rawMaterialsController.restoreRawMaterials); // restaurar por id

router
  .route("/softdelete/:id")
  .patch(authEmployees, rawMaterialsController.softDeleterRawMaterial); // restaurar por id

router
  .route("/lowStock") // materia prima con bajo stock
  .get(rawMaterialsController.getLowestRawMaterials);

router
  .route("/inventoryValue") // materia prima con bajo stock
  .get(rawMaterialsController.getInventoryValue);

export default router;
