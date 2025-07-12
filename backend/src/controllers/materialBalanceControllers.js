import materialBalanceModel from "../models/materialBalance.js";
import RawMaterials from "../models/RawMaterials.js";

const materialBalanceControllers = {};

// POST - Crear movimiento de materia prima
materialBalanceControllers.createMaterialBalance = async (req, res) => {
  const { idMaterial, movement, amount, unitPrice, reference, date } = req.body;

  try {
    // Validaciones básicas
    if (!idMaterial || !movement || !amount || !unitPrice || !date) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    // Crear movimiento
    const newMovement = new materialBalanceModel({
      idMaterial,
      movement,
      amount,
      unitPrice,
      reference,
      date,
    });

    await newMovement.save();

    // Si el movimiento es una entrada, actualizar el stock y precio promedio
    if (movement === "entrada") {
      const rawMaterial = await RawMaterials.findById(idMaterial);

      if (!rawMaterial) {
        return res.status(404).json({ message: "Materia prima no encontrada" });
      }

      // Calcular nuevo stock
      const currentStock = rawMaterial.stock || 0;
      const newStock = currentStock + amount;

      // Calcular nuevo precio promedio ponderado
      const currentTotalValue = rawMaterial.stock * rawMaterial.unitPrice;
      const newValue = amount * unitPrice;
      const totalAmount = currentStock + amount;

      const averagePrice =
        totalAmount === 0 ? 0 : (currentTotalValue + newValue) / totalAmount;

      // Actualizar materia prima
      rawMaterial.stock = newStock;
      rawMaterial.unitPrice = averagePrice;

      await rawMaterial.save();
    }

    return res
      .status(200)
      .json({ message: "Movimiento guardado y materia prima actualizada" });
  } catch (error) {
    console.log("Error al crear movimiento: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default materialBalanceControllers;
