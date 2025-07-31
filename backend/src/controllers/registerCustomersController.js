import customersModel from "../models/Customers.js"; // Modelo de Clientes
import bcryptjs from "bcryptjs"; // Librería para encriptar contraseñas
import jsonwebtoken from "jsonwebtoken"; // Librería para manejar tokens JWT
import { config } from "../config.js";

import { sendEmail, HTMLWelcomeMail } from "../utils/mailWelcome.js"; // Funciones para enviar email de bienvenida

// Controlador con métodos para registro de clientes
const registerCustomersController = {};

// POST - Registrar nuevo cliente
registerCustomersController.registerCustomers = async (req, res) => {
  // Obtener datos enviados en el cuerpo de la petición
  const { name, surnames, email, password, user, phone, addresses } = req.body;

  try {
    // Validar que todos los campos requeridos estén presentes y correctos
    if (
      !name ||
      !surnames ||
      !email ||
      !phone ||
      !password ||
      !user ||
      !addresses ||
      !Array.isArray(addresses) || // Verificar que addresses sea un arreglo
      addresses.length === 0 // Verificar que haya al menos una dirección
    ) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" }); // Faltan datos obligatorios
    }

    // Validar longitud mínima de algunos campos
    if (
      name.length < 3 ||
      surnames.length < 3 ||
      phone.length < 9 ||
      password.length < 8
    ) {
      return res.status(400).json({ message: "Too short" }); // Algún campo es muy corto
    }

    // Validar longitud máxima de algunos campos
    if (name.length > 100 || surnames.length > 100) {
      return res.status(400).json({ message: "Too large" }); // Algún campo es muy largo
    }

    // Validar que las direcciones no excedan longitud máxima permitida
    for (const addr of addresses) {
      if (addr.address.length > 250) {
        return res.status(400).json({ message: "Address too large" }); // Dirección demasiado larga
      }
    }

    // Validar formato de teléfono con expresión regular: ####-####
    const phoneRegex = /^\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ message: "Formato de teléfono inválido (####-####)" }); // Formato teléfono incorrecto
    }

    // Validar complejidad de contraseña: al menos una minúscula, mayúscula, número y símbolo
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "La contraseña debe incluir mayúscula, minúscula, número y símbolo",
      }); // Contraseña no cumple criterios de seguridad
    }

    // Verificar si ya existe un cliente con ese email para evitar duplicados
    const existCustomer = await customersModel.findOne({ email });
    if (existCustomer) {
      return res.status(400).json({ message: "Customer already exists" }); // Cliente ya registrado
    }

    // Encriptar la contraseña antes de guardar en BD
    const passwordHash = await bcryptjs.hash(password, 10);

    // Normalizar direcciones: asegurar estructura y valores por defecto
    const cleanAddresses = addresses.map((addr) => ({
      address: addr.address,
      isDefault: addr.isDefault ?? false, // Valor por defecto false si no se especifica
      type: addr.type && addr.type.trim() !== "" ? addr.type : undefined, // Si no hay tipo, usar default de Mongoose
    }));

    // Logs para verificar la transformación de direcciones (opcional)
    console.log("Addresses recibidas:", addresses);
    console.log("Addresses final:", cleanAddresses);

    // Crear instancia del nuevo cliente con los datos procesados
    const newCustomer = new customersModel({
      name,
      surnames,
      email,
      password: passwordHash,
      user,
      phone,
      addresses: cleanAddresses,
    });

    // Guardar el nuevo cliente en la base de datos
    await newCustomer.save();

    // Enviar correo de bienvenida al nuevo cliente
    await sendEmail(
      email,
      "Bienvenida a Rosé Candle Co | Rosé Candle Co.",
      "Un gusto tenerte aquí!",
      HTMLWelcomeMail(name)
    );

    // Generar token JWT para autenticación posterior
    jsonwebtoken.sign(
      { id: newCustomer._id }, // Payload: ID del usuario
      config.jwt.secret, // Secreto para firmar el token
      { expiresIn: config.jwt.expiresIn }, // Tiempo de expiración configurado
      (error, token) => {
        // Callback para manejo del token generado
        if (error) {
          console.log("Token error: " + error);
          return res.status(500).json({ message: "Token generation failed" }); // Error generando token
        }

        // Guardar token JWT en cookie para mantener sesión
        res.cookie("authToken", token);
        // Responder indicando éxito en el registro
        res.status(200).json({ message: "Customer saved" }); // Todo bien
      }
    );
  } catch (error) {
    // Captura errores inesperados y responder error servidor
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error servidor
  }
};

// Exportar controlador para usarlo en rutas
export default registerCustomersController;
