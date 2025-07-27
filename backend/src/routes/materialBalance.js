// Librerias
import express from "express";

// Controlador
import materialBalanceControllers from "../controllers/materialBalanceControllers.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(materialBalanceControllers.getMaterialBalance)
.post(materialBalanceControllers.createMaterialBalance) 

router.route("/:id")
.put(materialBalanceControllers.updateMaterialBalance)
.delete(materialBalanceControllers.deleteMaterialBalance)

// Rutas específicas
router.route("/restore/:id")
  .put(materialBalanceControllers.restoreMaterialBalance); // restaurar por id

export default router;