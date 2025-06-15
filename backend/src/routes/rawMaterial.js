// Librerias
import express from "express";

// Controlador
import rawMaterialsController from "../controllers/rawMaterialControllers.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(rawMaterialsController.getrawMaterial)
.post(rawMaterialsController.createrRawMaterial) 

router.route("/:id")
.put(rawMaterialsController.updaterRawMaterial)
.delete(rawMaterialsController.deleterRawMaterial)

export default router;