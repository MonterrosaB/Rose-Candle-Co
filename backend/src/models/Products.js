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

// Subesquema: Componentes
const componentSchema = new Schema(
  {
    amount: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 100,
      trim: true,
    },
    unit: {
      type: String,
      required: true,
      enum: ["ml", "g", "kg", "l", "unidad", "cucharada", "cucharadita","mg"],
      trim: true,
    },
  },
  { _id: false }
);

// Subesquema: Receta
const recipeSchema = new Schema(
  {
    step: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
      trim: true,
    },
  },
  { _id: false }
);

// Subesquema: Uso
const useFormSchema = new Schema(
  {
    instruction: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
      trim: true,
    },
  },
  { _id: false }
);

// Esquema principal: Productos
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
        "La descripción solo puede contener letras y espacios",
      ],
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length >= 1 && arr.length <= 4;
        },
        message: "Debes subir entre 1 y 4 imágenes",
      },
    },
    components: {
      type: [componentSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 100,
        message: "Debes proporcionar entre 1 y 100 componentes",
      },
    },
    recipe: {
      type: [recipeSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 100,
        message: "Debes proporcionar entre 1 y 100 pasos de receta",
      },
    },
    availability: {
      type: String,
      required: true,
      trim: true,
    },
    useForm: {
      type: [useFormSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 100,
        message: "Debes proporcionar entre 1 y 100 instrucciones de uso",
      },
    },
    currentPrice: {
      type: Number,
      required: true,
      min: 0.1,
      max: 1000,
      match: [
        /^\d+(\.\d{1,2})?$/,
        "El precio actual debe ser un número válido, con hasta dos decimales",
      ],
    },
    idProductCategory: {
      type: Schema.Types.ObjectId,
      ref: "productCategories",
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

// Exporto
export default model("Products", productsSchema);
