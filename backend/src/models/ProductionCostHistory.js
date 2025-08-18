/*
    Fields for product production cost history
    
    Campos:
        products       - Lista de productos involucrados en la producción
        date           - Fecha del registro de costos
        total          - Total del costo de producción
*/

import { Schema, model } from "mongoose";

/* 
  Sub-schema para detallar la materia prima utilizada en un producto.
  No genera _id automático porque es un subdocumento embebido.
*/
const rawMaterialUsedSchema = new Schema(
  {
    idRawMaterial: {
      type: Schema.Types.ObjectId,
      ref: "RawMaterial", // Referencia al modelo Materia Prima
      required: true, // Obligatorio indicar materia prima usada
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, "La cantidad debe ser mayor que cero"], // Cantidad mínima positiva
      validate: {
        validator: (value) => /^\d+(\.\d{1,2})?$/.test(value), // Max 2 decimales
        message: "La cantidad debe tener como máximo dos decimales",
      },
    },
    unit: {
      type: String,
      required: true, // Unidad de medida (ej: kg, litros)
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, "El precio unitario no puede ser negativo"], // Precio positivo o cero
      validate: {
        validator: (value) => /^\d+(\.\d{1,4})?$/.test(value), // Max 4 decimales
        message: "El precio unitario debe tener como máximo cuatro decimales",
      },
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, "El subtotal no puede ser negativo"], // Subtotal >= 0
      validate: {
        validator: (value) => /^\d+(\.\d{1,2})?$/.test(value), // Max 2 decimales
        message: "El subtotal debe tener como máximo dos decimales",
      },
    },
  },
  { _id: false } // No genera _id para evitar redundancia en subdocumentos
);

/* 
  Sub-schema para productos incluidos en la producción.
  No genera _id automático.
*/
const productionCostHistorySchema = new Schema({
  idProduct: {
    type: Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  variants: [
    {
      variantName: { type: String, required: true },
      amount: {
        type: Number,
        required: true,
        min: 0.01,
      },
      unitPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      productionCost: {
        type: Number,
        required: true,
        min: 0,
      },
      rawMaterialUsed: {
        type: [rawMaterialUsedSchema],
        required: true,
      },
    },
  ],
  date: { type: Date, default: Date.now },
});

// Exporto el modelo para usarlo en otros archivos
export default model("ProductionCostHistory", productionCostHistorySchema);
