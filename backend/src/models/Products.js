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
      validate: {
    validator: function (arr) {
      return arr.length >= 1 && arr.length <= 4;
    },
    message: "Debes subir entre 1 y 4 imágenes",
  },
    },
    components: {
      type: [String],
      minLength: 3,
      maxLength: 100,
      required: true
    },
    recipe: {
      type: [String],
      minLength: 3,
      maxLength: 100,
      required: true
    },
    availability: {
      type: String,
      required: true,
    },
    useForm: {
      type: [String],
      minLength: 3,
      maxLength: 100,
      required: true
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
