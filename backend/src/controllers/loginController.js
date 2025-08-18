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

    // Verificar si existe un usuario

    userFound = await employeesModel.findOne({ user }); // Buscar empleado por el usuario

    if (!userFound) {
      return res.status(400).json({ message: "User not found" }); // Usuario no existe
    }

    const isAdmin = userFound.role === "admin";

    // Validar si la cuenta no está bloqueada
    if (!isAdmin && userFound.timeOut > Date.now()) {
      const time = Math.ceil((userFound.timeOut - Date.now()) / 60000);
      return res
        .status(403)
        .json({ message: `Cuenta bloqueada, faltan ${time} minutos` });
    }

    // Verificar contraseña
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar y firmar el token JWT
    const token = JsonWebToken.sign(
      {
        id: userFound._id,
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
      secure: true, // ✅ en producción debe ser true (usa HTTPS)
      sameSite: "None", // ✅ para que funcione entre dominios distintos (Vercel <-> Render)
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
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
