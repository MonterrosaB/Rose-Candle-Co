import { Schema, model } from "mongoose";

const materialBalance = new Schema({
  idMaterial: {
    type: Schema.Types.ObjectId,
    ref: "materialBalance",
    required: [true, "La referencia al material es obligatoria"],
  },
  movement: {
    type: String,
    required: [true, "El tipo de movimiento es obligatorio"],
    enum: {
      values: ["entrada", "salida"],
      message: "El tipo de movimiento debe ser 'entrada' o 'salida'",
    },
    trim: true,
    lowercase: true,
  },
  amount: {
    type: Number,
    required: [true, "La cantidad es obligatoria"],
    min: [0.01, "La cantidad debe ser mayor a cero"],
    validate: {
      validator: Number.isFinite,
      message: "La cantidad debe ser un número válido",
    },
  },
  unitPrice: {
    type: Number,
    required: [true, "El precio unitario es obligatorio"],
    min: [0, "El precio unitario no puede ser negativo"],
    max: [1000000, "El precio unitario es demasiado alto"],
    validate: {
      validator: Number.isFinite,
      message: "El precio unitario debe ser un número válido",
    },
  },
  reference: {
    type: String,
    maxlength: [200, "La referencia no debe exceder los 200 caracteres"],
    trim: true,
    default: "Sin referencia",
  },
  date: {
    type: Date,
    required: [true, "La fecha del movimiento es obligatoria"],
    validate: {
      validator: (value) => !isNaN(Date.parse(value)),
      message: "Fecha inválida",
    },
  },
}, {
  timestamps: true,
  strict: true, // Rechaza campos que no están definidos en el esquema
});

export default model("materialBalance", materialBalance);
