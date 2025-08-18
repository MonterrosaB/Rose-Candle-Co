import express from "express";
import salesOrderController from "../controllers/salesOrderController.js";

const router = express.Router();

router
  .route("/")
  .get(salesOrderController.getSalesOrders)
  .post(salesOrderController.createSalesOrder);

router.route("/count").get(salesOrderController.countSalesOrderAndTotal);
router.route("/countTotal").get(salesOrderController.countOrdersGeneralAndMonthly); // cantidad de pedidos por mes
router.route("/totalEarnings").get(salesOrderController.totalEarnings); // total de ingresos
router.route("/latestOrders").get(salesOrderController.getLatestOrders); // ùltimos pedidos
router.route("/salesEvolution").get(salesOrderController.getSalesEvolution); // ùltimos pedidos
router.route("/salesProfit").get(salesOrderController.getTotalSalesAndProfit); // ùltimos pedidos
router.route("/summary").get(salesOrderController.getSalesAndProfitSummary); // ùltimos pedidos

router.route("/createSalesOrder").post(salesOrderController.createSalesOrderPrivate)//


// Rutas específicas antes de rutas dinámicas
router.get("/user/:userId", salesOrderController.getUserCartWithProducts);

// Luego las rutas dinámicas para ID
router
  .route("/:id")
  .put(salesOrderController.updateSalesOrder)
  .delete(salesOrderController.deleteSalesOrder);

router.route("/restore/:id").put(salesOrderController.restoreSalesOrder);

export default router;
