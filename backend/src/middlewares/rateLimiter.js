import rateLimit from "express-rate-limit";

// Configuración
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 1000, // Cantidad máxima de peticiones
    message: {
        status: 429,
        error: "Too many request"
    }
})

export default limiter;