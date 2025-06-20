// Importar librerias y modelos
import bcryptjs from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { config } from "../config.js";
import customersModel from "../models/Customers.js";
import employeesModel from "../models/Employees.js";

const loginController = {};

// Función para el login
loginController.login = async (req, res) => {
  // Solicitar información
  const { email, password } = req.body;

  try {
    // Posibles niveles:
    // 1. Administrador
    // 2. Empleado
    // 3. Cliente

    let userFound; // Guardar el usuario encontrado
    let userType; // Guardar el tipo de usuario encontrado

    // 1. Administrador
    if (
      email === config.ADMIN.emailAdmin &&
      password === config.ADMIN.passwordAdmin
    ) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      // 2. Empleado
      userFound = await employeesModel.findOne({ email });
      userType = "employee";
      if (!userFound) {
        // 3. Cliente
        userFound = await customersModel.findOne({ email });
        userType = "client";
      }
    }

    if (!userFound) {
      return res.status(400).json({ message: "User not found" }); // Usuario no encontrado
    }

    // Validar la contraseña (solo si no es admin)
    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" }); // Contraseña incorrecta
      }
    }

    // TOKEN
    JsonWebToken.sign(
      { id: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) console.log("error" + error);
        res.cookie("authToken", token);
        res.status(200).json({ message: "Login succesful" }); // todo bien
      }
    );
  } catch (error) {
    console.log("error " + error);
  }
};

// Exportar
export default loginController;