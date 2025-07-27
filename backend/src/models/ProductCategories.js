/*
    Fields for product categories

    Campos:
        name - nombre de la categoría del producto
*/

import { Schema, model } from "mongoose";

const productCategoriesSchema = new Schema(
  {
    // Nombre de la categoría del producto
    name: {
      type: String, // Tipo texto
      required: true, // Campo obligatorio
      match: [
        // Validación con expresión regular para permitir solo letras y espacios
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios",
      ],
      minLength: 3, // Mínimo 3 caracteres
      maxLength: 100, // Máximo 100 caracteres
      trim: true, // Elimina espacios en blanco al inicio y final
    },

    // Campo para eliminación lógica de la categoría
    deleted: {
      type: Boolean, // Tipo booleano
      default: false, // Por defecto no eliminado
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    strict: false, // Permite guardar campos no definidos en el esquema (flexibilidad)
  }
);

// Exporto el modelo para usar en otras partes de la aplicación
export default model("productCategories", productCategoriesSchema);
