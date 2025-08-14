/* 
    Colección para clientes

    Campos:
        name - Nombre del cliente
        contact - Teléfono, email u otro contacto
        surnames - Apellidos del cliente
        email - Correo electrónico único y válido
        password - Contraseña con requisitos de seguridad
        user - Nombre de usuario válido
        addresses - Arreglo de direcciones con tipo y si es predeterminada
*/

import { Schema, model } from "mongoose";

// Subesquema para las direcciones de un cliente
const addressSchema = new Schema(
  {
    address: {
      type: String, // Dirección opcional
    },
    type: {
      type: String,
      enum: {
        values: ["casa", "trabajo", "otro"], // Solo estos valores permitidos
        message: "El tipo de dirección debe ser 'casa', 'trabajo' u 'otro'",
      },
      default: "casa", // Valor por defecto si no se especifica
    },
    isDefault: {
      type: Boolean,
      default: false, // Indica si es la dirección principal
    },
  },
  {
    _id: true, // Cada dirección tendrá su propio _id
  }
);

// Esquema principal para clientes
const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Obligatorio
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios permitidos
        "El nombre solo puede contener letras y espacios",
      ],
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    contact: {
      type: String,
      required: true, // Obligatorio (teléfono, email, etc.)
      trim: true,
    },
    surnames: {
      type: String,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El apellido solo puede contener letras y espacios",
      ],
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Debe ser un correo electrónico válido",
      ],
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula, número y símbolo",
      ],
      trim: true,
    },
    user: {
      type: String,
      match: [
        /^[a-zA-Z0-9_]+$/,
        "El usuario solo puede contener letras, números y guiones bajos",
      ],
      trim: true,
    },
    addresses: {
      type: [addressSchema],
      default: [], // Opcional
    },
    deleted: {
      type: Boolean,
      default: false, // Opcional
    },
  },
  {
    timestamps: true, // Campos createdAt y updatedAt automáticos
    strict: false, // Permite guardar campos no definidos explícitamente
  }
);

export default model("Customers", customerSchema);
