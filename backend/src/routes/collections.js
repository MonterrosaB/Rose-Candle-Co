// Librerías
import express from "express";


import collectionsController from "../controllers/collectionsController.js";


const router = express.Router();

// Rutas GET y POST
router.route("/")
  .get(collectionsController.getCollections)
  .post(collectionsController.createCollection);

// Rutas PUT y DELETE (requieren ID)
router.route("/:id")
  .put(collectionsController.updateCollection)
  .delete(collectionsController.deleteCollection);

export default router;
