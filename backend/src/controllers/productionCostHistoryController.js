import productionCostHistoryModel from "../models/ProductionCostHistory.js";

const productionCostHistoryController = {};

// GET
productionCostHistoryController.getProductionCostHistory = async (req, res) => {
  try {
    const productionCostHistory = await productionCostHistoryModel
      .find()
      .populate({
        path: "idSalesOrder",
      })
      .populate({
        path: "products.idProduct",
      })
      .populate({
        path: "products.rawMaterialUsed.idRawMaterial",
      });
    res.status(200).json(productionCostHistory); // Todo bien
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error"); // Error del servidor
  }
};

// POST
productionCostHistoryController.createProductionCostHistory = async (
  req,
  res
) => {
  const { idSalesOrder, products, date, total, earning } = req.body;

  try {
    // Validaciones básicas
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Debe incluir al menos un producto" });
    }

    if (!date || isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Fecha inválida" });
    }

    if (total === undefined || total < 0) {
      return res
        .status(400)
        .json({ message: "El total debe ser un número positivo" });
    }

    if (earning === undefined || earning < 0) {
      return res
        .status(400)
        .json({ message: "La ganancia debe ser un número positivo" });
    }

    // Crear y guardar
    const newHistorial = new productionCostHistoryModel({
      idSalesOrder,
      products,
      date,
      total,
      earning,
    });
    await newHistorial.save();

    res.status(200).json({ message: "Saved Successfully" });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// DELETE
productionCostHistoryController.deleteProductionCostHistory = async (
  req,
  res
) => {
  try {
    const deleted = await productionCostHistoryModel.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
      return res.status(400).json({ message: "Historial not found" });
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

// PUT
productionCostHistoryController.updateproductionCostHistory = async (
  req,
  res
) => {
  const { idSalesOrder, products, date, total, earning } = req.body;

  try {
    // Validaciones básicas
    if (products && (!Array.isArray(products) || products.length === 0)) {
      return res
        .status(400)
        .json({ message: "Debe incluir al menos un producto" });
    }

    if (date && isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Fecha inválida" });
    }

    if (total !== undefined && total < 0) {
      return res
        .status(400)
        .json({ message: "El total debe ser un número positivo" });
    }

    if (earning !== undefined && earning < 0) {
      return res
        .status(400)
        .json({ message: "La ganancia debe ser un número positivo" });
    }

    const updated = await productionCostHistoryModel.findByIdAndUpdate(
      req.params.id,
      { idSalesOrder, products, date, total, earning },
      { new: true }
    );

    if (!updated) {
      return res.status(400).json({ message: "Historial not found" });
    }

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json("Internal server error");
  }
};

export default productionCostHistoryController;
