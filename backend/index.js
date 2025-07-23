// Importo archivos y librerias
import app from './app.js';
import "./database.js";
import dotenv from "dotenv"; // variables sensibles

dotenv.config();

import {config} from "./src/config.js" // archivo config

// Ejecuto el servidor
async function main(){
    app.listen(config.server.port); // puerto del servidor
    console.log("Server on port " + config.server.port);
}

// Ejecuto
main();