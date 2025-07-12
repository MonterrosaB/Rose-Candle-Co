import employeesModel from "../models/Employees.js"; // Modelo de empleados
import bcryptjs from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; // Token
import { config } from "../config.js";

// Array de métodos (CRUD)
const registerEmployeesController = {};

// POST
registerEmployeesController.registerEmployees = async (req, res) => {
  // Obtener datos
  const { name, surnames, email, phone, dui, password, user, role, isActive } =
    req.body;

  console.log(req.body);

  try {
    // Validaciones
    if (
      !name ||
      !surnames ||
      !email ||
      !phone ||
      !dui ||
      !password ||
      !user ||
      !isActive
    ) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" }); // Error del cliente, campos vacíos
    }

    if (
      name.length < 3 ||
      surnames.length < 3 ||
      phone.length < 9 ||
      dui.length < 10 ||
      password.length < 8
    ) {
      return res.status(400).json({ message: "Too short" }); // Error del cliente, longitud del texto muy corta
    }

    if (name.length > 100 || surnames.length > 100) {
      return res.status(400).json({ message: "Too large" }); // Error del cliente, longitud del texto muy larga
    }

    // Verificar si el empleado ya existe
    const existEmployee = await employeesModel.findOne({ email });
    if (existEmployee) {
      return res.status(400).json({ message: "Employee already exists" }); // Error del cliente, empleado duplicado
    }

    // Encriptar contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Guardar datos
    const newEmployee = new employeesModel({
      name,
      surnames,
      email,
      phone,
      dui,
      password: passwordHash,
      user,
      role,
      isActive,
    });

    await newEmployee.save();

    // Token
    jsonwebtoken.sign(
      { id: newEmployee._id }, // 1 - Qué voy a guardar
      config.JWT.secret, // 2 - Secreto
      { expiresIn: config.JWT.expiresIn }, // 3 - Expiración
      (error, token) => {
        // 4 - Función callback
        if (error) {
          console.log("Token error: " + error);
          return res.status(500).json({ message: "Token generation failed" }); // Error al generar token
        }

        res.cookie("authToken", token); // Guardar token como cookie
        res.status(200).json({ message: "Employee saved" }); // Todo bien
      }
    );
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// Exportar
export default registerEmployeesController;
