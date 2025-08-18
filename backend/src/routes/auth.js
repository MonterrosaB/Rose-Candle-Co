import express from "express";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.get("/verify", verifyToken, (req, res) => {
  // req.user viene del middleware
  res.status(200).json({
    id: req.user.id,
    isAdmin: req.user.isAdmin,
    name: req.user.name,
    surnames: req.user.surnames,
    phone: req.user.phone,
    email: req.user.email,
    dui: req.user.dui,
    user: req.user.user,
  });
});

export default router;
