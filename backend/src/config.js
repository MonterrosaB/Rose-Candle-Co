// Libreria dotenv
import dotenv from "dotenv";

// Ejecuto "dotenv" que me para acceder al .env
dotenv.config();

export const config = {
  db: {
    URI: process.env.DB_URI,
  },
  server: {
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES,
  },
  email: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
  cloudinary: {
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  brevo: {
    brevoapi: process.env.BREVO_API,
    brevoSender: process.env.BREVO_MAIL_SENDER,
  },
};
