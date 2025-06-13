// Librerias
import express from "express";

// Controlador
import productsController from "../controllers/productsController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(productsController.getproducts)
.post(productsController.createProduct) 

router.route("/:id")
.put(productsController.updateProduct)
.delete(productsController.deleteProduct)

export default router;