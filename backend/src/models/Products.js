/*
    fields fro products
    
    Campos:
        name
        description
        images
        components
        recipe
        availability
        useForm
        currentPrice
        idProductCategory
*/

import { Schema, model } from "mongoose";

const productsSchema = new Schema(
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
    description: {
      type: String,
      required: true,
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "La descripcion solo puede contener letras y espacios",
      ],
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
      minItems: 1, // Al menos una imagen
      maxItems: 4, // No más de 4 imágenes
    },
    components: {
      type: [String],
      minLength: 3,
      maxLength: 100,
      required: true,
      validate: {
        validator: function (value) {
          return value.every((item) => /^[a-zA-Z\s]+$/.test(item)); // Validar que todos los componentes solo contengan letras y espacios
        },
        message: "Cada componente solo puede contener letras y espacios",
      },
    },
    recipe: {
      type: [String],
      minLength: 3,
      maxLength: 100,
      required: true,
      validate: {
        validator: function (value) {
          return value.every((item) => /^[a-zA-Z\s]+$/.test(item)); // Validar que todos las recetas solo contengan letras y espacios
        },
        message: "Cada receta solo puede contener letras y espacios",
      },
    },
    availability: {
      type: Boolean,
      required: true,
      enum: [true, false], // El campo solo puede ser verdadero o falso
    },
    useForm: {
      type: [String],
      minLength: 3,
      maxLength: 100,
      required: true,
      validate: {
        validator: function (value) {
          return value.every((item) => /^[a-zA-Z\s]+$/.test(item)); // Validar que todos las formas de uso solo contengan letras y espacios
        },
        message: "Cada forma de uso solo puede contener letras y espacios",
      },
    },
    currentPrice: {
      type: Number,
      min: 0.1,
      max: 1000,
      match: [
        /^\d+(\.\d{1,2})?$/,
        "El precio actual debe ser un número válido, con hasta dos decimales",
      ],
      required: true,
    },
    idProductCategory: {
      type: Schema.Types.ObjectId,
      ref: "productCategories",
      require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

// Exporto
export default model("Products", productsSchema);
