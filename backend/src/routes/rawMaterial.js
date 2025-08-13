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

// Rutas específicas
router.route("/restore/:id")
.put(rawMaterialsController.restoreRawMaterials); // restaurar por id

router.route("/lowStock") // materia prima con bajo stock
.get(rawMaterialsController.getLowestRawMaterials)

export default router;