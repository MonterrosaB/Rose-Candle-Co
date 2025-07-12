import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios",
      ],
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    surnames: {
      type: String,
      required: true,
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
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Debe ser un correo electrónico válido",
      ],
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{4}$/, "Número de teléfono inválido (1234-5678)"],
      trim: true,
    },
    dui: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[0-9]{8}-[0-9]$/,
        "El DUI debe tener 8 números, un guion y un dígito",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.isNew; // Solo requerido al crear
      },
      minlength: 8,
      trim: true,
    },
    user: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9_]+$/,
        "El usuario solo puede contener letras, números y guiones bajos",
      ],
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "employee"],
      default: "employee",
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Employees", employeeSchema);
