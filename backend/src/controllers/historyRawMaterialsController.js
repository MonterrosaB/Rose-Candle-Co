import historyRawMaterialsModel from "../models/HistoryRawMaterials.js"; // Modelo de Historial de precios de materia prima

// Array de métodos (CRUD)
const historyRawMaterialsController = {};

// GET - Obtener todo el historial de precios de materias primas
historyRawMaterialsController.getHistoriRawMaterials = async (req, res) => {
  try {
    const historyRawMaterials = await historyRawMaterialsModel.find({ deleted: false }); // Buscar todas las colecciones, salvo las que no han sido eliminadas
    res.status(200).json(historyRawMaterials); // Respuesta exitosa
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// POST - Crear nuevo historial de precio
historyRawMaterialsController.createHistoriRawMaterials = async (req, res) => {
  // Obtener datos del cuerpo de la solicitud
  const { price, idRawMateria } = req.body;

  try {
    // Validar campos requeridos
    if (!price || !idRawMateria) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" }); // Campos incompletos
    }

    // Validar que el precio no sea negativo
    if (price < 0) {
      return res
        .status(400)
        .json({ message: "The price can't be less than 0" }); // Precio inválido
    }

    // Crear y guardar nuevo historial
    const newHistoryRawMaterial = new historyRawMaterialsModel({
      price,
      idRawMateria,
    });
    await newHistoryRawMaterial.save();
    res.status(200).json({ message: "Saved Successfully" }); // Registro exitoso
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// DELETE - Eliminar un historial por ID
historyRawMaterialsController.deleteHistoriRawMaterials = async (req, res) => {
   try {
      const deletedHistory = await historyRawMaterialsModel.findByIdAndUpdate(
            req.params.id,
            { deleted: true }, // Se marca como "eliminada"
            { new: true }
          ); // Eliminar por ID

    if (!deletedHistory) {
      return res.status(400).json({ message: "History not found" }); // Historial no encontrado
    }

    res.status(200).json({ message: "Deleted Successfully" }); // Eliminación exitosa
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// PUT - Actualizar un historial por ID
historyRawMaterialsController.updateHistoriRawMaterials = async (req, res) => {
  // Obtener datos del cuerpo
  const { price, idRawMateria } = req.body;

  try {
    // Validar que el precio no sea negativo
    if (price < 0) {
      return res
        .status(400)
        .json({ message: "The price can't be less than 0" }); // Precio inválido
    }
    

    // Actualizar historial existente
    historyUpdated = await historyRawMaterialsModel.findByIdAndUpdate(
      req.params.id, // ID recibido por parámetro
      { price, idRawMateria }, // Nuevos datos
      { new: true } // Retornar el documento actualizado
    );

    if (!historyUpdated) {
      return res.status(400).json({ message: "History not found" }); // Historial no encontrado
    }

    res.status(200).json({ message: "Updated Successfully" }); // Actualización exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

historyRawMaterialsController.restoreHistory = async (req, res) => {
  try {
    const restoreHistory = await historyRawMaterialsModel.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!restoreHistory) {
      return res.status(400).json({ message: "History not found" }); // No encontrada
    }

    res.status(200).json({ message: "Customers restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};
// Exportar controlador
export default historyRawMaterialsController;
