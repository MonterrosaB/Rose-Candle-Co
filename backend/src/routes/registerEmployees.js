import express from "express";
import registerEmployeesController from "../controllers/registerEmployeesController.js";
import { initialAccessCheck } from "../middlewares/initialAccess.js";

const router = express.Router();

router
  .route("/")
  .post(initialAccessCheck, registerEmployeesController.registerEmployees);

export default router;
