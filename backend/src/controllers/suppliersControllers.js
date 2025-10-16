import suppliersModel from "../models/Suppliers.js"; // Modelo de Proveedores
import { createLog } from "../utils/logger.js";

// Controlador con métodos CRUD para proveedores
const suppliersControllers = {};

// GET - Obtener todos los proveedores
suppliersControllers.getSuppliers = async (req, res) => {
  try {
    // Buscar todos los documentos de proveedores en la colección
    const suppliers = await suppliersModel.find().sort({ deleted: 1 }); // Buscar todas las colecciones, salvo las que no han sido eliminadas

    // Enviar listado completo de proveedores con código 200
    res.status(200).json(suppliers);
  } catch (error) {
    // Mostrar error en consola y enviar respuesta 500
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// GET - Obtener un proveedor específico por ID
suppliersControllers.getSupplierById = async (req, res) => {
  try {
    // Buscar proveedor por ID recibido en parámetros de la URL
    const supplier = await suppliersModel.findById(req.params.id);

    if (!supplier) {
      // Si no se encuentra el proveedor, enviar error 404
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Si se encontró, enviar datos del proveedor
    res.status(200).json(supplier);
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// POST - Crear un nuevo proveedor
suppliersControllers.createSuppliers = async (req, res) => {
  const { name, phoneNumber, email } = req.body; // Obtener datos del cuerpo de la petición

  try {
    // Validar que se hayan recibido ambos campos obligatorios
    if (!name || !phoneNumber || !email) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" });
    }

    // Validar longitud del nombre: mínimo 3, máximo 100 caracteres
    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: "Name length is invalid" });
    }

    // Validar formato del contacto (ejemplo: ####-####)
    if (!/^\d{4}-\d{4}$/.test(phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Phone Number must be in format ####-####" });
    }

    // Validar correo electrónico
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res
        .status(400)
        .json({ message: "Email must be a valid email address" });
    }

    // Crear instancia del modelo con los datos validados
    const newSupplier = new suppliersModel({ name, phoneNumber, email });

    // Guardar en la base de datos
    await newSupplier.save();

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "create",
      collectionAffected: "Suppliers",
      targetId: newSupplier._id,
      description: `Suppliers ${newSupplier.name} created`,
    });

    // Confirmar creación exitosa con código 200
    res.status(200).json({ message: "Supplier saved" });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// SOFTDELETE - Eliminar un proveedor por ID
suppliersControllers.softDeleteSuppliers = async (req, res) => {
  try {
    const deletedSupplier = await suppliersModel.findByIdAndUpdate(
      req.params.id,
      { deleted: true }, // Se marca como "eliminada"
      { new: true }
    ); // Eliminar por ID

    if (!deletedSupplier) {
      // Si no se encontró el proveedor para eliminar, responder 400
      return res.status(400).json({ message: "Supplier not found" });
    }

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "archive",
      collectionAffected: "Suppliers",
      targetId: deletedSupplier._id,
      description: `Suppliers ${deletedSupplier.name} archived`,
    });

    // Confirmar eliminación exitosa
    res.status(200).json({ message: "Supplier deleted" });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// SOFTDELETE - Eliminar un proveedor por ID
suppliersControllers.hardDeleteSuppliers = async (req, res) => {
  try {
    const deletedSupplier = await suppliersModel.findByIdAndDelete(
      req.params.id
    ); // Eliminar por ID

    if (!deletedSupplier) {
      // Si no se encontró el proveedor para eliminar, responder 400
      return res.status(400).json({ message: "Supplier not found" });
    }

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "delete",
      collectionAffected: "Suppliers",
      targetId: deletedSupplier._id,
      description: `Suppliers ${deletedSupplier.name} deleted`,
    });

    // Confirmar eliminación exitosa
    res.status(200).json({ message: "Supplier deleted" });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// PUT - Actualizar datos de un proveedor existente
suppliersControllers.updateSuppliers = async (req, res) => {
  const { name, phoneNumber, email } = req.body; // Obtener datos del cuerpo

  try {
    // Validar que se reciban todos los campos requeridos
    if (!name || !phoneNumber || !email) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" });
    }

    // Validar longitud del nombre
    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: "Name length is invalid" });
    }

    // Validar formato de contacto
    if (!/^\d{4}-\d{4}$/.test(phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Contact must be in format ####-####" });
    }

    // Validar correo electrónico
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res
        .status(400)
        .json({ message: "Email must be a valid email address" });
    }

    // Buscar proveedor por ID y actualizar sus datos
    const updatedSupplier = await suppliersModel.findByIdAndUpdate(
      req.params.id,
      { name, phoneNumber, email },
      { new: true } // Para que retorne el documento actualizado
    );

    if (!updatedSupplier) {
      // Si no se encontró el proveedor a actualizar
      return res.status(400).json({ message: "Supplier not found" });
    }

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "update",
      collectionAffected: "Suppliers",
      targetId: updatedSupplier._id,
      description: `Suppliers ${updatedSupplier.name} updated`,
    });

    // Confirmar actualización exitosa
    res.status(200).json({ message: "Supplier updated" });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};
suppliersControllers.restoreSuppliers = async (req, res) => {
  try {
    const restoreSuppliers = await suppliersModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoreSuppliers) {
      return res
        .status(400)
        .json({ message: "Restore Suppliers Cart not found" }); // No encontrada
    }

    // Guardar log
    await createLog({
      userId: req.user.id,
      action: "restore",
      collectionAffected: "Suppliers",
      targetId: restoreSuppliers._id,
      description: `Suppliers ${restoreSuppliers.name} restored`,
    });

    res.status(200).json({ message: "Restore Suppliers Cart restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// Exportar controlador para rutas
export default suppliersControllers;
