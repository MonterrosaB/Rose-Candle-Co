// services/productionCostService.js
import ProductionCostHistory from "../models/ProductionCostHistory.js";

export const createProductionCostHistory = async ({ idProduct, variants }) => {
  if (!idProduct || !variants || !Array.isArray(variants)) {
    throw new Error("Invalid data to create production cost history");
  }

  const variantsWithCost = variants.map((v) => {
    const rawMaterialUsed = v.rawMaterialUsed.map((rm) => ({
      idRawMaterial: rm.idRawMaterial,
      amount: rm.amount,
      unit: rm.unit,
      unitPrice: rm.unitPrice,
      subtotal: +(rm.amount * rm.unitPrice).toFixed(2),
    }));

    const productionCost = rawMaterialUsed.reduce(
      (acc, rm) => acc + rm.subtotal,
      0
    );

    return {
      variantName: v.variantName,
      amount: v.amount || 1,
      unitPrice: v.unitPrice,
      productionCost,
      rawMaterialUsed,
    };
  });

  const newRecord = new ProductionCostHistory({
    idProduct,
    variants: variantsWithCost,
  });

  return await newRecord.save();
};
