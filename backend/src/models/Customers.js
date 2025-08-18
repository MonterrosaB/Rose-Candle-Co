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
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      match: [
        /^[a-zA-Z\u00C0-\u017F\s]+$/,
        "firstname must contain only letters and spaces",
      ],
      trim: true,
    },
    lastName: {
      type: String,
      match: [
        /^[a-zA-Z\u00C0-\u017F\s]+$/,
        "lastname must contain only letters and spaces",
      ],
      trim: true,
    },
    state: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z\s]+$/, "City must contain only letters and spaces"],
    },
    city: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z\s]+$/, "city must contain only letters and spaces"],
    },
    zipCode: {
      type: String,
      trim: true,
      match: [
        /^[a-zA-Z0-9\-]+$/,
        "Zip code must contain only letters, numbers, or hyphens",
      ],
    },

    phone: {
      type: String,
      match: [/^\d{4}-\d{4}$/, "Número de teléfono inválido"], // Formato ####-####
      minLength: 9, // Incluye guion
      trim: true, // Limpia espacios
    },
  },
  {
    _id: true,
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
      required: true, // Obligatorio
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
    phone: {
      type: String,
      required: true, // Obligatorio
      match: [/^\d{4}-\d{4}$/, "Número de teléfono inválido"], // Formato ####-####
      minLength: 9, // Incluye guion
      trim: true, // Limpia espacios
    },
    addresses: {
      type: [addressSchema],
      default: [], // Opcional
    },
    deleted: {
      type: Boolean,
      default: false, // Opcional
    },
    loginAttempts: { type: Number, default: 0 }, //incrementador de intentos de inicio de sesion
    lockUntil: { type: Date, default: null }, //bloqueo hasta cierto tiempo
  },
  {
    timestamps: true, // Campos createdAt y updatedAt automáticos
    strict: false, // Permite guardar campos no definidos explícitamente
  }
);

export default model("Customers", customerSchema);
