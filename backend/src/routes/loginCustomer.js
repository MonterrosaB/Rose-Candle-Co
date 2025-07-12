import express from "express"
import loginCustomerController from "../controllers/loginCustomerController.js"

const router = express.Router();

router.route("/")
.post(loginCustomerController.login)

router.get("/verifyCustomer", loginCustomerController.verifyCustomer);

export default router;