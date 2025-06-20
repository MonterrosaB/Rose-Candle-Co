import customersModel from "../models/Customers.js"; // Modelo de Clientes
import bcryptjs from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; // Token
import { config } from "../config.js";

// Array de métodos (CRUD)
const registerCustomersController = {};

// POST
registerCustomersController.registerCustomers = async (req, res) => {
  // Obtener datos
  const { name, surnames, email, password, user, phone } = req.body;

  try {
    // Validaciones
    if (!name || !surnames || !email || !phone || !password || !user) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" }); // Error del cliente, campos vacíos
    }

    if (
      name.length < 3 ||
      surnames.length < 3 ||
      phone.length < 9 ||
      password.length < 8
    ) {
      return res.status(400).json({ message: "Too short" }); // Error del cliente, longitud del texto muy corta
    }

    if (name.length > 100 || surnames.length > 100) {
      return res.status(400).json({ message: "Too large" }); // Error del cliente, longitud del texto muy larga
    }

    // Verificar si el cliente ya existe
    const existCustomer = await customersModel.findOne({ email });
    if (existCustomer) {
      return res.status(400).json({ message: "Customer already exists" }); // Error del cliente, cliente duplicado
    }

    // Encriptar contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Guardar datos
    const newCustomer = new customersModel({
      name,
      surnames,
      email,
      password: passwordHash,
      user,
      phone,
    });

    await newCustomer.save();

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