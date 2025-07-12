import jwt from "jsonwebtoken"; // 👈 Asegúrate de usar el nombre correcto
import { config } from "../config.js";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT.secret);
    console.log("Decoded JWT:", decoded);
    req.user = decoded; // Debe tener { id: "...", userType: "client" }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;

