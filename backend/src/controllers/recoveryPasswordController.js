import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import customersModel from "../models/Customers.js";
import employeesModel from "../models/Employees.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";

const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    let userFound;
    let userType;

    userFound = await customersModel.findOne({ email });
    if (userFound) {
      userType = "customer";
    } else {
      userFound = await employeesModel.findOne({ email });
      if (userFound) {
        userType = "employee";
      }
    }
    if (!userFound) {
      return res.status(400).json({ message: "User not found" }); // error
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();
    const token = jsonwebtoken.sign(
      { email, code, userType, verified: false },
      config.JWT.secret,
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

    await sendEmail(
      email,
      "Código de verificación | Rosé Candle Co.",
      "Hola",
      HTMLRecoveryEmail(code)
    );

    res.status(200).json({ message: "Code sent successfully" }); // todo bien
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); // error
    console.log("error" + error);
  }
};

// Función para verificar código
passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (decoded.code !== code) {
      return res.json({ message: "Invalid code" });
    }

    const newToken = jsonwebtoken.sign(
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },

      config.JWT.secret,

      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 }); // 20 minutos

    res.status(200).json({ message: "Code verified successfully" }); // todo bien
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); // error
    console.log("error" + error);
  }
};

//Función para nueva contraseña
passwordRecoveryController.newPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (!decoded.verified) {
      return res.json({ message: "Code not verified" });
    }

    const { email, userType } = decoded;
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    let updateUser;

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

    res.clearCookie("tokenRecoveryCode");

    res.status(200).json({ message: "Password updated" }); // todo bien
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); // error
    console.log("error" + error);
  }
};

export default passwordRecoveryController;
