/*
    Colección para historial de precios de la materia prima

    Campos:
        price         -> Precio registrado de la materia prima
        idRawMateria  -> Referencia al documento de materia prima
*/
import { Schema, model } from "mongoose";

const historyRawMaterialSchema = new Schema(
  {
    // Precio registrado de la materia prima en este historial
    price: {
      type: Number,
      required: true, // Campo obligatorio
      min: 0, // Precio mínimo permitido es 0 (no negativo)
      // Validación para número válido (entero o decimal positivo)
      match: [/^(0|[1-9]\d*)(\.\d+)?$/, "Número no válido"],
      trim: true, // Quitar espacios en caso de que venga como string (aunque Number no usa trim)
    },

    // Referencia a la materia prima a la que pertenece este precio
    idRawMateria: {
      type: Schema.Types.ObjectId, // Referencia tipo ObjectId
      ref: "RawMaterials", // Nombre del modelo de Materia Prima
      required: true, // Obligatorio indicar la materia prima
      trim: true, // Aunque no aplica para ObjectId, se deja por consistencia
    },

    // Campo para eliminación lógica del historial
    deleted: {
      type: Boolean, // Campo booleano
      default: false, // Por defecto, no eliminado
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
    strict: false, // Permite almacenar campos adicionales no definidos en el esquema
  }
);

// Exporto el modelo para usarlo en la aplicación
export default model("HitoryRawMaterials", historyRawMaterialSchema);
