// Librerias
import express from "express";

// Controlador
import rawMaterialCategoriesControllers from "../controllers/rawMaterialCategoriesControllers.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(rawMaterialCategoriesControllers.getCategories)
.post(rawMaterialCategoriesControllers.createCategory) 

router.route("/:id")
.get(rawMaterialCategoriesControllers.getCategoryById)
.put(rawMaterialCategoriesControllers.updateCategory)
.delete(rawMaterialCategoriesControllers.deleteCategory)

// Rutas específicas
router.route("/restore/:id")
  .put(rawMaterialCategoriesControllers.restoreRawMaterialCategories); // restaurar por id

export default router;