import express from "express";

import salesOrderController from "../controllers/salesOrderController.js";

const router = express.Router();

router
  .route("/")
  .get(salesOrderController.getSalesOrders)
  .post(salesOrderController.createSalesOrder);

router.route("/count").get(salesOrderController.countSalesOrderAndTotal);
router.route("/salesByCategory").get(salesOrderController.getProductByCategory);


router
  .route("/:id")
  .put(salesOrderController.updateSalesOrder)
  .delete(salesOrderController.deleteSalesOrder);

// Rutas específicas
router.route("/restore/:id").put(salesOrderController.restoreSalesOrder); // restaurar por id

export default router;
