// utils/mapComponents.js
import RawMaterialModel from "../models/RawMaterials.js"; // DEBES IMPORTAR EL MODELO

export const mapComponentsToHistoryFormat = async (components) => {
  if (!Array.isArray(components) || components.length === 0) {
    return [];
  }

  const componentHistoryData = await Promise.all(
    components.map(async (c) => {
      const amount = Number(c.amount ?? 0);
      const rawMaterialId = c.idComponent?._id || c.idComponent;

      // 1. Obtener los datos faltantes de la DB
      const rawMaterial = await RawMaterialModel.findById(
        rawMaterialId,
        "unit currentPrice"
      ).lean();

      // Si no existe la materia prima o no tiene precio, no registrar
      if (!rawMaterial || !rawMaterial.currentPrice || amount <= 0) {
        return null;
      }

      // 2. Usar los datos de la DB
      const unitPrice = Number(rawMaterial.currentPrice);

      return {
        idRawMaterial: rawMaterialId,
        amount,
        unit: rawMaterial.unit,
        unitPrice,
        subtotal: +(amount * unitPrice).toFixed(2),
      };
    })
  );

  // Filtrar los nulos
  return componentHistoryData.filter((data) => data !== null);
};
