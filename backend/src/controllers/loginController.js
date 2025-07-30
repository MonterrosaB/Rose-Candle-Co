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
  const { email, password } = req.body;

  try {
    // Posibles niveles de usuario:
    // 1. Administrador (email y password definidos en config)
    // 2. Empleado (almacenado en base de datos)

    let userFound; // Guardar el usuario encontrado
    let userType; // Guardar el tipo de usuario encontrado

    // Verificar si es un administrador
    if (
      email === config.admin.emailAdmin &&
      password === config.admin.passwordAdmin
    ) {
      userType = "admin"; // Tipo de usuario
      userFound = { _id: "admin" }; // ID de referencia para el admin
    } else {
      // Si no es admin, buscar como empleado
      userFound = await employeesModel.findOne({ email }); // Buscar empleado por email
      userType = "employee"; // Tipo de usuario
    }

    // Si no se encuentra el usuario
    if (!userFound) {
      return res.status(400).json({ message: "User not found" }); // Usuario no existe
    }

    // Validar la contraseña (solo si no es admin)
    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password); // Comparar contraseñas
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" }); // Contraseña incorrecta
      }
    }

    // Generar y firmar el token JWT
    JsonWebToken.sign(
      { id: userFound._id, userType }, // Datos a incluir en el token
      config.JWT.secret, // Clave secreta
      { expiresIn: config.JWT.expiresIn }, // Tiempo de expiración
      (error, token) => {
        if (error) console.log("error" + error); // Log en caso de error al generar token

        // Guardar token en cookie
        res.cookie("authToken", token);
        res.status(200).json({ message: "Login succesful" }); // Respuesta exitosa
      }
    );
  } catch (error) {
    console.log("error " + error); // Log de error general
  }
};

// Exportar controlador
export default loginController;
