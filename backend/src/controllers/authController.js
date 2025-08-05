import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.authTokens;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // datos del usuario dentro del token
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;
