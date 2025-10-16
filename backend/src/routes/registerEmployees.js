import express from "express";
import registerEmployeesController from "../controllers/registerEmployeesController.js";
import authEmployees from "../middlewares/authEmployees.js";
import { initialAccessCheck } from "../middlewares/initialAccess.js";

const router = express.Router();

router
  .route("/")
  .post(
    initialAccessCheck,
    authEmployees,
    registerEmployeesController.registerEmployees
  );

export default router;
