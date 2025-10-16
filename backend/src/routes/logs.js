import express from "express";
import logsControllers from "../controllers/loggerController.js";

const router = express.Router();

router.route("/").get(logsControllers.getLogs);

export default router;
