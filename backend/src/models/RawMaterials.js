import { Schema, model } from "mongoose";

// Esquema para la colección de Materias Primas
const RawMaterial = new Schema(
  {
    // Nombre de la materia prima
    name: {
      type: String,
      required: [true, "Name is required"], // Campo obligatorio con mensaje personalizado
      minlength: [3, "Name must be at least 3 characters"], // Longitud mínima
      maxlength: [100, "Name must be less than 100 characters"], // Longitud máxima
      trim: true, // Elimina espacios en blanco al inicio y fin
    },

    // Stock actual disponible de la materia prima
    currentStock: {
      type: Number,
      required: [true, "Current stock is required"], // Campo obligatorio
      min: [0, "Current stock cannot be negative"], // No se permiten valores negativos
    },

    // Minimun stock disponible de la materia prima
    minimunStock: {
      type: Number,
      required: [true, "Minimun Stock is required"], // Campo obligatorio
      min: [0, "Minimun stock cannot be negative"], // No se permiten valores negativos
    },

    // Precio actual por unidad de la materia prima
    currentPrice: {
      type: Number,
      required: [true, "Current price is required"], // Campo obligatorio
      min: [0, "Current price cannot be negative"], // No se permiten valores negativos
    },

    // Unidad de medida para la materia prima
    unit: {
      type: String,
      required: [true, "Unit is required"], // Campo obligatorio
      enum: {
        values: ["kg", "g", "l", "ml", "m", "cm", "unit", "piece"], // Valores permitidos
        message: "Unit must be one of: kg, g, l, ml, m, cm, unit, piece", // Mensaje de error personalizado
      },
      trim: true, // Elimina espacios en blanco al inicio y fin
    },

    // Referencia a la categoría de materia prima
    idRawMaterialCategory: {
      type: Schema.Types.ObjectId,
      ref: "RawMaterialCategories", // Nombre del modelo referenciado
      required: [true, "Raw material category is required"], // Campo obligatorio
    },

    // Referencia al proveedor de la materia prima
    idSupplier: {
      type: Schema.Types.ObjectId,
      ref: "Suppliers", // Nombre del modelo referenciado
      required: [true, "Supplier reference is required"], // Campo obligatorio
    },

    // Campo para eliminación lógica de la materia prima
    deleted: {
      type: Boolean, // Tipo booleano
      default: false, // Por defecto no eliminado
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    strict: false, // Permite campos adicionales no definidos en el esquema
  }
);

// Exporta el modelo para usar en otras partes del proyecto
export default model("RawMaterial", RawMaterial);
