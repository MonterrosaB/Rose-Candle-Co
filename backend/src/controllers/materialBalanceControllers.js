import materialBalanceModel from "../models/MaterialBalance.js"; // Importar modelo de materialBalance
import rawMaterial from "../models/RawMaterials.js"; // Importar modelo de materialBalance

// Controlador con métodos CRUD para materialBalance
const materialBalanceControllers = {};

// GET - obtener todos los registros de materialBalance
materialBalanceControllers.getMaterialBalance = async (req, res) => {
  try {
    // Buscar todos los documentos en la colección
    const MaterialBalance = await materialBalanceModel
      .find({ deleted: false }) // Buscar todas las colecciones, salvo las que no han sido eliminadas
      .populate("idMaterial", "name")
      .sort({ date: -1 }); // Ordenar por fecha descendente (más nuevo primero)
    // Enviar respuesta con datos encontrados
    res.status(200).json(MaterialBalance); // Respuesta exitosa
  } catch (error) {
    // Manejo de errores del servidor
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// POST - crear nuevo registro de materialBalance
materialBalanceControllers.createMaterialBalance = async (req, res) => {
  const { idMaterial, movement, amount, unitPrice, reference, date } = req.body;

  try {
    // 1. Crear nuevo registro de balance
    const newMaterialBalance = new materialBalanceModel({
      idMaterial,
      movement,
      amount,
      unitPrice,
      reference,
      date: date || new Date().toISOString(), // Usa la fecha proporcionada o actual en UTC
    });
    await newMaterialBalance.save();

    // 2. Buscar el material original para actualizarlo
    const rawMaterialNewBalance = await rawMaterial.findById(idMaterial);
    if (!rawMaterialNewBalance) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    // 3. Calcular nuevo stock y precio
    let newStock = rawMaterialNewBalance.currentStock;
    if (movement === "entrada") newStock += amount;
    else if (movement === "salida") newStock -= amount;

    const totalValorExistente =
      rawMaterialNewBalance.currentStock * rawMaterialNewBalance.currentPrice;
    const totalValorNuevo = amount * unitPrice;
    const newTotalStock = rawMaterialNewBalance.currentStock + amount;

    const newPrice = Number(
      ((totalValorExistente + totalValorNuevo) / newTotalStock).toFixed(2)
    );

    // 4. Actualizar el documento de materia prima
    rawMaterialNewBalance.currentStock = newStock;
    rawMaterialNewBalance.currentPrice = newPrice;
    await rawMaterialNewBalance.save();

    res
      .status(200)
      .json({ message: "Material balance saved and raw material updated" });
  } catch (error) {
    console.error("Error in createMaterialBalance:", error);
    res.status(500).json("Internal server error");
  }
};

// PUT - actualizar un registro existente por ID
materialBalanceControllers.updateMaterialBalance = async (req, res) => {
  // Obtener dato 'name' desde cuerpo de la petición
  const { name } = req.body;

  try {
    // Validar longitud mínima de 'name'
    if (name.length < 3) {
      return res.status(400).json({ message: "Too short" }); // Validación cliente: texto muy corto
    }

    // Validar longitud máxima de 'name'
    if (name.length > 100) {
      return res.status(400).json({ message: "Too large" }); // Validación cliente: texto muy largo
    }

    // Buscar por ID y actualizar el registro
    const updatedMaterialBalance = await materialBalanceModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true } // Retorna el documento actualizado
    );

    // Validar si el registro existe
    if (!updatedMaterialBalance) {
      return res.status(400).json({ message: "MaterialBalance not found" }); // No encontrado
    }

    // Responder con mensaje de éxito
    res.status(200).json({ message: "MaterialBalance updated" });
  } catch (error) {
    // Capturar errores y responder error de servidor
    console.log("error " + error);
    return res.status(500).json("Internal server error");
  }
};

// DELETE - eliminar un registro por ID
materialBalanceControllers.deleteMaterialBalance = async (req, res) => {
  try {
    const deletedMaterialBalance = await materialBalanceModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    // Validar si el registro fue encontrado y eliminado
    if (!deletedMaterialBalance) {
      return res.status(400).json({ message: "MaterialBalance not found" }); // No encontrado
    }

    // Responder con mensaje de éxito
    res.status(200).json({ message: "MaterialBalance deleted" });
  } catch (error) {
    // Manejo de errores del servidor
    console.log("error " + error);
    return res.status(500).json("Internal server error");
  }
};
materialBalanceControllers.restoreMaterialBalance = async (req, res) => {
  try {
    const restoreMaterialBalance = await materialBalanceModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoreMaterialBalance) {
      return res.status(400).json({ message: "MaterialBalance not found" }); // No encontrada
    }

    res.status(200).json({ message: "MaterialBalance restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

// Exportar controlador para su uso en rutas
export default materialBalanceControllers;
