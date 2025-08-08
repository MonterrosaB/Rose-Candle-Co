import express from "express";
import registerCustomersController from "../controllers/registerCustomersController.js";

const router = express.Router()

// Registro
router.route("/").post(registerCustomersController.registerCustomers)

// Verificación
router.route("/requestCode").post(registerCustomersController.requestCode)
router.route("/verifyCode").post(registerCustomersController.verifyCode)

export default router