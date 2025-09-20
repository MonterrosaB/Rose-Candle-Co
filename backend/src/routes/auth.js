import express from "express";
import authEmployee from "../middlewares/authEmployees.js";
import authCustomer from "../middlewares/authCustomers.js";

const router = express.Router();

router.get("/verifyEmployee", authEmployee, (req, res) => {
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

router.get("/verifyCustomer", authCustomer, (req, res) => {
  // req.customer viene del middleware
  return res.status(200).json({
    id: req.customer.id,
    name: req.customer.name,
    surnames: req.customer.surnames,
    email: req.customer.email,
    phone: req.customer.phone,
    addresses: req.customer.addresses,
    idCart: req.customer.idCart,
  });
});

export default router;
