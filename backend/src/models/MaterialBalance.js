import { Schema, model } from "mongoose";

const materialBalance = new Schema(
  {
    // Referencia al material relacionado con este movimiento de balance
    idMaterial: {
      type: Schema.Types.ObjectId,
      ref: "RawMaterial", // Referencia al modelo relacionado
      required: [true, "La referencia al material es obligatoria"],
    },

    // Tipo de movimiento: entrada o salida
    movement: {
      type: String,
      required: [true, "El tipo de movimiento es obligatorio"],
      enum: {
        values: ["entrada", "salida"], // Solo estos dos valores válidos
        message: "El tipo de movimiento debe ser 'entrada' o 'salida'",
      },
      trim: true, // Elimina espacios en blanco alrededor
      lowercase: true, // Convierte el valor a minúsculas automáticamente
    },

    // Cantidad de material que entra o sale
    amount: {
      type: Number,
      required: [true, "La cantidad es obligatoria"],
      min: [0.01, "La cantidad debe ser mayor a cero"], // No puede ser cero ni negativo
      validate: {
        validator: Number.isFinite, // Valida que sea un número finito válido
        message: "La cantidad debe ser un número válido",
      },
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

    // Referencia o descripción opcional para esta operación
    reference: {
      type: String,
      maxlength: [200, "La referencia no debe exceder los 200 caracteres"],
      trim: true,
      default: "Sin referencia", // Valor por defecto si no se proporciona
    },

    // Fecha en la que se registra este movimiento
    date: {
      type: Date,
      required: [true, "La fecha del movimiento es obligatoria"],
      validate: {
        validator: (value) => !isNaN(Date.parse(value)), // Verifica que la fecha sea válida
        message: "Fecha inválida",
      },
      default: Date.now,
    },

    // Campo para eliminación lógica del movimiento
    deleted: {
      type: Boolean, // Campo lógico
      default: false, // Por defecto no eliminado
    },
  },
  {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
    strict: true, // Rechaza cualquier campo no definido en el esquema
  }
);

// Exporto el modelo para usarlo en la aplicación
export default model("MaterialBalance", materialBalance);
