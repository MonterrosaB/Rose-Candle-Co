import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import customersModel from "../models/Customers.js";
import employeesModel from "../models/Employees.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";

const passwordRecoveryController = {};

// Solicitar código de recuperación enviado por email
passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    let userFound;
    let userType;
    let name;

    // Buscar usuario en colección de clientes
    userFound = await customersModel.findOne({ email });
    if (userFound) {
      userType = "customer"; // Identificar tipo usuario
      name = userFound.name; // Obtener nombre del usuario para enviar el correo
    } else {
      // Si no encontrado, buscar en colección de empleados
      userFound = await employeesModel.findOne({ email });
      if (userFound) {
        userType = "employee"; // Identificar tipo usuario
        name = userFound.name; // Obtener nombre del usuario para enviar el correo
      }
    }

    // Si no se encontró usuario en ninguna colección, retornar error
    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" }); // error cliente
    }

    // Generar código de 5 dígitos aleatorio para verificación
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    // Crear token JWT con email, código, tipo usuario y flag verified en false
    // El token expirará en 20 minutos
    const token = jsonwebtoken.sign(
      { email, code, name, userType, verified: false },
      config.jwt.secret,
      { expiresIn: "20m" }
    );

    // Guardar token en cookie para mantener estado de recuperación
    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

    // Enviar email con el código de recuperación usando plantilla HTML
    await sendEmail(
      email,
      "Código de verificación | Rosé Candle Co.",
      "Hola",
      HTMLRecoveryEmail(code, name)
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
passwordRecoveryController.verifyCode = async (req, res) => {
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

// Cambiar la contraseña tras la verificación del código
passwordRecoveryController.newPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    // Obtener token JWT desde cookie
    const token = req.cookies.tokenRecoveryCode;

    // Decodificar y verificar token con clave secreta
    const decoded = jsonwebtoken.verify(token, config.jwt.secret);

    // Validar que el código haya sido verificado antes de permitir cambio de contraseña
    if (!decoded.verified) {
      return res.json({ message: "Code not verified" }); // código no verificado
    }

    const { email, userType } = decoded;

    // Hashear la nueva contraseña para almacenarla segura en la base de datos
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    let updateUser;

    // Actualizar la contraseña del usuario correspondiente según su tipo
    if (userType === "customer") {
      updateUser = await customersModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    } else if (userType === "employee") {
      updateUser = await employeesModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }

    // Limpiar la cookie con el token para evitar reutilización
    res.clearCookie("tokenRecoveryCode");

    // Responder con éxito
    res.status(200).json({ message: "Password updated" }); // todo bien
  } catch (error) {
    // Manejo de errores: respuesta 500 y log de error
    res.status(500).json({ message: "Internal Server Error" }); // error servidor
    console.log("error" + error);
  }
};

export default passwordRecoveryController; // Exportar controlador
