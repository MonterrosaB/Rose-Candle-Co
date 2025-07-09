import express from "express";
import registerCustomersController from "../controllers/registerCustomersController.js";

const router = express.Router()

router.route("/").post(registerCustomersController.registerCustomers)
//router.route("/verifyEmailCode").post(registerCustomersController.verifyEmailCode)

export default router