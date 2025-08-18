import customersModel from "../models/Customers.js"; // Modelo de Clientes
import bcryptjs from "bcryptjs"; // Librería para encriptar contraseñas
import jsonwebtoken from "jsonwebtoken"; // Librería para manejar tokens JWT
import { config } from "../config.js";

import { HTMLAccountCreatedEmail } from "../utils/mailAccountConfirmation.js"; // Funciones para enviar código de verificación del correo
import { sendEmail, HTMLWelcomeMail } from "../utils/mailWelcome.js"; // Funciones para enviar email de bienvenida

// Controlador con métodos para registro de clientes
const registerCustomersController = {};

// Antes de guardar, se solicita un código de verificación por seguridad
registerCustomersController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    // Generar código de 5 dígitos aleatorio para verificación
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    // Crear token JWT con email, código
    // El token expirará en 20 minutos
    const token = jsonwebtoken.sign({ email, code }, config.jwt.secret, {
      expiresIn: "20m",
    });

    // Guardar token en cookie para mantener estado de recuperación
    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

    // Enviar email con el código de recuperación usando plantilla HTML
    await sendEmail(
      email,
      "Código de verificación | Rosé Candle Co.",
      "Hola",
      HTMLAccountCreatedEmail(code)
    );

    // Responder con éxito
    res.status(200).json({ message: "Code sent successfully" }); // todo bien
  } catch (error) {
    // Manejo de errores: respuesta 500 y log de error
    res.status(500).json({ message: "Internal Server Error" }); // error servidor
    console.log("error" + error);
  }
};

// Verificar el código recibido por el usuario
registerCustomersController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    // Obtener token JWT desde cookie
    const token = req.cookies.tokenRecoveryCode;

    console.log({ token });

    // Decodificar y verificar el token con la clave secreta
    const decoded = jsonwebtoken.verify(token, config.jwt.secret);

    // Validar que el código ingresado coincida con el almacenado en el token
    if (decoded.code !== code) {
      return res.json({ message: "Código incorrecto" }); // código incorrecto
    }

    // Generar nuevo token con flag verified en true y expiración de 20 minutos
    const newToken = jsonwebtoken.sign(
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      config.jwt.secret,
      { expiresIn: "20m" }
    );

    // Actualizar cookie con el nuevo token validado
    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 }); // 20 minutos

    // Responder con éxito
    res.status(200).json({ message: "Code verified successfully" }); // todo bien
  } catch (error) {
    // Manejo de errores: respuesta 500 y log de error
    res.status(500).json({ message: "Internal Server Error" }); // error servidor
    console.log("error" + error);
  }
};

// POST - Registrar nuevo cliente (una vez confirmado el correo)
registerCustomersController.registerCustomers = async (req, res) => {
  // Obtener datos enviados en el cuerpo de la petición
  const { name, surnames, password, user, phone, addresses } = req.body;

  try {
    // Leer token desde cookies
    const token = req.cookies.tokenRecoveryCode;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No verification token provided" });
    }

    // Verificar y decodificar el token
    let decoded;
    try {
      decoded = jsonwebtoken.verify(token, config.jwt.secret);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Invalid or expired verification token" });
    }

    // Verificar si el correo fue validado
    if (!decoded.verified) {
      return res.status(401).json({ message: "Email not verified" });
    }

    const email = decoded.email; // Usar el email del token para mayor seguridad

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

    // Logs para verificar la transformación de direcciones
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
    });

    // Guardar el nuevo cliente en la base de datos
    await newCustomer.save();

    // Enviar correo de bienvenida al nuevo cliente
    await sendEmail(
      email,
      "Bienvenido a Rosé Candle Co | Rosé Candle Co.",
      "¡Un gusto tenerte aquí!",
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
