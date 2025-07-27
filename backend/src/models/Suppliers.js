import { Schema, model } from "mongoose";

const suppliersSchema = new Schema(
  {
    // Nombre del proveedor
    name: {
      type: String,
      required: true, // Nombre obligatorio
      minLength: 3, // Mínimo 3 caracteres
      trim: true, // Elimina espacios al inicio y final
    },
    // Número de contacto del proveedor, con formato específico
    contact: {
      type: String,
      required: true, // Contacto obligatorio
      match: [
        /^\d{4}-\d{4}$/, // Debe seguir el formato 1234-5678
        "Número de contacto no válido (formato debe ser ####-####)",
      ],
      trim: true, // Elimina espacios innecesarios
    },

    // Campo para eliminación lógica del proveedor
    deleted: {
      type: Boolean,
      default: false, // Por defecto no eliminado
    },
  },
  {
    timestamps: true, // Crea createdAt y updatedAt automáticamente
    strict: false, // Permite campos adicionales no definidos en el esquema
  }
);

// Exporto el modelo para usarlo en la app
export default model("Suppliers", suppliersSchema);
