// Librerías
import express from "express";

// Controlador
import collectionsController from "../controllers/collectionsController.js";

// Para las rutas
const router = express.Router();

// Rutas GET y POST
router.route("/")
  .get(collectionsController.getCollections) // obtener todas
  .post(collectionsController.createCollection); // insertar una nueva

// Rutas que usan el id
router.route("/:id")
  .get(collectionsController.getCollectionById) // obtener por id
  .put(collectionsController.updateCollection) // actualizar por id
  .delete(collectionsController.deleteCollection) // eliminar por id

// Rutas específicas
router.route("/restore/:id")
  .put(collectionsController.restoreCollection); // restaurar por id

export default router;
