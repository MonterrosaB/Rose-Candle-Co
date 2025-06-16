import suppliersModel from "../models/Suppliers.js"; // Modelo de Proveedores

// Array de métodos (CRUD)
const suppliersControllers = {};

// GET - Obtener todos los proveedores
suppliersControllers.getSuppliers = async (req, res) => {
  try {
    const suppliers = await suppliersModel.find();
    res.status(200).json(suppliers);
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// POST - Crear proveedor
suppliersControllers.createSuppliers = async (req, res) => {
  const { name, contact } = req.body;

  try {
    // Validaciones
    if (!name || !contact) {
      return res.status(400).json({ message: "Please complete all the fields" });
    }

    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: "Name length is invalid" });
    }

    if (!/^\d{4}-\d{4}$/.test(contact)) {
      return res.status(400).json({ message: "Contact must be in format ####-####" });
    }

    const newSupplier = new suppliersModel({ name, contact });
    await newSupplier.save();
    res.status(200).json({ message: "Supplier saved" });

  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// DELETE - Eliminar proveedor
suppliersControllers.deleteSuppliers = async (req, res) => {
  try {
    const deletedSupplier = await suppliersModel.findByIdAndDelete(req.params.id);

    if (!deletedSupplier) {
      return res.status(400).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted" });

  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// PUT - Actualizar proveedor
suppliersControllers.updateSuppliers = async (req, res) => {
  const { name, contact } = req.body;

  try {
    if (!name || !contact) {
      return res.status(400).json({ message: "Please complete all the fields" });
    }

    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: "Name length is invalid" });
    }

    if (!/^\d{4}-\d{4}$/.test(contact)) {
      return res.status(400).json({ message: "Contact must be in format ####-####" });
    }

    const updatedSupplier = await suppliersModel.findByIdAndUpdate(
      req.params.id,
      { name, contact },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(400).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier updated" });

  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// Exportar
export default suppliersControllers;
