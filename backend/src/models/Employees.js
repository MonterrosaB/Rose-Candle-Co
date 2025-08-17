import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    // Nombre del empleado
    name: {
      type: String,
      required: true, // Obligatorio
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios permitidos
        "El nombre solo puede contener letras y espacios",
      ],
      minLength: 3, // Mínimo 3 caracteres
      maxLength: 100, // Máximo 100 caracteres
      trim: true, // Quitar espacios al inicio y final
    },

    // Apellidos del empleado
    surnames: {
      type: String,
      required: true, // Obligatorio
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios permitidos
        "El apellido solo puede contener letras y espacios",
      ],
      minLength: 3,
      maxLength: 100,
      trim: true,
    },

    // Correo electrónico único del empleado
    email: {
      type: String,
      required: true, // Obligatorio
      unique: true, // No puede repetirse en la colección
      lowercase: true, // Guardar en minúsculas
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Validación formato email
        "Debe ser un correo electrónico válido",
      ],
      trim: true,
    },

    // Teléfono del empleado en formato ####-####
    phone: {
      type: String,
      required: true, // Obligatorio
      match: [/^\d{4}-\d{4}$/, "Número de teléfono inválido (1234-5678)"],
      trim: true,
    },

    // DUI único (Documento Único de Identidad) del empleado
    dui: {
      type: String,
      required: true, // Obligatorio
      unique: true, // No puede repetirse
      match: [
        /^[0-9]{8}-[0-9]$/, // 8 números, un guion y un dígito final
        "El DUI debe tener 8 números, un guion y un dígito",
      ],
      trim: true,
    },

    // Contraseña del empleado
    password: {
      type: String,
      required: function () {
        return this.isNew; // Solo requerida al crear un nuevo documento
      },
      minlength: 8, // Mínimo 8 caracteres
      trim: true,
    },

    // Nombre de usuario único
    user: {
      type: String,
      required: true, // Obligatorio
      unique: true, // No puede repetirse
      match: [
        /^[a-zA-Z0-9_]+$/, // Solo letras, números y guiones bajos
        "El usuario solo puede contener letras, números y guiones bajos",
      ],
      trim: true,
    },

    // Rol del empleado: admin o empleado normal
    role: {
      type: String,
      required: true,
      enum: ["admin", "employee"], // Valores permitidos
      default: "employee", // Valor por defecto
      trim: true,
    },

    // Estado activo o inactivo del empleado
    isActive: {
      type: Boolean,
      required: true,
      default: true, // Por defecto activo
    },

    // Número de intentos al iniciar sesión
    loginAttempts: {
      type: Number,
      default: 0,
    },

    // Tiempo que esta bloqueado
    timeOut: {
      type: Date,
      default: null,
    },

    // Eliminación lógica del empleado
    deleted: {
      type: Boolean, // Campo lógico para indicar si el registro está eliminado
      default: false, // Por defecto no está eliminado
    },
  },
  {
    timestamps: true, // Campos automáticos createdAt y updatedAt
  }
);

// Exportar el modelo para usarlo en otras partes de la aplicación
export default model("Employees", employeeSchema);
