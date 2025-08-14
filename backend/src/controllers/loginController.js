// Importar librerías y modelos
import bcryptjs from "bcryptjs"; // Para encriptar y comparar contraseñas
import JsonWebToken from "jsonwebtoken"; // Para generar tokens JWT
import { config } from "../config.js"; // Archivo de configuración
import employeesModel from "../models/Employees.js"; // Modelo de empleados

// Controlador de login
const loginController = {};

// Función para el login
loginController.login = async (req, res) => {
  // Solicitar información del cuerpo de la solicitud
  const { user, password } = req.body;

  try {
    // Posibles niveles de usuario:
    // 1. Administrador
    // 2. Empleado

    let userFound; // Guardar el usuario encontrado
    let userType; // Guardar el tipo de usuario encontrado

    // Verificar si existe un usuario

    userFound = await employeesModel.findOne({ user }); // Buscar empleado por el usuario

    if (!userFound) {
      return res.status(400).json({ message: "User not found" }); // Usuario no existe
    }

    // Verificar contraseña
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Verificar el rol del usuario
    userType = userFound.role; // Ej: "admin" o "employee"

    // Generar y firmar el token JWT
    const token = JsonWebToken.sign(
      { id: userFound._id, userType },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } // ej: "30d"
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // HTTPS no necesario en localhost
      sameSite: "Lax", // funciona en localhost
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("error " + error); // Log de error general
  }
};

// Exportar controlador
export default loginController;
