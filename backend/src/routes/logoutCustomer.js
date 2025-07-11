import express from "express"
import logoutCustomerController from "../controllers/logoutCustomerController.js"

const router = express.Router();

router.route("/")
.post(logoutCustomerController.logout)

export default router;