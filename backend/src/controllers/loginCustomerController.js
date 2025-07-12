import bcryptjs from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { config } from "../config.js";
import customersModel from "../models/Customers.js";
import shoppingCartModel from "../models/ShoppingCart.js";

const loginCustomerController = {};

loginCustomerController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await customersModel.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const isValidPassword = await bcryptjs.compare(password, customer.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear token
    const token = JsonWebToken.sign(
      { id: customer._id, userType: "client" },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn }
    );

    // 🔑 Aquí revisa si ya tiene carrito
    let cart = await shoppingCartModel.findOne({ idUser: customer._id });

    if (!cart) {
      cart = new shoppingCartModel({
        idUser: customer._id,
        products: [],
        total: 0,
      });
      await cart.save();
    }

    res.cookie("authToken", token, {
      httpOnly: true, // Opcional, protege cookie en navegador
      secure: false, // Pon true si usas HTTPS
      sameSite: "lax", // agrégalo si no está
    });

    // 🔑 PERO SIEMPRE responde con el token para uso en Authorization
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token, // <-- Aquí lo devuelves
      customer: {
        id: customer._id,
        name: customer.name,
        surnames: customer.surnames,
        email: customer.email,
      },
      cart,
    });
  } catch (error) {
    console.error("Error en login cliente:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

loginCustomerController.verifyCustomer = async (req, res) => {
  try {
    //console.log("COOKIES:", req.cookies);

    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    //console.log("TOKEN:", token);

    // Verificar token
    const decoded = JsonWebToken.verify(token, config.JWT.secret);

    const customer = await customersModel.findById(decoded.id);

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    return res.json({
      customer: {
        id: customer._id,
        name: customer.name,
        surnames: customer.surnames,
        email: customer.email,
        phone: customer.phone,
        addresses: customer.addresses
      },
    });
  } catch (error) {
    console.error("Error en verifyCustomer:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

export default loginCustomerController;
