// Librerias
import express from "express";

// Controlador
import productPriceHistory from "../controllers/productPriceHistoryController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/:productId").get(productPriceHistory.getProductPriceHistory);

export default router;
