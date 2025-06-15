import rawMaterialModel from "../models/RawMaterials.js";
const rawMaterialsControllers = {};

// GET - Obtener todos los rRawMaterial
rawMaterialsControllers.getrawMaterial = async (req, res) => {
  try {
    const rawMaterial = await rawMaterialModel.find()
      .populate("idRawMaterialCategory")
      .populate("idSupplier");
    res.status(200).json(rawMaterial);
  } catch (error) {
    console.error("error", error);
    res.status(500).json("Internal server error");
  }
};

// POST - Crear RawMaterial
rawMaterialsControllers.createrRawMaterial = async (req, res) => {
  const {
    currentStock,
    currentPrice,
    idRawMaterialCategory,
    idSupplier,
    name,
    unit,
  } = req.body;

  try {
    // Validaciones
    if (
      currentStock == null ||
      currentPrice == null ||
      !idRawMaterialCategory ||
      !idSupplier ||
      !name ||
      !unit
    ) {
      return res.status(400).json({ message: "Please complete all the fields" });
    }

    if (typeof currentStock !== "number" || currentStock < 0) {
      return res.status(400).json({ message: "Invalid stock value" });
    }

    if (typeof currentPrice !== "number" || currentPrice < 0) {
      return res.status(400).json({ message: "Invalid price value" });
    }

    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: "Name must be 3-100 characters long" });
    }

    if (unit.length < 1 || unit.length > 20) {
      return res.status(400).json({ message: "Unit must be 1-20 characters long" });
    }

    // Guardar RawMaterial
    const newrRawMaterial = new rawMaterialModel({
      currentStock,
      currentPrice,
      idRawMaterialCategory,
      idSupplier,
      name,
      unit,
    });

    await newrRawMaterial.save();
    res.status(200).json({ message: "Saved Successfully" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json("Internal server error");
  }
};
// DELETE - Eliminar RawMaterial
rawMaterialsControllers.deleterRawMaterial = async (req, res) => {
  try {
    const deleted = await rawMaterialModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(400).json({ message: "RawMaterial not found" });
    }
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json("Internal server error");
  }
};

// PUT - Actualizar rRawMaterialo
rawMaterialsControllers.updaterRawMaterial = async (req, res) => {
  const {
    currentStock,
    currentPrice,
    idRawMaterialCategory,
    idSupplier,
    name,
    unit,
  } = req.body;

  try {
    // Validaciones
    if (
      currentStock == null ||
      currentPrice == null ||
      !idRawMaterialCategory ||
      !idSupplier ||
      !name ||
      !unit
    ) {
      return res.status(400).json({ message: "Please complete all the fields" });
    }

    if (typeof currentStock !== "number" || currentStock < 0) {
      return res.status(400).json({ message: "Invalid stock value" });
    }

    if (typeof currentPrice !== "number" || currentPrice < 0) {
      return res.status(400).json({ message: "Invalid price value" });
    }

    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: "Name must be 3-100 characters long" });
    }

    if (unit.length < 1 || unit.length > 20) {
      return res.status(400).json({ message: "Unit must be 1-20 characters long" });
    }

    const updated = await rawMaterialModel.findByIdAndUpdate(
      req.params.id,
      {
        currentStock,
        currentPrice,
        idRawMaterialCategory,
        idSupplier,
        name,
        unit,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(400).json({ message: "rRawMaterial not found" });
    }

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json("Internal server error");
  }
};

export default rawMaterialsControllers;
