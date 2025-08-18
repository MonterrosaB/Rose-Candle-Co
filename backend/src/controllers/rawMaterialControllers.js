import rawMaterialModel from "../models/RawMaterials.js"; // Importar modelo de materia prima
import materialBalance from "../models/MaterialBalance.js"; // Importar modelo del balance de materia prima

// Controlador con métodos CRUD para materias primas
const rawMaterialsControllers = {};

// GET - Obtener todas las materias primas
rawMaterialsControllers.getrawMaterial = async (req, res) => {
  try {
    // Buscar todas las materias primas en la base de datos
    // Además, poblar (populate) las referencias a categoría y proveedor para mostrar sus nombres
    const rawMaterial = await rawMaterialModel
      .find({ deleted: false }) // Buscar todas las colecciones, salvo las que no han sido eliminadas
      .populate("idRawMaterialCategory", "name")
      .populate("idSupplier", "name");

    // Enviar respuesta con código 200 y datos encontrados
    res.status(200).json(rawMaterial);
  } catch (error) {
    // Capturar y mostrar error en consola, responder con error 500
    console.error("error", error);
    res.status(500).json("Internal server error");
  }
};

// POST - Crear una nueva materia prima
rawMaterialsControllers.createrRawMaterial = async (req, res) => {
  // Desestructurar campos del cuerpo de la petición
  const {
    currentStock,
    minimunStock,
    currentPrice,
    idRawMaterialCategory,
    idSupplier,
    name,
    unit,
  } = req.body;

  try {
    // Validaciones básicas para campos requeridos
    if (
      currentStock == null || // Validar que stock no sea null ni undefined
      currentPrice == null || // Validar que precio no sea null ni undefined
      !idRawMaterialCategory || // Validar que exista categoría
      !idSupplier || // Validar que exista proveedor
      !name || // Validar que exista nombre
      !unit // Validar que exista unidad
    ) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" });
    }

    // Validar que currentStock sea un número válido y no negativo
    if (typeof currentStock !== "number" || currentStock < 0) {
      return res.status(400).json({ message: "Invalid stock value" });
    }

    // Validar que currentPrice sea un número válido y no negativo
    if (typeof currentPrice !== "number" || currentPrice < 0) {
      return res.status(400).json({ message: "Invalid price value" });
    }

    // Validar longitud del nombre (entre 3 y 100 caracteres)
    if (name.length < 3 || name.length > 100) {
      return res
        .status(400)
        .json({ message: "Name must be 3-100 characters long" });
    }

    // Validar longitud de la unidad (entre 1 y 20 caracteres)
    if (unit.length < 1 || unit.length > 20) {
      return res
        .status(400)
        .json({ message: "Unit must be 1-20 characters long" });
    }

    // Crear nueva instancia del modelo con datos validados
    const newRawMaterial = new rawMaterialModel({
      currentStock,
      minimunStock,
      currentPrice: Number(currentPrice.toFixed(2)), // ✅ stays a number
      idRawMaterialCategory,
      idSupplier,
      name,
      unit,
    });

    // Guardar en la base de datos
    const result = await newRawMaterial.save();
    const insertedIdMaterial = result._id;

    const initialBalanceMaterial = new materialBalance({
      idMaterial: insertedIdMaterial,
      movement: "entrada",
      amount: currentStock,
      unitPrice: Number(currentPrice.toFixed(2)), // ✅ stays a number
      reference: "Balance inicial",
      date: new Date().toISOString(),
    });

    await initialBalanceMaterial.save();

    // Responder con éxito
    res.status(200).json({ message: "Saved Successfully" });
  } catch (error) {
    // Capturar error, mostrar en consola y responder con error 500
    console.error("error", error);
    res.status(500).json("Internal server error");
  }
};

// DELETE - Eliminar materia prima por ID
rawMaterialsControllers.deleterRawMaterial = async (req, res) => {
  try {
    const deleted = await rawMaterialModel.findByIdAndUpdate(
      req.params.id,
      { deleted: true }, // Se marca como "eliminada"
      { new: true }
    ); // Eliminar por ID

    // Validar si se encontró y eliminó el registro
    if (!deleted) {
      return res.status(400).json({ message: "RawMaterial not found" });
    }

    // Responder con éxito
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    // Capturar error, mostrar en consola y responder con error 500
    console.error("error", error);
    res.status(500).json("Internal server error");
  }
};

// PUT - Actualizar materia prima existente por ID
rawMaterialsControllers.updaterRawMaterial = async (req, res) => {
  // Desestructurar datos del cuerpo de la petición
  const {
    currentStock,
    currentPrice,
    idRawMaterialCategory,
    idSupplier,
    name,
    unit,
  } = req.body;

  try {
    // Validaciones similares a las del POST para asegurar integridad de datos
    if (
      currentStock == null ||
      currentPrice == null ||
      !idRawMaterialCategory ||
      !idSupplier ||
      !name ||
      !unit
    ) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" });
    }

    if (typeof currentStock !== "number" || currentStock < 0) {
      return res.status(400).json({ message: "Invalid stock value" });
    }

    if (typeof currentPrice !== "number" || currentPrice < 0) {
      return res.status(400).json({ message: "Invalid price value" });
    }

    if (name.length < 3 || name.length > 100) {
      return res
        .status(400)
        .json({ message: "Name must be 3-100 characters long" });
    }

    if (unit.length < 1 || unit.length > 20) {
      return res
        .status(400)
        .json({ message: "Unit must be 1-20 characters long" });
    }

    // Buscar y actualizar materia prima por ID con los datos nuevos
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
      { new: true } // Para que retorne el documento actualizado
    );

    // Validar que exista el registro a actualizar
    if (!updated) {
      return res.status(400).json({ message: "RawMaterial not found" });
    }

    // Responder con éxito
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    // Capturar error, mostrar en consola y responder con error 500
    console.error("error", error);
    res.status(500).json("Internal server error");
  }
};

// Restaurar, update para marcar como no eliminado
rawMaterialsControllers.restoreRawMaterials = async (req, res) => {
  try {
    const restoreRawMaterials = await rawMaterialModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoreRawMaterials) {
      return res
        .status(400)
        .json({ message: "Restore Raw Materials not found" }); // No encontrada
    }

    res.status(200).json({ message: "Raw Material restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// GET - Obtener materias primas con menor stock
rawMaterialsControllers.getLowestRawMaterials = async (req, res) => {
  try {
    const lowStockMaterials = await rawMaterialModel.aggregate([
      { $match: { deleted: false } },
      {
        $addFields: {
          diffToMinimum: {
            $subtract: [
              { $ifNull: ["$currentStock", 0] },
              { $ifNull: ["$minimunStock", 0] },
            ],
          },
          isBelowMinimum: {
            $lt: [
              { $ifNull: ["$currentStock", 0] },
              { $ifNull: ["$minimunStock", 0] },
            ],
          },
        },
      },
      {
        $sort: { diffToMinimum: 1 }, // Ordena por los más críticos primero
      },
      {
        $limit: 20, // Puedes ajustar el límite según lo que necesites
      },
      {
        $project: {
          name: 1,
          currentStock: 1,
          minimunStock: 1,
          unit: 1,
          diffToMinimum: 1,
          isBelowMinimum: 1,
          stockWithUnit: {
            $concat: [{ $toString: "$currentStock" }, " ", "$unit"],
          },
        },
      },
    ]);

    res.status(200).json(lowStockMaterials);
  } catch (error) {
    console.error("error", error);
    res.status(500).json("Internal server error");
  }
};

// Exportar controlador para ser usado en rutas
export default rawMaterialsControllers;
