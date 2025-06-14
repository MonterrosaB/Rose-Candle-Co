/*
    fields for category products
    
    Campos:
        name
*/

import { Schema, model } from "mongoose";

const productCategoriesSchema = new Schema(
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
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

// Exporto
export default model("productCategories", productCategoriesSchema);
