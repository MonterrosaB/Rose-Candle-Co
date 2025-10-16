// Librerias
import express from "express";
import authEmployees from "../middlewares/authEmployees.js";

// Controlador
import rawMaterialCategoriesControllers from "../controllers/rawMaterialCategoriesControllers.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router
  .route("/")
  .get(rawMaterialCategoriesControllers.getCategories)
  .post(authEmployees, rawMaterialCategoriesControllers.createCategory);

router
  .route("/:id")
  .get(rawMaterialCategoriesControllers.getCategoryById)
  .put(authEmployees, rawMaterialCategoriesControllers.updateCategory)
  .delete(authEmployees, rawMaterialCategoriesControllers.hardDeleteCategory);

// Rutas específicas
router
  .route("/restore/:id")
  .patch(
    authEmployees,
    rawMaterialCategoriesControllers.restoreRawMaterialCategories
  ); // restaurar por id
router
  .route("/softdelete/:id")
  .patch(authEmployees, rawMaterialCategoriesControllers.softDeleteCategory); // restaurar por id

export default router;
