import jwt from "jsonwebtoken";
import { config } from "../config.js";

const auth = (req, res, next) => {
  const token = req.cookies.authToken || req.cookies.authTokenR;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    console.log(decoded);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
