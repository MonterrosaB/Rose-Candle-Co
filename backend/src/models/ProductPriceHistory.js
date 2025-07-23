/*
    Colección para historial de precios de un producto
    
    Campos:
        idProduct    - Referencia al producto cuyo precio ha cambiado
        reason       - Motivo del cambio de precio
        amountSold   - Cantidad vendida con ese precio
*/

import { Schema, model } from "mongoose";

const productPriceHistorySchema = new Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products", // Referencia al modelo Productos
      require: true, // Es obligatorio referenciar un producto
      trim: true, // Elimina espacios al inicio y final
    },
    reason: {
      type: String,
      require: true, // Motivo obligatorio para el cambio de precio
      minLength: 5, // Longitud mínima para que la razón sea significativa
      trim: true, // Elimina espacios al inicio y final
    },
    amountSold: {
      type: Number,
      require: true, // Cantidad vendida obligatoria
      min: 0, // No puede ser negativo
      match: [/^(0|[1-9]\d*)(\.\d+)?$/, "Número no válido"], // Validación numérica correcta
      trim: true, // Aunque no afecta números, se mantiene por consistencia
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
    strict: false, // Permite guardar campos no definidos en el esquema
  }
);

// Exporto el modelo para usar en otras partes de la aplicación
export default model("ProductPriceHistory", productPriceHistorySchema);
