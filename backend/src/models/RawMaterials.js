import { Schema, model } from "mongoose";

const RawMaterial = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [100, "Name must be less than 100 characters"],
    trim: true,
  },
  currentStock: {
    type: Number,
    required: [true, "Current stock is required"],
    min: [0, "Current stock cannot be negative"],
  },
  currentPrice: {
    type: Number,
    required: [true, "Current price is required"],
    min: [0, "Current price cannot be negative"],
  },
  unit: {
    type: String,
    required: [true, "Unit is required"],
    enum: {
      values: ["kg", "g", "l", "ml", "m", "cm", "unit", "piece"],
      message: "Unit must be one of: kg, g, l, ml, m, cm, unit, piece"
    },
    trim: true,
  },
  idRawMaterialCategory: {
    type: Schema.Types.ObjectId,
    ref: "RawMaterialCategories",
    required: [true, "Raw material category is required"],
  },
  idSupplier: {
    type: Schema.Types.ObjectId,
    ref: "Suppliers", 
    required: [true, "Supplier reference is required"],
  },
}, {
  timestamps: true,
  strict: false,
});

export default model("RawMaterial", RawMaterial);
