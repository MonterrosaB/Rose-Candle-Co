import jwt from "jsonwebtoken"; // Importar jsonwebtoken para manejo de tokens JWT
import { config } from "../config.js"; // Importar configuración, incluyendo la clave secreta

// Middleware de autenticación para proteger rutas
const auth = (req, res, next) => {
  // Obtener el header Authorization de la petición
  const authHeader = req.headers.authorization;

  // Validar que el header exista y que empiece con 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Si no hay token o no es del formato esperado, responder con 401 Unauthorized
    return res.status(401).json({ message: "No token provided" });
  }

  // Extraer el token del header (separar por espacio y tomar el segundo elemento)
  const token = authHeader.split(" ")[1];

  try {
    // Verificar el token usando la clave secreta definida en config
    const decoded = jwt.verify(token, config.jwt.secret);

    // Mostrar en consola el contenido decodificado del token (útil para debugging)
    console.log("Decoded JWT:", decoded);

    // Guardar la información decodificada en req.user para que esté disponible en siguientes middlewares o rutas
    // Normalmente incluye un objeto con la propiedad id y posiblemente userType u otros datos
    req.user = decoded;

    // Continuar con la siguiente función en la cadena de middlewares
    next();
  } catch (error) {
    // Si la verificación falla (token inválido, expirado, etc.), responder con 401 Unauthorized
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Exportar el middleware para usarlo en rutas protegidas
export default auth;
