// Importo archivos y librerias
import app from './app.js';
import "./database.js";
import dotenv from "dotenv";

dotenv.config();

import {config} from "./src/config.js"

// Ejecuto el servidor
async function main(){
    //const port = ;
    app.listen(config.server.port);
    console.log("Server on port " + config.server.port);
}

// Ejecuto
main();