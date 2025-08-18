// Librerias
import express from "express";

// Controlador
import customersController from "../controllers/customersController.js";

// Router() para colocar los métodos de la ruta
const router = express.Router();

router.route("/")
.get(customersController.getCustomers)

router.route("/addresses").get(customersController.getCustomersAddress)

router.route("/count") // contador de usuarios
.get(customersController.countCustomers)

router.route("/countByMonth") // contador de usuarios del último mes
.get(customersController.countCustomersByMonth)

router.route("/:id")
.get(customersController.getCustomersById)
.put(customersController.updateCustomers)
.delete(customersController.deleteCustomers)
router.route("/:id/password")
  .put(customersController.updatePassword); // contraseña actualizar

// Rutas específicas
router.route("/restore/:id")
.put(customersController.restoreCustomers); // restaurar por id

// Direcciones
// Obtener direcciones
router.route("/:id/addresses")
.get(customersController.getAddresses)

// Agregar nueva dirección
router.route("/:id/addresses")
.post(customersController.addAddress)

// Eliminar dirección específica
router.route("/:id/addresses/:addressId")
.delete(customersController.deleteAddress)

// Editar dirección específica
router.route("/:id/addresses/:addressId")
.put(customersController.updateAddress)


export default router;