// Importar librerías y modelos
import bcryptjs from "bcryptjs"; // Para encriptar y comparar contraseñas
import JsonWebToken from "jsonwebtoken"; // Para generar tokens JWT
import { config } from "../config.js"; // Archivo de configuración
import employeesModel from "../models/Employees.js"; // Modelo de empleados

// Controlador de login
const loginController = {};

const MAX_ATTEMPTS = 5; // número máximo de intentos
const LOCK_TIME = 1 * 60 * 1000; // 1 minuto

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

    //Si es empleado, verificar bloqueo
    if (userType === "employee") {
      if (userFound.lockUntil && userFound.lockUntil > Date.now()) {
        const remaining = Math.ceil(
          (userFound.lockUntil - Date.now()) / 1000 / 60
        );
        return res.status(403).json({
          message: `Cuenta bloqueada. Intente nuevamente en ${remaining} minuto(s)`,
        });
      }
    }

    // Validar la contraseña (solo si no es admin)
      if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);

      if (!isMatch) {
        if (userType === "employee") {
          // Incrementar intentos fallidos
          userFound.loginAttempts = (userFound.loginAttempts || 0) + 1;

          if (userFound.loginAttempts >= MAX_ATTEMPTS) {
            userFound.lockUntil = Date.now() + LOCK_TIME;
            await userFound.save();
            return res.status(403).json({
              message: `Cuenta bloqueada por ${LOCK_TIME / 60000} minuto(s)`,
            });
          }

          await userFound.save();
           return res.status(401).json({
        message: `Contraseña incorrecta. Intentos restantes: ${MAX_ATTEMPTS - userFound.loginAttempts}`
      });
        }

        // Si fuera admin pero contraseña incorrecta
        return res.status(400).json({ message: "Invalid password" });
      }
    }

     //Si es empleado y pasa login se resetean los intentos
    if (userType === "employee") {
      userFound.loginAttempts = 0;
      userFound.lockUntil = null;
      await userFound.save();
    }

    // Generar y firmar el token JWT
    JsonWebToken.sign(
      { id: userFound._id, userType }, // Datos a incluir en el token
      config.jwt.secret, // Clave secreta
      { expiresIn: config.jwt.expiresIn }, // Tiempo de expiración
      (error, token) => {
        if (error) console.log("error" + error); // Log en caso de error al generar token

        // Guardar token en cookie
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: true, // solo si estás en HTTPS
          sameSite: "None", // o "Lax" si todo está en el mismo dominio
          path: "/",
        });
        res.status(200).json({ message: "Login succesful" }); // Respuesta exitosa
      }
    );
  } catch (error) {
    console.log("error " + error); // Log de error general
  }
};

// Exportar controlador
export default loginController;
