// Librerías
import express from "express";


import shoppingCartController from "../controllers/shoppingCartController.js";


const router = express.Router();

// Rutas para métodos GET y POST
router.route("/")
  .get(shoppingCartController.getCart)
  .post(shoppingCartController.createCart);

// Rutas para métodos PUT y DELETE 
router.route("/:id")
  .put(shoppingCartController.updateCart)
  .delete(shoppingCartController.deleteCart);

export default router;
