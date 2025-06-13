/*
    fields fro products
    
    Campos:
        products
        date
        total
        earning
        idOrder
*/

import { Schema, model } from "mongoose";

const productionCostHistorySchema = new Schema(
  {
    products: {
      type: [String],
      minLength: 3,
      maxLength: 100,
      required: true,
      validate: {
        validator: function(value) {
            return value.every(item => /^[a-zA-Z\s]+$/.test(item));  // Validar que todos los productos solo contengan letras y espacios
        },
        message: 'Cada producto solo puede contener letras y espacios'
    }
    },
    date:{
        type: Date,
        required: true
    },
    total: {
      type: Number,
      min: 1,
      max: 1000,
      match: [
        /^\d+(\.\d{1,2})?$/,
        "El total debe ser un número válido, con hasta dos decimales",
      ],
      required: true,
    },
    earning: {
        type: Number,
        min: 1,
        max: 1000,
        match: [
          /^\d+(\.\d{1,2})?$/,
          "La ganancia debe ser un número válido, con hasta dos decimales",
        ],
        required: true,
      }
  },
  {
    timestamps: true,
    strict: false,
  }
);

// Exporto
export default model("ProductionCostHistory", productionCostHistorySchema);