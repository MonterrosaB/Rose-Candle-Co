import express from "express";

import salesOrderController from "../controllers/salesOrderController.js";

const router = express.Router();

router
  .route("/")
  .get(salesOrderController.getSalesOrders)
  .post(salesOrderController.createSalesOrder);

router.route("/count").get(salesOrderController.countSalesOrderAndTotal);
router.route("/salesByCategory").get(salesOrderController.getProductByCategory);
router.route("/countTotal").get(salesOrderController.countOrdersGeneralAndMonthly); // cantidad de pedidos por mes
router.route("/totalEarnings").get(salesOrderController.totalEarnings); // total de ingresos
router.route("/latestOrders").get(salesOrderController.getLatestOrders); // total de ingresos

router
  .route("/:id")
  .put(salesOrderController.updateSalesOrder)
  .delete(salesOrderController.deleteSalesOrder);

// Rutas específicas
router.route("/restore/:id").put(salesOrderController.restoreSalesOrder); // restaurar por id

export default router;
