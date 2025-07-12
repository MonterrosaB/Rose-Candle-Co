// Librerias
import express from "express";

// Controlador
import productCategories from "../controllers/productCategoriesController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(productCategories.getproductCategories)
.post(productCategories.createProductCategory) 

router.route("/:id")
.get(productCategories.getProductCategoryById) 
.put(productCategories.updateProductCategory)
.delete(productCategories.deleteProductCategory)

export default router;