import productionCostHistoryModel from "../models/ProductionCostHistory.js"; // Importar modelo de historial de costos de producción
import Product from "../models/Products.js";
const productionCostHistoryController = {};

// GET - Obtener todo el historial de costos de producción
productionCostHistoryController.getProductionCostHistory = async (req, res) => {
  try {
    // Buscar todos los registros y popular referencias a otras colecciones
    const productionCostHistory = await productionCostHistoryModel.aggregate([
      { $unwind: "$variants" },
      { $unwind: "$variants.rawMaterialUsed" },

      // Agrupar materias primas de cada variante
      {
        $group: {
          _id: {
            idProduct: "$idProduct",
            variantName: "$variants.variantName",
            idRawMaterial: "$variants.rawMaterialUsed.idRawMaterial",
            unit: "$variants.rawMaterialUsed.unit",
          },
          totalAmount: { $sum: "$variants.rawMaterialUsed.amount" },
          totalCost: { $sum: "$variants.rawMaterialUsed.subtotal" },
        },
      },

      // Reagrupar por producto+variante
      {
        $group: {
          _id: {
            idProduct: "$_id.idProduct",
            variantName: "$_id.variantName",
          },
          materials: {
            $push: {
              idRawMaterial: "$_id.idRawMaterial",
              unit: "$_id.unit",
              totalAmount: "$totalAmount",
              totalCost: "$totalCost",
            },
          },
        },
      },

      // Lookup para productos
      {
        $lookup: {
          from: "products",
          localField: "_id.idProduct",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },

      // Lookup para materias primas
      {
        $lookup: {
          from: "rawmaterials",
          localField: "materials.idRawMaterial",
          foreignField: "_id",
          as: "rawMaterialsInfo",
        },
      },

      // Mergear info de materias primas con cada objeto en materials
      {
        $addFields: {
          materials: {
            $map: {
              input: "$materials",
              as: "mat",
              in: {
                unit: "$$mat.unit",
                totalAmount: "$$mat.totalAmount",
                totalCost: "$$mat.totalCost",
                idRawMaterial: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$rawMaterialsInfo",
                        as: "info",
                        cond: { $eq: ["$$info._id", "$$mat.idRawMaterial"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $sort: {
          "product.name": 1,
          "_id.variantName": 1,
        },
      },
      {
        $project: {
          product: "$product.name", // 👈 solo el nombre
          materials: {
            $map: {
              input: "$materials",
              as: "m",
              in: {
                material: "$$m.idRawMaterial.name",
                quantity: {
                  $concat: [{ $toString: "$$m.totalAmount" }, " ", "$$m.unit"],
                },
                cost: {
                  $concat: [{ $literal: "$" }, { $toString: "$$m.totalCost" }],
                },
              },
            },
          },
        },
      },
    ]);

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
    const deleted = await productionCostHistoryModel.findByIdAndUpdate(
      req.params.id,
      { deleted: true }, // Se marca como "eliminada"
      { new: true }
    ); // Eliminar por ID
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

productionCostHistoryController.restoreProductionCostHistory = async (
  req,
  res
) => {
  try {
    const productionCostHistory = await productCategories.findByIdAndUpdate(
      req.params.id,
      { deleted: false }, // Se marca como "no eliminada"
      { new: true }
    ); // Se actualiza por ID

    if (!productionCostHistory) {
      return res
        .status(400)
        .json({ message: "production Cos tHistory not found" }); // No encontrada
    }

    res.status(200).json({ message: "production Cost Historyt restored" }); // Restauracion exitosa
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json("Internal server error"); // Error del servidor
  }
};

//reportes

productionCostHistoryController.getProductsCostAndProfit = async (req, res) => {
  try {
    const result = await Product.aggregate([
      { $match: { deleted: false } }, // solo productos activos

      //  Lookup para traer historial de producción
      {
        $lookup: {
          from: "productioncosthistories",
          let: { productId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$idProduct", "$$productId"] } } },
            { $sort: { date: -1 } }, // último registro
            { $limit: 1 },
          ],
          as: "costHistory",
        },
      },
      { $unwind: { path: "$costHistory", preserveNullAndEmptyArrays: true } },

      //  Desanidar variantes del producto
      { $unwind: "$variant" },

      //  Tomar el costo de producción correspondiente a la variante
      {
        $addFields: {
          variantCost: {
            $arrayElemAt: [
              {
                $filter: {
                  input: { $ifNull: ["$costHistory.variants", []] },
                  cond: { $eq: ["$$this.variantName", "$variant.variant"] },
                },
              },
              0,
            ],
          },
        },
      },

      //  Calcular costo y % ganancia
      {
        $addFields: {
          productionCost: { $ifNull: ["$variantCost.productionCost", 0] },
          profitPercent: {
            $cond: [
              { $gt: ["$variant.variantPrice", 0] },
              {
                $multiply: [
                  {
                    $divide: [
                      {
                        $subtract: [
                          "$variant.variantPrice",
                          { $ifNull: ["$variantCost.productionCost", 0] },
                        ],
                      },
                      "$variant.variantPrice",
                    ],
                  },
                  100,
                ],
              },
              0,
            ],
          },
        },
      },

      //  Dar formato final
      {
        $project: {
          _id: 0,
          Product: {
            $concat: ["$name", " - ", "$variant.variant"],
          },
          salePrice: "$variant.variantPrice",
          productionCost: "$productionCost",
          Earnigs: { $round: ["$profitPercent", 2] },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener resumen de productos" });
  }
};

export default productionCostHistoryController; // Exportar controlador
