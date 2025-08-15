import express from "express";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.get("/verify", verifyToken, (req, res) => {
  // req.user viene del middleware
  res.status(200).json({
    id: req.user.id,
    userType: req.user.userType,
    name: req.user.name
  });
});

export default router;
