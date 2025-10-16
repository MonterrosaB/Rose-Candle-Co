import { Schema, model, Types } from "mongoose";

// Subesquema para la colección de temporada
const seasonalCollectionSchema = new Schema({
  idCollection: {
    type: Types.ObjectId,
    ref: "Collections",
    default: null,
  },
  name: {
    type: String,
    trim: true,
    default: "Colección de temporada",
  },
  image: {
    type: String,
    trim: true,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  availableUntil: {
    type: String,
    trim: true,
    default: "",
  },
  isConstant: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    trim: true,
    default: "Descripción de la colección de temporada",
  },
});

// Subesquema para productos recomendados
const recommendedProductSchema = new Schema(
  {
    idProduct: {
      type: Types.ObjectId,
      ref: "Products",
      required: true,
    },
  },
  { _id: false }
);

const settingsSchema = new Schema(
  {
    // Marquee principal
    marquee: {
      name: {
        type: String,
        trim: true,
        default: "¡Disfruta nuestras velas de temporada!",
      },
    },
    // Colección de temporada
    seasonalCollection: {
      type: seasonalCollectionSchema,
      default: () => ({}),
    },
    
    // Sección de inspiración
    inspiration: {
      phrase: {
        type: String,
        trim: true,
        maxLength: 300,
        default: "Enciende tu luz interior",
      },
      description: {
        type: String,
        trim: true,
        maxLength: 1000,
        default: "Cada vela está hecha con amor y propósito para transmitir calma y bienestar.",
      },
    },
    
    // Productos recomendados
    recommendedProducts: {
      name: {
        type: String,
        trim: true,
        default: "Productos recomendados",
        maxLength: 100,
      },
      description: {
        type: String,
        trim: true,
        maxLength: 500,
        default: "Nuestros clientes adoran estos productos",
      },
      products: {
        type: [recommendedProductSchema],
        validate: {
          validator: (arr) => arr.length >= 0 && arr.length <= 4,
          message: "Debes proporcionar entre 0 y 4 productos recomendados",
        },
        default: [],
      },
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Settings", settingsSchema);