// Librerias
import express from "express";
import authEmployees from "../middlewares/authEmployees.js";

// Controlador
import productCategories from "../controllers/productCategoriesController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router
  .route("/")
  .get(productCategories.getproductCategories)
  .post(authEmployees, productCategories.createProductCategory);

router
  .route("/:id")
  .get(productCategories.getProductCategoryById)
  .put(authEmployees, productCategories.updateProductCategory)
  .delete(authEmployees, productCategories.hardDeleteProductCategory);

// Rutas específicas
router
  .route("/softdelete/:id")
  .patch(authEmployees, productCategories.softDeleteProductCategory); // restaurar por id
router
  .route("/restore/:id")
  .patch(authEmployees, productCategories.restoreCategory); // restaurar por id

export default router;
