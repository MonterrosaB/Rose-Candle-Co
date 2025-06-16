// Librerias
import express from "express";

// Controlador
import productionCostHistoryController from "../controllers/productionCostHistoryController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(productionCostHistoryController.getProductionCostHistory)
.post(productionCostHistoryController.createProductionCostHistory) 

router.route("/:id")
.put(productionCostHistoryController.updateproductionCostHistory)
.delete(productionCostHistoryController.deleteProductionCostHistory)

export default router;