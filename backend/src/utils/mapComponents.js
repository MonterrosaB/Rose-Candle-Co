// utils/mapComponents.js
export const mapComponentsToHistoryFormat = (components) => {
  return components.map((c) => {
    const unitPrice = Number(c.unitPrice ?? c.idComponent?.currentPrice ?? 0);
    const amount = Number(c.amount ?? 0);

    return {
      idRawMaterial: c.idComponent?._id || c.idComponent, // Asegura que sea ObjectId
      amount,
      unit: c.unit || "unidad", // ⚠️ cambia esto si tus materias primas tienen unidad
      unitPrice,
      subtotal: +(amount * unitPrice).toFixed(2),
    };
  });
};
