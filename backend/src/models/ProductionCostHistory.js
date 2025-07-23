/*
    Fields for product production cost history
    
    Campos:
        products       - Lista de productos involucrados en la producción
        date           - Fecha del registro de costos
        total          - Total del costo de producción
        earning        - Ganancia obtenida
        idSalesOrder   - Referencia a la orden de venta relacionada
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
const productsSchema = new Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products", // Referencia al modelo Productos
      required: true, // Producto obligatorio
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, "La cantidad debe ser mayor que cero"], // Cantidad positiva
      validate: {
        validator: (value) => /^\d+(\.\d{1,2})?$/.test(value), // Max 2 decimales
        message: "La cantidad debe tener como máximo dos decimales",
      },
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, "El precio no puede ser negativo"], // Precio no negativo
      validate: {
        validator: (value) => /^\d+(\.\d{1,2})?$/.test(value), // Max 2 decimales
        message: "El precio unitario debe tener como máximo dos decimales",
      },
    },
    productionCost: {
      type: Number,
      required: true,
      min: [0, "El costo de producción no puede ser negativo"], // Costo no negativo
      validate: {
        validator: (value) => /^\d+(\.\d{1,2})?$/.test(value), // Max 2 decimales
        message: "El costo de producción debe tener como máximo dos decimales",
      },
    },
    rawMaterialUsed: {
      type: [rawMaterialUsedSchema], // Lista de materias primas usadas
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0, // Debe tener al menos una materia prima
        message: "Debe haber al menos una materia prima utilizada",
      },
    },
  },
  { _id: false } // Evita generación automática de _id para subdocumentos
);

/* Schema principal para historial de costos de producción */
const productionCostHistorySchema = new Schema(
  {
    idSalesOrder: {
      type: Schema.Types.ObjectId,
      ref: "SalesOrder", // Referencia a la orden de venta
      require: true, // Obligatorio relacionar orden de venta
    },
    products: {
      type: [productsSchema], // Lista de productos en la producción
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0, // Debe incluir al menos un producto
        message: "Debe incluir al menos un producto",
      },
    },
    date: {
      type: Date,
      required: true, // Fecha de la producción
    },
    total: {
      type: Number,
      min: 1,
      max: 1000,
      match: [
        /^\d+(\.\d{1,2})?$/,
        "El total debe ser un número válido, con hasta dos decimales",
      ],
      required: true, // Total del costo de producción
    },
    earning: {
      type: Number,
      min: 1,
      max: 1000,
      match: [
        /^\d+(\.\d{1,2})?$/,
        "La ganancia debe ser un número válido, con hasta dos decimales",
      ],
      required: true, // Ganancia obtenida en la producción
    },
  },
  {
    timestamps: true, // Campos createdAt y updatedAt automáticos
    strict: false, // Permite guardar campos no definidos en esquema
  }
);

// Exporto el modelo para usarlo en otros archivos
export default model("ProductionCostHistory", productionCostHistorySchema);
