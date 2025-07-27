// Librerias
import express from "express";

// Controlador
import productPriceHistory from "../controllers/productPriceHistoryController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(productPriceHistory.getProductPriceHistory)
.post(productPriceHistory.createProductPriceHistory) 

router.route("/:id")
.put(productPriceHistory.updateProductPriceHistory)
.delete(productPriceHistory.deleteProductPriceHistory)

// Rutas específicas
router.route("/restore/:id")
  .put(productPriceHistory.restoreProductPriceHistory); // restaurar por id

export default router;