// Importar librerías y modelos
import bcryptjs from "bcryptjs"; // Para encriptar y comparar contraseñas
import JsonWebToken from "jsonwebtoken"; // Para generar tokens JWT
import { config } from "../config.js"; // Archivo de configuración
import employeesModel from "../models/Employees.js"; // Modelo de empleados
import { createLog } from "../utils/logger.js";

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

    // Verificar si existe un usuario

    userFound = await employeesModel.findOne({ user }); // Buscar empleado por el usuario

    if (!userFound) {
      return res.status(400).json({ message: "User not found" }); // Usuario no existe
    }

    const isAdmin =
      userFound.role === "admin" || userFound.role === "super_admin";

    // Validar si la cuenta no está bloqueada
    if (!isAdmin && userFound.timeOut > Date.now()) {
      const time = Math.ceil((userFound.timeOut - Date.now()) / 60000);
      return res
        .status(403)
        .json({ message: `Cuenta bloqueada, faltan ${time} minutos` });
    }

    // Verificar contraseña
    const isValidPassword = await bcryptjs.compare(
      password,
      userFound.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar y firmar el token JWT
    const token = JsonWebToken.sign(
      {
        id: userFound._id,
        role: userFound.role,
        name: userFound.name,
        isAdmin,
        name: userFound.name,
        surnames: userFound.surnames,
        phone: userFound.phone,
        email: userFound.email,
        dui: userFound.dui,
        user: userFound.user,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.cookie("authTokenR", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    // Guardar log
    await createLog({
      userId: userFound._id,
      action: "login",
      collectionAffected: "Employees",
      targetId: userFound._id,
      description: `Employee ${userFound.name} ${userFound.surnames} logged`,
    });

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log("error " + error); // Log de error general
  }
};

// Exportar controlador
export default loginController;
