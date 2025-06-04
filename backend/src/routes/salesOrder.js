
import express from "express";


import salesOrderController from "../controllers/salesOrderController.js";


const router = express.Router();


router.route("/")
  .get(salesOrderController.getSalesOrders)
  .post(salesOrderController.createSalesOrder);


router.route("/:id")
  .put(salesOrderController.updateSalesOrder)
  .delete(salesOrderController.deleteSalesOrder);

export default router;
