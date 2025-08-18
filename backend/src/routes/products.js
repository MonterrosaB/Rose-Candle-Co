// Librerias
import express from "express";
import multer from "multer";
// Controlador
import productsController from "../controllers/productsController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

const upload = multer({ dest: "public/" });

router
  .route("/")
  .get(productsController.getproducts)
  .post(upload.array("images"), productsController.createProduct);

router.route("/available").get(productsController.getAvailableProducts);

router.route("/productsOrders").get(productsController.getProductsForOrders);
router.route("/bestSellers").get(productsController.getBestSellers); // productos mas vendidos
router.route("/worstSellers").get(productsController.getWorstSellers); // productos mas vendidos
router.route("/salesByCategory").get(productsController.getProductByCategory); //ventas por categoria

router
  .route("/:id")
  .get(productsController.getProductById)
  .put(upload.array("images"), productsController.updateProduct)
  .delete(productsController.deleteProduct);

// Rutas específicas
router.route("/restore/:id").put(productsController.restoreProduct); // restaurar por id

export default router;
