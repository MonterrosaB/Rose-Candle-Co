// Librerias
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import { config } from "./src/config.js";

// Conexion a base de datos
mongoose.connect(config.db.URI);

const connection = mongoose.connection;

// Comprobacion de conexión
connection.once("open", () => {
  console.log("DB is connected");
});

// Desconexion
connection.on("disconnected", () => {
  console.log("DB is disconnected");
});

// Posible error
connection.once("error", (error) => {
  console.log("error found" + error);
});
