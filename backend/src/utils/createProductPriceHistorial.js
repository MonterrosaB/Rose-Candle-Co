// services/productPriceHistoryService.js
import productPriceHistoryModel from "../models/ProductPriceHistory.js";

export const createProductPriceHistory = async ({
  idProduct,
  variantName,
  unitPrice,
  reference,
  changedBy,
}) => {
  if (!idProduct || !variantName || !unitPrice || !changedBy) {
    throw new Error("Please complete all the fields");
  }

  if (!reference || reference.length < 2) {
    throw new Error("Reference is too short");
  }

  if (unitPrice < 0) {
    throw new Error("The amount can't be less than 0");
  }

  const newHistory = new productPriceHistoryModel({
    idProduct,
    variantName,
    unitPrice,
    reference,
    changedBy,
  });

  return await newHistory.save();
};
