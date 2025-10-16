// Librerías
import express from "express";
import authEmployee from "../middlewares/authEmployees.js";

// Controlador
import collectionsController from "../controllers/collectionsController.js";

// Para las rutas
const router = express.Router();

// Rutas GET y POST
router
  .route("/")
  .get(authEmployee, collectionsController.getCollections) // obtener todas
  .post(authEmployee, collectionsController.createCollection); // insertar una nueva

// Rutas que usan el id
router
  .route("/:id")
  .get(collectionsController.getCollectionById) // obtener por id
  .put(authEmployee, collectionsController.updateCollection) // actualizar por id
  .delete(authEmployee, collectionsController.hardDeleteCollection); // eliminar por id.

router
  .route("/softdelete/:id")
  .patch(authEmployee, collectionsController.softDeleteCollection); // eliminar por id

// Rutas específicas
router
  .route("/restore/:id")
  .patch(authEmployee, collectionsController.restoreCollection); // restaurar por id

export default router;
