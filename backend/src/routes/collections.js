// Librerías
import express from "express";


import collectionsController from "../controllers/collectionsController.js";


const router = express.Router();

// Rutas GET y POST
router.route("/")
  .get(collectionsController.getCollections)
  .post(collectionsController.createCollection);

// Rutas que usan el id
router.route("/:id")
  .get(collectionsController.getCollectionById)
  .put(collectionsController.updateCollection)
  .delete(collectionsController.deleteCollection);

export default router;
