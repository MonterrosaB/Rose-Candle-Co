/*
    Colección para historial de precios de un producto
    
    Campos:
        idProduct    - Referencia al producto cuyo precio ha cambiado
        reason       - Motivo del cambio de precio
        amountSold   - Cantidad vendida con ese precio
        deleted      - Eliminación lógica (true = eliminado)
*/
import { Schema, model } from "mongoose";

const productPriceHistorySchema = new Schema(
  {
    // Referencia al producto al que pertenece este historial de precios
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products", // Referencia al modelo Productos
      required: true, // Es obligatorio referenciar un producto
      trim: true, // Elimina espacios al inicio y final
    },

    // Motivo o razón por la cual se registró este cambio de precio
    reason: {
      type: String,
      required: true, // Motivo obligatorio para el cambio de precio
      minLength: [5, "El motivo debe tener al menos 5 caracteres"], // Longitud mínima
      trim: true, // Elimina espacios en blanco
    },

    // Cantidad de productos vendidos bajo este precio
    amountSold: {
      type: Number,
      required: true, // Cantidad vendida obligatoria
      min: [0, "La cantidad no puede ser negativa"], // No puede ser menor a 0
      match: [/^(0|[1-9]\d*)(\.\d+)?$/, "Número no válido"], // Número entero o decimal positivo
      trim: true, // Aunque no afecta números, se incluye por consistencia
    },

    // Campo para eliminación lógica del registro
    deleted: {
      type: Boolean, // Tipo booleano
      default: false, // Por defecto no eliminado
    },
  },
  {
    timestamps: true, // Añade automáticamente createdAt y updatedAt
    strict: false, // Permite almacenar campos no definidos explícitamente en el esquema
  }
);

// Exporto el modelo para usar en otras partes de la aplicación
export default model("ProductPriceHistory", productPriceHistorySchema);
