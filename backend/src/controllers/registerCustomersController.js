import customersModel from "../models/Customers.js"; // Modelo de Clientes
import bcryptjs from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; // Token
import { config } from "../config.js";

import { sendEmail, HTMLWelcomeMail } from "../utils/mailWelcome.js";

// Array de métodos (CRUD)
const registerCustomersController = {};

// POST
registerCustomersController.registerCustomers = async (req, res) => {
  // Obtener datos
  const { name, surnames, email, password, user, phone, addresses } = req.body;

  try {
    // Validaciones
    if (
      !name ||
      !surnames ||
      !email ||
      !phone ||
      !password ||
      !user ||
      !addresses ||
      !Array.isArray(addresses) ||
      addresses.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" });
    }

    if (
      name.length < 3 ||
      surnames.length < 3 ||
      phone.length < 9 ||
      password.length < 8
    ) {
      return res.status(400).json({ message: "Too short" });
    }

    if (name.length > 100 || surnames.length > 100) {
      return res.status(400).json({ message: "Too large" });
    }

    for (const addr of addresses) {
      if (addr.address.length > 250) {
        return res.status(400).json({ message: "Address too large" });
      }
    }

    // Validar formato de teléfono
    const phoneRegex = /^\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ message: "Formato de teléfono inválido (####-####)" });
    }

    // Validar contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "La contraseña debe incluir mayúscula, minúscula, número y símbolo",
      });
    }

    // Verificar si el cliente ya existe
    const existCustomer = await customersModel.findOne({ email });
    if (existCustomer) {
      return res.status(400).json({ message: "Customer already exists" }); // Error del cliente, cliente duplicado
    }

    // Encriptar contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    const cleanAddresses = addresses.map((addr) => ({
      address: addr.address,
      isDefault: addr.isDefault ?? false,
      type: addr.type && addr.type.trim() !== "" ? addr.type : undefined, // <--- Si no viene, Mongoose pone default
    }));

    console.log("Addresses recibidas:", addresses);
    console.log("Addresses final:", cleanAddresses);

    // Guardar datos
    const newCustomer = new customersModel({
      name,
      surnames,
      email,
      password: passwordHash,
      user,
      phone,
      addresses: cleanAddresses,
    });

    await newCustomer.save();

    await sendEmail(
      email,
      "Bienvenida a Rosé Candle Co | Rosé Candle Co.",
      "Un gusto tenerte aquí!",
      HTMLWelcomeMail(name)
    );

    // Token
    jsonwebtoken.sign(
      { id: newCustomer._id }, // 1 - Qué voy a guardar
      config.JWT.secret, // 2 - Secreto
      { expiresIn: config.JWT.expiresIn }, // 3 - Expiración
      (error, token) => {
        // 4 - Función callback
        if (error) {
          console.log("Token error: " + error);
          return res.status(500).json({ message: "Token generation failed" }); // Error al generar token
        }

        res.cookie("authToken", token); // Guardar token como cookie
        res.status(200).json({ message: "Customer saved" }); // Todo bien
      }
    );
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// Exportar
export default registerCustomersController;
