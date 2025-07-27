// Librerias
import express from "express";

// Controlador
import suppliersControllers from "../controllers/suppliersControllers.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(suppliersControllers.getSuppliers)
.post(suppliersControllers.createSuppliers) 

router.route("/:id")
.get(suppliersControllers.getSupplierById)
.put(suppliersControllers.updateSuppliers)
.delete(suppliersControllers.deleteSuppliers)

// Rutas específicas
 router.route("/restore/:id")
 .put(suppliersControllers.restoreSuppliers); // restaurar por id


export default router;