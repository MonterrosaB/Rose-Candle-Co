import bcryptjs from "bcryptjs"; // Librería para comparar contraseñas encriptadas
import JsonWebToken, { decode } from "jsonwebtoken"; // Librería para crear y verificar tokens JWT
import { config } from "../config.js"; // Archivo de configuración
import customersModel from "../models/Customers.js"; // Modelo de clientes
import shoppingCartModel from "../models/ShoppingCart.js"; // Modelo de carrito de compras

// Controlador de login para clientes
const loginCustomerController = {};

const MAX_ATTEMPTS = 5; // número máximo de intentos
const LOCK_TIME = 1 * 60 * 1000; // 1 minuto

// POST - Login del cliente
loginCustomerController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await customersModel.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Verificar si está bloqueado
    if (customer.lockUntil && customer.lockUntil > Date.now()) {
      const remaining = Math.ceil(
        (customer.lockUntil - Date.now()) / 1000 / 60
      );
      return res.status(403).json({
        message: `Cuenta bloqueada. Intente nuevamente en ${remaining} minuto`,
      });
    }

    // Verificar contraseña
    const isValidPassword = await bcryptjs.compare(password, customer.password);
    if (!isValidPassword) {
      customer.loginAttempts += 1;
      if (customer.loginAttempts >= MAX_ATTEMPTS) {
        customer.lockUntil = Date.now() + LOCK_TIME;
        await customer.save();
        return res.status(403).json({
          message: `Cuenta bloqueada por ${LOCK_TIME / 60000} minutos`,
        });
      }
      await customer.save();
      return res.status(401).json({
        message: `Contraseña incorrecta. Intentos restantes: ${
          MAX_ATTEMPTS - customer.loginAttempts
        }`,
      });
    }

    // Resetear intentos
    customer.loginAttempts = 0;
    customer.lockUntil = null;
    await customer.save({ validateBeforeSave: false });

    // Verificar/crear carrito
    let cart = await shoppingCartModel.findOne({
      idUser: customer._id,
      status: "active",
    });
    if (!cart) {
      cart = new shoppingCartModel({
        idUser: customer._id,
        products: [],
        total: 0,
        status: "active",
      });
      await cart.save();
    }

    // Crear token con más datos
    const token = JsonWebToken.sign(
      {
        id: customer._id,
        email: customer.email,
        userType: "client",
        name: customer.name,
        surnames: customer.surnames,
        phone: customer.phone,
        addresses: customer.addresses,
        idCart: cart._id,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Guardar token en cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true, //  en local DEBE ser false (no hay HTTPS)
      sameSite: "None", //  funciona bien en local
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error en login cliente:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Exportar controlador
export default loginCustomerController;
