// controllers/loginCustomerController.js

import bcryptjs from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { config } from "../config.js";
import customersModel from "../models/Customers.js";

const loginCustomerController = {};

loginCustomerController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await customersModel.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const isValidPassword = await bcryptjs.compare(password, customer.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear token
    const token = JsonWebToken.sign(
      { id: customer._id, userType: "client" },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn }
    );

    // Enviar cookie y respuesta
    res.cookie("authToken", token);
    res.status(200).json({ message: "Inicio de sesión exitoso" });

  } catch (error) {
    console.error("Error en login cliente:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export default loginCustomerController;
