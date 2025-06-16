/*
    fields fro products
    
    Campos:
        products, 
        date, 
        total, 
        earning, 
        idSalesOrder
*/

import { Schema, model } from "mongoose";

/* SCHEMA PARA LA MATERIA UTILIZADA  */
const rawMaterialUsedSchema = new Schema(
  {
    idRawMaterial: {
      type: Schema.Types.ObjectId,
      ref: "RawMaterial", // Nombre del modelo de materia prima
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, "La cantidad debe ser mayor que cero"],
      validate: {
        validator: (value) => /^\d+(\.\d{1,2})?$/.test(value),
        message: "La cantidad debe tener como máximo dos decimales",
      },
    },
    unit: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, "El precio unitario no puede ser negativo"],
      validate: {
        validator: (value) => /^\d+(\.\d{1,4})?$/.test(value),
        message: "El precio unitario debe tener como máximo cuatro decimales",
      },
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, "El subtotal no puede ser negativo"],
      validate: {
        validator: (value) => /^\d+(\.\d{1,2})?$/.test(value),
        message: "El subtotal debe tener como máximo dos decimales",
      },
    },
  },
  { _id: false } /* No genera un _id automático para este subdocumento. */
);

/* SCHEMA PARA LOS PRODUCTOS  */
const productsSchema = new Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, "La cantidad debe ser mayor que cero"],
      validate: {
        validator: (value) => /^\d+(\.\d{1,2})?$/.test(value),
        message: "La cantidad debe tener como máximo dos decimales",
      },
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, "El precio no puede ser negativo"],
      validate: {
        validator: (value) => /^\d+(\.\d{1,2})?$/.test(value),
        message: "El precio unitario debe tener como máximo dos decimales",
      },
    },
    productionCost: {
      type: Number,
      required: true,
      min: [0, "El costo de producción no puede ser negativo"],
      validate: {
        validator: (value) => /^\d+(\.\d{1,2})?$/.test(value),
        message: "El costo de producción debe tener como máximo dos decimales",
      },
    },
    rawMaterialUsed: {
      type: [rawMaterialUsedSchema],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "Debe haber al menos una materia prima utilizada",
      },
    },
  },
  { _id: false } /* No genera un _id automático para este subdocumento. */
);

const productionCostHistorySchema = new Schema(
  {
    idSalesOrder: {
      type: Schema.Types.ObjectId,
      ref: "SalesOrder",
      require: true,
    },
    products: {
      type: [productsSchema],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "Debe incluir al menos un producto",
      },
    },
    date: {
      type: Date,
      required: true,
    },
    total: {
      type: Number,
      min: 1,
      max: 1000,
      match: [
        /^\d+(\.\d{1,2})?$/,
        "El total debe ser un número válido, con hasta dos decimales",
      ],
      required: true,
    },
    earning: {
      type: Number,
      min: 1,
      max: 1000,
      match: [
        /^\d+(\.\d{1,2})?$/,
        "La ganancia debe ser un número válido, con hasta dos decimales",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

// Exporto
export default model("ProductionCostHistory", productionCostHistorySchema);
