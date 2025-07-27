// Librerias
import express from "express";

// Controlador
import historyRawMaterialsController from "../controllers/historyRawMaterialsController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(historyRawMaterialsController.getHistoriRawMaterials)
.post(historyRawMaterialsController.createHistoriRawMaterials) 

router.route("/:id")
.put(historyRawMaterialsController.updateHistoriRawMaterials)
.delete(historyRawMaterialsController.deleteHistoriRawMaterials)

// Rutas específicas
router.route("/restore/:id")
  .put(historyRawMaterialsController.restoreHistory); // restaurar por id

export default router;