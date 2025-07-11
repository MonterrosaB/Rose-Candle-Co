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
    idComponent: {
      type: Schema.Types.ObjectId,
      ref: "RawMaterial",
      required: true,
    },
    amount: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 100,
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

const variantSchema = new Schema(
  {
    variant: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 200,
    },
    variantPrice: {
      type: String,
      required: true,
      min: 1,
      max: 1000000,
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
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/,
        "La descripción solo puede contener letras y espacios",
      ],
      minLength: 3,
      maxLength: 1000,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length >= 1 && arr.length <= 8;
        },
        message: "Debes subir entre 1 y 8 imágenes",
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
    variant: {
      type: [variantSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 100,
        message: "Debes proporcionar entre 1 y 10 variantes del producto",
      },
    },
    availability: {
      type: Boolean,
      required: true,
    },
    useForm: {
      type: [useFormSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 100,
        message: "Debes proporcionar entre 1 y 100 instrucciones de uso",
      },
    },
    idProductCategory: {
      type: Schema.Types.ObjectId,
      ref: "productCategories",
      required: true,
    },
    idCollection: {
      type: Schema.Types.ObjectId,
      ref: "Collections",
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
