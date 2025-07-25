import bcryptjs from "bcryptjs"; // Librería para comparar contraseñas encriptadas
import JsonWebToken from "jsonwebtoken"; // Librería para crear y verificar tokens JWT
import { config } from "../config.js"; // Archivo de configuración
import customersModel from "../models/Customers.js"; // Modelo de clientes
import shoppingCartModel from "../models/ShoppingCart.js"; // Modelo de carrito de compras

// Controlador de login para clientes
const loginCustomerController = {};

// POST - Login del cliente
loginCustomerController.login = async (req, res) => {
  // Obtener datos del cuerpo de la solicitud
  const { email, password } = req.body;

  try {
    // Buscar cliente por email
    const customer = await customersModel.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" }); // Si no existe el cliente
    }

    // Verificar que la contraseña sea válida
    const isValidPassword = await bcryptjs.compare(password, customer.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" }); // Contraseña incorrecta
    }

    // Crear token JWT
    const token = JsonWebToken.sign(
      { id: customer._id, userType: "client" }, // Cargar el id y tipo de usuario
      config.JWT.secret, // Clave secreta
      { expiresIn: config.JWT.expiresIn } // Tiempo de expiración
    );

    // Verificar si el cliente ya tiene un carrito
    let cart = await shoppingCartModel.findOne({ idUser: customer._id });

    // Si no existe, se crea un nuevo carrito vacío
    if (!cart) {
      cart = new shoppingCartModel({
        idUser: customer._id,
        products: [],
        total: 0,
      });
      await cart.save(); // Guardar el nuevo carrito
    }

    // Guardar token en cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Solo accesible desde el servidor
      secure: false,
      sameSite: "lax", // Protección CSRF
    });

    // Responder con token, datos del cliente y carrito
    res.status(200).json({
      message: "Login successfull",
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        surnames: customer.surnames,
        email: customer.email,
      },
      cart,
    });
  } catch (error) {
    console.error("Error en login cliente:", error); // Log de error
    res.status(500).json({ message: "Internal Server Error" }); // Error interno
  }
};

// GET - Verificar cliente desde token
loginCustomerController.verifyCustomer = async (req, res) => {
  try {
    // Obtener token desde las cookies
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "No autorizado" }); // No se encontró token
    }

    // Verificar el token con la clave secreta
    const decoded = JsonWebToken.verify(token, config.JWT.secret);

    // Buscar cliente por ID decodificado
    const customer = await customersModel.findById(decoded.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" }); // Cliente no existe
    }

    // Responder con los datos del cliente
    return res.json({
      customer: {
        id: customer._id,
        name: customer.name,
        surnames: customer.surnames,
        email: customer.email,
        phone: customer.phone,
        addresses: customer.addresses, // Lista de direcciones si existen
      },
    });
  } catch (error) {
    console.error("Error en verifyCustomer:", error); // Log de error
    return res.status(401).json({ message: "Token inválido o expirado" }); // Token inválido
  }
};

// Exportar controlador
export default loginCustomerController;
