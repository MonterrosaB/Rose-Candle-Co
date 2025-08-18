// Librerias
import express from "express";

// Controlador
import productionCostHistoryController from "../controllers/productionCostHistoryController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router
  .route("/")
  .get(productionCostHistoryController.getProductionCostHistory)
  .post(productionCostHistoryController.createProductionCostHistory);

router.route("/profitSummary").get(productionCostHistoryController.getProductsCostAndProfit);


router
  .route("/:id")
  .put(productionCostHistoryController.updateproductionCostHistory)
  .delete(productionCostHistoryController.deleteProductionCostHistory);

// Rutas específicas
router
  .route("/restore/:id")
  .put(productionCostHistoryController.restoreProductionCostHistory); // restaurar por id

export default router;
