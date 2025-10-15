import express from "express";
import registerEmployeesController from "../controllers/registerEmployeesController.js";
import authEmployees from "../middlewares/authEmployees.js";

const router = express.Router();

router
  .route("/")
  .post(authEmployees, registerEmployeesController.registerEmployees);

export default router;
