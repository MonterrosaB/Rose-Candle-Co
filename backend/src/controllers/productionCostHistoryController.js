import productionCostHistoryModel from "../models/ProductionCostHistory.js"; // Importar modelo de historial de costos de producción

const productionCostHistoryController = {};

// GET - Obtener todo el historial de costos de producción
productionCostHistoryController.getProductionCostHistory = async (req, res) => {
  try {
    // Buscar todos los registros y popular referencias a otras colecciones
    const productionCostHistory = await productionCostHistoryModel
      .find()
      .populate({
        path: "idSalesOrder", // Popular detalles del pedido de venta
      })
      .populate({
        path: "products.idProduct", // Popular detalles del producto en cada producto registrado
      })
      .populate({
        path: "products.rawMaterialUsed.idRawMaterial", // Popular materias primas usadas en cada producto
      });
    // Enviar respuesta con los datos encontrados
    res.status(200).json(productionCostHistory); // Respuesta exitosa
  } catch (error) {
    // Capturar y mostrar error en consola
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// POST - Crear un nuevo registro en el historial de costos de producción
productionCostHistoryController.createProductionCostHistory = async (
  req,
  res
) => {
  // Extraer campos del cuerpo de la petición
  const { idSalesOrder, products, date, total, earning } = req.body;

  try {
    // Validar que la lista de productos exista, sea un arreglo y no esté vacía
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Debe incluir al menos un producto" }); // Validación fallida: no hay productos
    }

    // Validar que la fecha sea válida
    if (!date || isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Fecha inválida" }); // Validación fecha inválida
    }

    // Validar que el total sea un número positivo
    if (total === undefined || total < 0) {
      return res
        .status(400)
        .json({ message: "El total debe ser un número positivo" }); // Validación total negativo o indefinido
    }

    // Validar que la ganancia sea un número positivo
    if (earning === undefined || earning < 0) {
      return res
        .status(400)
        .json({ message: "La ganancia debe ser un número positivo" }); // Validación ganancia negativa o indefinida
    }

    // Crear nuevo documento con los datos validados
    const newHistorial = new productionCostHistoryModel({
      idSalesOrder,
      products,
      date,
      total,
      earning,
    });

    // Guardar en la base de datos
    await newHistorial.save();

    // Enviar respuesta exitosa
    res.status(200).json({ message: "Saved Successfully" });
  } catch (error) {
    // Capturar y mostrar error en consola
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// DELETE - Eliminar un registro del historial por ID
productionCostHistoryController.deleteProductionCostHistory = async (
  req,
  res
) => {
  try {
    // Buscar y eliminar registro por ID
    const deleted = await productionCostHistoryModel.findByIdAndDelete(
      req.params.id
    );

    // Validar que el registro exista para eliminar
    if (!deleted) {
      return res.status(400).json({ message: "Historial not found" }); // No encontrado
    }

    // Responder con mensaje de éxito
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    // Capturar y mostrar error en consola
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// PUT - Actualizar un registro existente en el historial por ID
productionCostHistoryController.updateproductionCostHistory = async (
  req,
  res
) => {
  // Extraer campos del cuerpo de la petición
  const { idSalesOrder, products, date, total, earning } = req.body;

  try {
    // Validar que, si se envía lista de productos, sea un arreglo no vacío
    if (products && (!Array.isArray(products) || products.length === 0)) {
      return res
        .status(400)
        .json({ message: "Debe incluir al menos un producto" }); // Validación productos inválidos
    }

    // Validar que la fecha, si se envía, sea válida
    if (date && isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Fecha inválida" }); // Fecha inválida
    }

    // Validar que el total, si se envía, sea positivo
    if (total !== undefined && total < 0) {
      return res
        .status(400)
        .json({ message: "El total debe ser un número positivo" }); // Total inválido
    }

    // Validar que la ganancia, si se envía, sea positiva
    if (earning !== undefined && earning < 0) {
      return res
        .status(400)
        .json({ message: "La ganancia debe ser un número positivo" }); // Ganancia inválida
    }

    // Actualizar registro por ID con los datos enviados
    const updated = await productionCostHistoryModel.findByIdAndUpdate(
      req.params.id,
      { idSalesOrder, products, date, total, earning },
      { new: true } // Devuelve el documento actualizado
    );

    // Validar que el registro exista
    if (!updated) {
      return res.status(400).json({ message: "Historial not found" }); // No encontrado
    }

    // Responder con mensaje de éxito
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    // Capturar y mostrar error en consola
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

export default productionCostHistoryController; // Exportar controlador
