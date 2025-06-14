// Librerias
import express from "express";
import multer from "multer";

// Controlador
import productsController from "../controllers/productsController.js";


// Router() para colocar los métodos de la ruta
const router = express.Router();

const upload = multer({ dest: "public/" });

router.route("/")
.get(productsController.getproducts)
.post(upload.array("images"), productsController.createProduct) 

router.route("/:id")
.put(upload.array("images"), productsController.updateProduct)
.delete(productsController.deleteProduct)

export default router;