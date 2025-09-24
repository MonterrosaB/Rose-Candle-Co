/*
    Colección para historial de precios de un producto
    
    Campos:
        idProduct - Referencia al producto cuyo precio ha cambiado
        variantName - Variante afectada
        unitPrice - Precio asignado
        reference - Referencia de cambio de precio
        changedBy - Quien realizo el cambio
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
    variantName: {
      type: String,
      required: false, // Opcional si el cambio aplica al producto completo
      trim: true,
      minLength: [1, "El nombre de la variante debe tener al menos 1 carácter"],
      maxLength: [
        200,
        "El nombre de la variante no puede exceder 200 caracteres",
      ],
    },
    // Precio unitario del material en esta transacción
    unitPrice: {
      type: Number,
      required: [true, "El precio unitario es obligatorio"],
      min: [0, "El precio unitario no puede ser negativo"], // Precio no negativo
      max: [1000000, "El precio unitario es demasiado alto"], // Limite superior arbitrario para evitar errores
      validate: {
        validator: Number.isFinite, // Validación numérica
        message: "El precio unitario debe ser un número válido",
      },
    },
    // Motivo o razón por la cual se registró este cambio de precio
    reference: {
      type: String,
      maxlength: [200, "La referencia no debe exceder los 200 caracteres"],
      minlength: [2, "La referencia no debe ser menos de 2 caracteres"],
      trim: true,
      default: "Cambio de precio", // Valor por defecto si no se proporciona
    },
    changedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employees", // Referencia al modelo Productos
      required: true,
    },
  },
  {
    timestamps: true, // Añade automáticamente createdAt y updatedAt
    strict: false, // Permite almacenar campos no definidos explícitamente en el esquema
  }
);

// Exporto el modelo para usar en otras partes de la aplicación
export default model("ProductPriceHistory", productPriceHistorySchema);
