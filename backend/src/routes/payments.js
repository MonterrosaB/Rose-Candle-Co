import { Router } from "express";
import { getToken, testPayment, payment3ds } from "../controllers/paymentsController.js";

const router = Router();

// Rutas de pagos con Wompi
router.post("/token", getToken);
router.post("/testPayment", testPayment);
router.post("/payment3ds", payment3ds);

export default router;
