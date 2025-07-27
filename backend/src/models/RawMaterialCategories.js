import { Schema, model } from "mongoose";

// Esquema para categorías de materias primas
const rawMaterialCategoriesSchema = new Schema(
  {
    name: {
      type: String,
      require: true, // Campo obligatorio
      minLength: 3, // Mínimo 3 caracteres para el nombre
      trim: true, // Elimina espacios en blanco al inicio y fin
    },

    // Campo para eliminación lógica de la categoría
    deleted: {
      type: Boolean, // Tipo booleano
      default: false, // Por defecto no eliminado
    },
  },
  {
    timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
    strict: false, // Permite que se guarden campos no definidos en el esquema
  }
);

// Exporto el modelo para usarlo en otras partes de la aplicación
export default model("RawMaterialCategories", rawMaterialCategoriesSchema);

