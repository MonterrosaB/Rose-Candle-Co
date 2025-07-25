/* 
    Colección para clientes

    Campos:
        name - Nombre del cliente
        surnames - Apellidos del cliente
        email - Correo electrónico único y válido
        password - Contraseña con requisitos de seguridad
        user - Nombre de usuario válido
        phone - Número telefónico en formato ####-####
        addresses - Arreglo de direcciones con tipo y si es predeterminada
*/

import { Schema, model } from "mongoose";

// Subesquema para las direcciones de un cliente
const addressSchema = new Schema(
  {
    address: {
      type: String,
      required: true, // Dirección obligatoria
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
      required: true, // Campo obligatorio
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios permitidos
        "El nombre solo puede contener letras y espacios",
      ],
      minLength: 3, // Mínimo 3 caracteres
      maxLength: 100, // Máximo 100 caracteres
      trim: true, // Quita espacios al inicio y final
    },
    surnames: {
      type: String,
      required: true,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios
        "El apellido solo puede contener letras y espacios",
      ],
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    email: {
      type: String,
      require: true, // Obligatorio
      unique: true, // Único en la base de datos
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Validación de formato email
        "Debe ser un correo electrónico válido",
      ],
      trim: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 8, // Mínimo 8 caracteres
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, // Requiere mayúscula, minúscula, número y símbolo
        "La contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula, número y símbolo",
      ],
      trim: true,
    },
    user: {
      type: String,
      require: true,
      match: [
        /^[a-zA-Z0-9_]+$/, // Solo letras, números y guion bajo
        "El usuario solo puede contener letras, números y guiones bajos",
      ],
      trim: true,
    },
    phone: {
      type: String,
      require: true,
      match: [/^\d{4}-\d{4}$/, "Número de teléfono inválido"], // Formato ####-####
      minLength: 9,
      trim: true,
    },
    addresses: {
      type: [addressSchema], // Arreglo de direcciones usando el subesquema definido
      required: true, // Obligatorio que tenga al menos una dirección
    },
  },
  {
    timestamps: true, // Campos createdAt y updatedAt automáticos
    strict: false, // Permite guardar campos no definidos explícitamente (flexibilidad)
  }
);

// Exportar modelo para uso en la app
export default model("Customers", customerSchema);
