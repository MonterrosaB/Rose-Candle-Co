/* 
    Colección para colecciones de productos

    Campos:
        name - Nombre de la colección, único y obligatorio
        deleted - Campo para marcar como eliminado
*/

import { Schema, model } from "mongoose"; // Importar Schema y model de mongoose para definir el esquema y modelo

// Definición del esquema para la colección "Collections"
const collectionSchema = new Schema(
  {
    // Campo "name" para el nombre de la colección
    name: {
      type: String, // Tipo de dato string
      required: true, // Campo obligatorio
      unique: true, // El nombre debe ser único (no puede repetirse)
      minLength: 3, // Mínimo 3 caracteres
      maxLength: 100, // Máximo 100 caracteres
      trim: true, // Eliminar espacios en blanco al inicio y final
    },
    deleted: {
      type: Boolean, // Tipo de dato boolean
      default: false // por defecto en falso
    }
  },
  {
    timestamps: true, // Agrega automáticamente campos "createdAt" y "updatedAt"
    strict: false, // Permite almacenar campos adicionales no definidos en el esquema (flexibilidad)
  }
);

// Exportar el modelo para poder usarlo en otras partes de la aplicación
export default model("Collections", collectionSchema);
