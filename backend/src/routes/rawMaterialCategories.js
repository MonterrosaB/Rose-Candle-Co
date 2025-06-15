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
.put(rawMaterialCategoriesControllers.updateCategory)
.delete(rawMaterialCategoriesControllers.deleteCategory)

export default router;