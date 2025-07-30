import productPriceHistoryModel from "../models/ProductPriceHistory.js"; // Importar modelo de historial de precios de productos

// Controlador con métodos CRUD para historial de precios
const productPriceHistoryController = {};

// GET - Obtener todo el historial de precios de productos
productPriceHistoryController.getProductPriceHistory = async (req, res) => {
  try {
    // Buscar todos los registros en la colección
    const productPriceHistory = await productPriceHistoryModel.find({ deleted: false }) // Buscar todas las colecciones, salvo las que no han sido eliminadas
    // Responder con los datos encontrados
    res.status(200).json(productPriceHistory); // Todo bien
  } catch (error) {
    // Capturar y mostrar error en consola
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// POST - Crear un nuevo registro en el historial de precios
productPriceHistoryController.createProductPriceHistory = async (req, res) => {
  // Obtener datos enviados en el cuerpo de la petición
  const { idProduct, reason, amountSold } = req.body;

  try {
    // Validaciones básicas de entrada
    if (!idProduct || !reason || !amountSold) {
      return res
        .status(400)
        .json({ message: "Please complete all the fields" }); // Campos vacíos
    }

    if (reason.length < 5) {
      return res.status(400).json({ message: "Too short" }); // Texto muy corto
    }

    if (amountSold < 0) {
      return res
        .status(400)
        .json({ message: "The amount can't be less than 0" }); // Monto inválido (negativo)
    }

    // Crear nuevo documento con los datos validados
    const newProductPriceHistory = new productPriceHistoryModel({
      idProduct,
      reason,
      amountSold,
    });
    // Guardar en la base de datos
    await newProductPriceHistory.save();

    // Responder con éxito
    res.status(200).json({ message: "Saved Successfull" }); // Todo bien
  } catch (error) {
    // Capturar y mostrar error en consola
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// DELETE - Eliminar un registro del historial por ID
productPriceHistoryController.deleteProductPriceHistory = async (req, res) => {
 try {
        const deletedHistory = await productPriceHistoryModel.findByIdAndUpdate(
              req.params.id,
              { deleted: true }, // Se marca como "eliminada"
              { new: true }
            ); // Eliminar por ID

    // Validar si se encontró el registro
    if (!deletedHistory) {
      return res.status(400).json({ message: "History not found" }); // Registro no encontrado
    }

    // Responder con éxito
    res.status(200).json({ message: "Deleted Successfull" }); // Todo bien
  } catch (error) {
    // Capturar y mostrar error en consola
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// PUT - Actualizar un registro existente en el historial por ID
productPriceHistoryController.updateProductPriceHistory = async (req, res) => {
  // Obtener datos del cuerpo de la petición
  const { idProduct, reason, amountSold } = req.body;

  try {
    // Validaciones básicas de entrada para actualización
    if (reason.length < 5) {
      return res.status(400).json({ message: "Too short" }); // Texto muy corto
    }

    if (amountSold < 0) {
      return res
        .status(400)
        .json({ message: "The amount can't be less than 0" }); // Monto inválido
    }

    // Actualizar documento con nuevos datos y devolver el documento actualizado
    const historyUpdated = await productPriceHistoryModel.findByIdAndUpdate(
      req.params.id,
      { idProduct, reason, amountSold },
      { new: true }
    );

    // Validar si el documento fue encontrado y actualizado
    if (!historyUpdated) {
      return res.status(400).json({ message: "History not found" }); // Registro no encontrado
    }

    // Responder con éxito
    res.status(200).json({ message: "Updated Successfull" }); // Todo bien
  } catch (error) {
    // Capturar y mostrar error en consola
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

productPriceHistoryController.restoreProductPriceHistory= async (req, res) => {
  try {
    const productPriceHistory = await productCategories.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!productPriceHistory) {
      return res.status(400).json({ message: "Product Price History not found" }); // No encontrada
    }

    res.status(200).json({ message: "Product Price History restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};
// Exportar controlador para ser usado en rutas
export default productPriceHistoryController;
