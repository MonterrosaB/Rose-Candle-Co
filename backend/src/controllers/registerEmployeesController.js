import employeesModel from "../models/Employees.js"; // Modelo de empleados
import bcryptjs from "bcryptjs"; // Librería para encriptar contraseñas
import jsonwebtoken from "jsonwebtoken"; // Librería para manejar tokens JWT
import { config } from "../config.js";

// Controlador con métodos para registro de empleados
const registerEmployeesController = {};

// POST - Registrar nuevo empleado
registerEmployeesController.registerEmployees = async (req, res) => {
  // Obtener datos enviados en el cuerpo de la petición
  const { name, surnames, email, phone, dui, password, user, role } = req.body;

  // Log para revisar los datos recibidos (útil para debugging)
  console.log(req.body);

  try {
    // Validar que todos los campos requeridos estén presentes
    if (!name || !surnames || !email || !phone || !dui || !password || !user) {
      // Responder con error si algún campo está vacío o no existe
      return res
        .status(400)
        .json({ message: "Please complete all the fields" }); // Campos incompletos
    }

    // Validar longitud mínima de campos importantes
    if (
      name.length < 3 ||
      surnames.length < 3 ||
      phone.length < 9 ||
      dui.length < 10 ||
      password.length < 8
    ) {
      return res.status(400).json({ message: "Too short" }); // Algún campo es demasiado corto
    }

    // Validar longitud máxima para evitar inputs muy largos
    if (name.length > 100 || surnames.length > 100) {
      return res.status(400).json({ message: "Too large" }); // Algún campo es demasiado largo
    }

    // Verificar si ya existe un empleado con el email proporcionado para evitar duplicados
    const existEmployee = await employeesModel.findOne({ email });
    if (existEmployee) {
      return res.status(400).json({ message: "Employee already exists" }); // Empleado duplicado
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crear instancia del nuevo empleado con los datos procesados
    const newEmployee = new employeesModel({
      name,
      surnames,
      email,
      phone,
      dui,
      password: passwordHash, // Guardar contraseña encriptada
      user,
      role,
    });

    // Guardar el nuevo empleado en la base de datos
    await newEmployee.save();

    // Generar token JWT para autenticación futura
    jsonwebtoken.sign(
      { id: newEmployee._id }, // Payload: ID del empleado
      config.jwt.secret, // Secreto para firmar el token
      { expiresIn: config.jwt.expiresIn }, // Tiempo de expiración configurado
      (error, token) => {
        // Callback para manejo del token generado
        if (error) {
          console.log("Token error: " + error);
          return res.status(500).json({ message: "Token generation failed" }); // Error generando token
        }

        // Guardar token JWT en cookie para mantener sesión activa
        res.cookie("authToken", token);
        // Responder indicando que el empleado fue guardado exitosamente
        res.status(200).json({ message: "Employee saved" }); // Registro exitoso
      }
    );
  } catch (error) {
    // Capturar errores inesperados y responder error de servidor
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error servidor
  }
};

// Exportar controlador para su uso en rutas
export default registerEmployeesController;
